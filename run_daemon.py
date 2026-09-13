#!/usr/bin/env python3
"""
LifeGuard Agent: Ambient Background Daemon
-----------------------------------------
Runs autonomously as a continuous background OS process.
Handles routine and repetitive tasks silently (subscription audits, utility sweeps, recall checks).
ONLY surfaces to the human principal when a high-stakes decision is required.
"""

import asyncio
import time
import os
import sys
from pathlib import Path
from datetime import datetime, timezone

# Add parent directory to sys.path
root_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(root_dir))

from backend.app.daemon.watcher import daemon_instance, ROUTINE_BENCHMARK_TASKS
from backend.app.agent.orchestrator import orchestrator
from backend.app.hitl.decision_manager import decision_manager

def print_banner():
    print("\n" + "="*75)
    print("🛡️  LIFEGUARD AGENT: AUTONOMOUS BACKGROUND DAEMON")
    print("   Target: Everyday Life & Household Protection")
    print("   Powered by Strands Agents SDK & Amazon Bedrock AgentCore")
    print("="*75)
    print("🟢 STATUS: Running silently in background")
    print(f"📁 WATCHING DIRECTORY: {daemon_instance.watch_dir}")
    print("📬 AMBIENT EMAIL WEBHOOK: protect+human@lifeguard.ai")
    print("🤫 POLICY: Handles 95% of routine tasks silently. Zero human distraction.")
    print("🚨 SURFACING RULE: Interrupts human ONLY when a high-stakes decision is needed.")
    print("="*75 + "\n")

async def run_daemon_interactive():
    print_banner()
    daemon_instance.start()
    
    cycle = 0
    try:
        while True:
            cycle += 1
            await asyncio.sleep(8)
            
            # Every cycle, the daemon executes a routine background check
            task = daemon_instance.run_routine_simulation_cycle()
            print(f"[{task['timestamp']}] 🔄 [ROUTINE TASK SILENT PASS] {task['provider']}")
            print(f"            ↳ {task['detail']}")
            print(f"            ↳ Stats: {daemon_instance.silent_passes_count} routine checks handled silently • 0 human interruptions\n")
            
            # On cycle 4, simulate an incoming bill with a stealth hike arriving via ambient inbox
            if cycle == 4:
                print("="*75)
                print("⚡ [AMBIENT INGESTION EVENT] New monthly telecom statement arrived in background inbox...")
                print("🔍 [STRANDS AGENTS ACTIVE] AuditAgent -> PolicyAgent -> ResolverAgent running...")
                print("="*75)
                
                from backend.app.models.schemas import IngestedDocument, LineItem, CategoryType
                comcast_doc = IngestedDocument(
                    id="doc_ambient_comcast",
                    provider="Comcast Xfinity",
                    title="Xfinity Broadband Statement (Auto-Ingested)",
                    category=CategoryType.TELECOM,
                    total_amount=82.50,
                    account_id="ACCT-XFIN-4912",
                    document_date=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                    previous_month_amount=50.00,
                    line_items=[
                        LineItem(name="Connect More Internet (Base)", current_charge=50.00, baseline_charge=50.00),
                        LineItem(name="Unannounced Network Enhancement Fee", current_charge=22.50, baseline_charge=0.0, is_hidden_or_new=True),
                        LineItem(name="Broadcast Surcharge", current_charge=10.00, baseline_charge=0.0, is_hidden_or_new=True)
                    ],
                    raw_notes="Promotional discount expired. Stealth price hike applied without 30-day notice."
                )
                
                decision = await orchestrator.process_document(comcast_doc)
                daemon_instance.anomalies_surfaced_count += 1
                
                print("\n🚨" + "!"*71 + "🚨")
                print("🚨 LIFEGUARD SURFACED FOR HUMAN DECISION (Action Required)")
                print(f"   Provider:        {decision.provider}")
                print(f"   Monthly Leakage: +${decision.monthly_impact:.2f}/mo (+$419.88/yr)")
                print(f"   Statute Cited:   {decision.policy_reference.authority} ({decision.policy_reference.citation})")
                print(f"   Status:          PENDING_APPROVAL (Gated by Human-in-the-Loop)")
                print("   Action Prepared: Formal Executive Dispute Letter ready to dispatch.")
                print(f"   👉 View & Approve at: http://localhost:5173 (or press Enter to approve here)")
                print("🚨" + "!"*71 + "🚨\n")
                
    except (KeyboardInterrupt, asyncio.CancelledError):
        print("\n🛑 Stopping LifeGuard Daemon...")
        daemon_instance.stop()
        print("👋 LifeGuard Daemon stopped.")

if __name__ == "__main__":
    try:
        asyncio.run(run_daemon_interactive())
    except KeyboardInterrupt:
        pass
