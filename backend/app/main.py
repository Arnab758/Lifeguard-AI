import os
import io
import re
import csv
import json
import asyncio
from pathlib import Path
from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Request, UploadFile, File, Form, Response
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse
from backend.app.config import settings
from backend.app.models.schemas import IngestedDocument, DecisionCard, ActionStatus, LineItem, CategoryType
from backend.app.hitl.decision_manager import decision_manager
from backend.app.agent.orchestrator import orchestrator
from backend.app.daemon.watcher import daemon_instance

app = FastAPI(
    title="LifeGuard Agent API",
    description="Autonomous background LifeOps and financial safeguard platform powered by Strands Agents SDK",
    version=settings.VERSION
)

@app.on_event("startup")
async def on_startup():
    """Starts the autonomous background watcher daemon upon application boot."""
    daemon_instance.start()

@app.on_event("shutdown")
async def on_shutdown():
    daemon_instance.stop()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse

FRONTEND_DIST = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
if FRONTEND_DIST.exists() and (FRONTEND_DIST / "assets").exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST / "assets")), name="assets")

@app.get("/")
async def root_handler():
    """Serves the frontend app directly on port 8000 if built, or redirects to dev server."""
    if FRONTEND_DIST.exists() and (FRONTEND_DIST / "index.html").exists():
        return FileResponse(str(FRONTEND_DIST / "index.html"))
    return RedirectResponse(url="http://localhost:5173/")

DATA_DIR = Path(__file__).parent / "data"

SCENARIOS_MAP = {
    "comcast": "comcast_bill_hike.json",
    "gym": "planet_fitness_trap.json",
    "warranty": "espresso_warranty_recall.json",
    "medical": "quest_medical_overbill.json"
}

@app.get("/health")
@app.get("/api/health")
async def health_check():
    return {
        "status": "HEALTHY",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "runtime": "Amazon Bedrock AgentCore",
        "primary_model": settings.BEDROCK_MODEL_ID,
        "execution_mode": settings.EXECUTION_MODE
    }

@app.get("/api/scenarios")
async def list_scenarios():
    scenarios = []
    for key, filename in SCENARIOS_MAP.items():
        filepath = DATA_DIR / filename
        if filepath.exists():
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
                scenarios.append({
                    "key": key,
                    "id": data["id"],
                    "title": data["title"],
                    "provider": data["provider"],
                    "category": data["category"],
                    "total_amount": data["total_amount"],
                    "notes": data.get("raw_notes", "")
                })
    return scenarios

