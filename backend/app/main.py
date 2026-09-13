import os
import json
import asyncio
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse
from backend.app.config import settings
from backend.app.models.schemas import IngestedDocument, DecisionCard, ActionStatus
from backend.app.hitl.decision_manager import decision_manager
from backend.app.agent.orchestrator import orchestrator

app = FastAPI(
    title="LifeGuard Agent API",
    description="Autonomous background LifeOps and financial safeguard platform powered by Strands Agents SDK",
    version=settings.VERSION
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    return {
        "success": True,
        "message": f"Scenario '{doc.title}' evaluated by Strands Agents.",
        "decision": decision_card
    }

@app.get("/api/decisions")
async def get_decisions(status: str = None):
    action_status = ActionStatus(status) if status else None
    return decision_manager.list_decisions(action_status)

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