@app.post("/api/scenarios/inject/{scenario_key}")
async def inject_scenario(scenario_key: str):
    filename = SCENARIOS_MAP.get(scenario_key.lower())
    if not filename:
        raise HTTPException(status_code=404, detail=f"Scenario '{scenario_key}' not found.")
    
    filepath = DATA_DIR / filename
    with open(filepath, "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    doc = IngestedDocument(**raw_data)
    # Process through the Strands Agents orchestrator
    decision_card = await orchestrator.process_document(doc)
    daemon_instance.routine_checks_count += 1
    daemon_instance.anomalies_surfaced_count += 1
    daemon_instance._record_activity("ANOMALY_SURFACED", doc.provider, f"Surfaced Decision Card for ${decision_card.annual_impact:.2f}/yr. Human decision required.")
    return {
        "success": True,
        "message": f"Scenario '{doc.title}' evaluated by Strands Agents.",
        "decision": decision_card
    }

@app.get("/api/daemon/status")
async def get_daemon_status():
    """Returns autonomous background daemon telemetry, silent passes, and recent activity."""
    return daemon_instance.get_status()

@app.post("/api/daemon/routine-cycle")
async def trigger_routine_cycle():
    """
    Simulates a background routine check cycle.
    The agent verifies a routine charge (e.g. Spotify, Netflix, ConEd electricity, CPSC sweep)
    silently in the background WITHOUT human interruption.
    """
    entry = daemon_instance.run_routine_simulation_cycle()
    return {
        "success": True,
        "message": "Routine background task handled silently without human interruption.",
        "entry": entry,
        "daemon_status": daemon_instance.get_status()
    }

@app.post("/api/daemon/ambient-drop/{scenario_key}")
async def ambient_drop(scenario_key: str):
    """
    Simulates an invoice arriving via background email or dropped into the watched folder.
    Daemon picks it up silently and ONLY surfaces a Decision Card because an anomaly was detected.
    """
    return await inject_scenario(scenario_key)

class CustomAuditRequest(BaseModel):
    provider: str
    category: str
    title: Optional[str] = None
    baseline_amount: float
    current_amount: float
    issue_description: str
    account_number: Optional[str] = "ACCT-USER-LIVE"

@app.post("/api/audit-custom")
async def audit_custom_bill(req: CustomAuditRequest):
    import uuid
    cat_enum = CategoryType[req.category.upper()] if req.category.upper() in CategoryType.__members__ else CategoryType.TELECOM
    diff = round(max(0.0, req.current_amount - req.baseline_amount), 2)

    doc = IngestedDocument(
        id=f"doc_custom_{uuid.uuid4().hex[:6]}",
        provider=req.provider,
        title=req.title or f"{req.provider} Monthly Statement",
        category=cat_enum,
        total_amount=req.current_amount,
        account_id=req.account_number or "ACCT-LIVE-USER",
        document_date="2026-09-14",
        previous_month_amount=req.baseline_amount,
        line_items=[
            LineItem(name="Contracted Baseline Rate", current_charge=req.baseline_amount, baseline_charge=req.baseline_amount),
            LineItem(name="Unannounced Surcharge / Stealth Drift", current_charge=diff, baseline_charge=0.0, is_hidden_or_new=True)
        ] if req.current_amount > req.baseline_amount else [
            LineItem(name="Billed Charge", current_charge=req.current_amount, baseline_charge=req.current_amount)
        ],
        raw_notes=f"User Report: {req.issue_description}. Contracted baseline: ${req.baseline_amount:.2f}, billed: ${req.current_amount:.2f}."
    )
    decision_card = await orchestrator.process_document(doc)
    return {
        "success": True,
        "message": f"Custom statement for '{doc.provider}' audited by LifeGuard.",
        "decision": decision_card
    }

@app.post("/api/audit-upload")
async def audit_uploaded_file(
    file: UploadFile = File(...),
    provider_override: Optional[str] = Form(None),
    baseline_override: Optional[float] = Form(None),
    category_override: Optional[str] = Form(None)
):
    """
    Accepts real user-uploaded bills (PDF, TXT, CSV, or images)
    Extracts text, parses financial drift, and runs multi-agent resolution.
    """
    import uuid
    content = await file.read()
    extracted_text = ""

    # 1. Extract text from PDF or text file
    filename = file.filename.lower()
    if filename.endswith(".pdf"):
        try:
            import pypdf
            reader = pypdf.PdfReader(io.BytesIO(content))
            extracted_text = "\n".join([page.extract_text() or "" for page in reader.pages])
        except Exception as e:
            extracted_text = f"PDF content could not be fully parsed: {str(e)}"
    else:
        try:
            extracted_text = content.decode("utf-8", errors="ignore")
        except Exception:
            extracted_text = f"Binary file upload: {file.filename}"

    # 2. Extract dollar amounts
    dollar_matches = re.findall(r'\$\s*(\d+(?:\.\d{2})?)', extracted_text)
    floats = [float(m) for m in dollar_matches if float(m) > 0]
    
    current_amount = max(floats) if floats else 79.99
    baseline_amount = baseline_override if baseline_override is not None else (min(floats) if len(floats) > 1 else round(current_amount * 0.7, 2))

    # 3. Detect Provider
    detected_provider = provider_override or "Unknown Provider"
    text_lower = (extracted_text + " " + file.filename).lower()
    for known in ["comcast", "xfinity", "verizon", "att", "at&t", "spectrum", "planet fitness", "adobe", "quest", "breville", "t-mobile", "netflix", "spotify"]:
        if known in text_lower:
            detected_provider = known.title()
            if "att" in known: detected_provider = "AT&T"
            elif "xfinity" in known or "comcast" in known: detected_provider = "Comcast Xfinity"
            break

    # 4. Detect Category
    cat_str = category_override.upper() if category_override else "TELECOM"
    if any(w in text_lower for w in ["gym", "fitness", "membership", "subscription", "cloud", "saas", "software"]):
        cat_str = "SUBSCRIPTION"
    elif any(w in text_lower for w in ["lab", "hospital", "doctor", "health", "clinic", "diagnostic", "cpt"]):
        cat_str = "HEALTHCARE"
    elif any(w in text_lower for w in ["warranty", "recall", "repair", "defect", "cpsc", "boiler"]):
        cat_str = "WARRANTY"
    elif any(w in text_lower for w in ["electric", "water", "gas", "utility"]):
        cat_str = "UTILITIES"

    cat_enum = CategoryType[cat_str] if cat_str in CategoryType.__members__ else CategoryType.TELECOM
    diff = round(max(0.0, current_amount - baseline_amount), 2)

    doc = IngestedDocument(
        id=f"doc_upload_{uuid.uuid4().hex[:6]}",
        provider=detected_provider,
        title=f"Uploaded Statement: {file.filename}",
        category=cat_enum,
        total_amount=current_amount,
        account_id="ACCT-UPLOAD-" + uuid.uuid4().hex[:6].upper(),
        document_date="2026-09-14",
        previous_month_amount=baseline_amount,
        line_items=[
            LineItem(name="Contracted Baseline Rate", current_charge=baseline_amount, baseline_charge=baseline_amount),
            LineItem(name="Unannounced Surcharge / Stealth Drift", current_charge=diff, baseline_charge=0.0, is_hidden_or_new=True)
        ] if current_amount > baseline_amount else [
            LineItem(name="Total Charge", current_charge=current_amount, baseline_charge=current_amount)
        ],
        raw_notes=f"Scanned from {file.filename}. Text preview: {extracted_text[:300].strip()}..."
    )

    decision_card = await orchestrator.process_document(doc)
    return {
        "success": True,
        "message": f"Uploaded file '{file.filename}' successfully audited by LifeGuard.",
        "decision": decision_card
    }

@app.get("/api/ledger/export")
async def export_ledger_csv():
    """Exports the entire verified financial recovery audit trail as a downloadable CSV."""
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "Record ID", "Decision ID", "Provider", "Category", 
        "Resolved At", "Monthly Impact ($)", "Annual Recovery ($)", 
        "Action Type", "Confirmation Reference"
    ])
    
    for item in decision_manager.savings_ledger:
        writer.writerow([
            item.id,
            item.decision_id,
            item.provider,
            item.category.value if hasattr(item.category, "value") else str(item.category),
            item.resolved_at,
            f"{item.amount_monthly:.2f}",
            f"{item.amount_annual:.2f}",
            item.action_type,
            item.confirmation_number
        ])
    
    csv_data = output.getvalue()
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=lifeguard_recovered_savings.csv"}
    )

@app.get("/api/inbox-alias")
async def get_inbox_alias():
    """Returns the user's ambient background protection forwarding email and setup instructions."""
    return {
        "inbox_alias": "protect+arnab@lifeguard.ai",
        "status": "ACTIVE_DAEMON",
        "rules": [
            "Forward any bill, invoice, or rate increase email directly to protect+arnab@lifeguard.ai",
            "LifeGuard autonomously parses line-item drift and regulatory violations in the background",
            "When an anomaly is detected, a 1-click authorization card is prepared for your review"
        ]
    }

@app.get("/api/decisions")
async def get_decisions(status: str = None):
    action_status = ActionStatus(status) if status else None
    return decision_manager.list_decisions(action_status)

@app.post("/api/decisions/reset")
async def reset_decisions():
    """Clears all decision cards and resets ledger for demo replay."""
    decision_manager.reset_all()
    return {"success": True, "message": "All decisions and ledger reset to clean slate."}

@app.post("/api/decisions/{decision_id}/approve")
async def approve_decision(decision_id: str, request: Request):
    body = await request.json() if request.headers.get("content-type") == "application/json" else {}
    note = body.get("user_note")
    try:
        res = await decision_manager.approve_decision(decision_id, user_note=note)
        return res
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.post("/api/decisions/{decision_id}/dismiss")
async def dismiss_decision(decision_id: str, request: Request):
    body = await request.json() if request.headers.get("content-type") == "application/json" else {}
    reason = body.get("reason")
    try:
        res = await decision_manager.dismiss_decision(decision_id, reason=reason)
        return res
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/api/metrics")
async def get_metrics():
    return decision_manager.get_summary_metrics()

@app.get("/api/audit-stream")
async def audit_stream(request: Request):
    """
    Server-Sent Events (SSE) stream providing real-time telemetry
    of Strands Agent thought traces and HITL actions.
    """
    queue = asyncio.Queue()
    decision_manager.event_subscribers.append(queue)

    async def event_generator():
        try:
            while True:
                if await request.is_disconnected():
                    break
                event = await queue.get()
                yield {
                    "event": "agent_trace",
                    "data": json.dumps(event.model_dump())
                }
        finally:
            if queue in decision_manager.event_subscribers:
                decision_manager.event_subscribers.remove(queue)

    return EventSourceResponse(event_generator())

# Auto-inject first scenario on startup if queue is empty
@app.on_event("startup")
async def startup_event():
    # Pre-populate Comcast scenario so dashboard is immediately active upon load
    comcast_file = DATA_DIR / "comcast_bill_hike.json"
    if comcast_file.exists():
        with open(comcast_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            await orchestrator.process_document(IngestedDocument(**data))
