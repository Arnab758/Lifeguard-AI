import asyncio
import uuid
from typing import Dict, List, Optional, Any
from datetime import datetime, timezone
from backend.app.models.schemas import DecisionCard, ActionStatus, SavingsRecord, AgentEvent

class DecisionManager:
    """
    State machine for Human-in-the-Loop (HITL) authorization and savings tracking.
    """
    def __init__(self):
        self.decisions: Dict[str, DecisionCard] = {}
        self.savings_ledger: List[SavingsRecord] = []
        self.event_subscribers: List[asyncio.Queue] = []
        self.total_saved_monthly: float = 0.0
        self.total_saved_annual: float = 0.0

    def add_decision(self, decision: DecisionCard) -> DecisionCard:
        self.decisions[decision.id] = decision
        return decision

    def get_decision(self, decision_id: str) -> Optional[DecisionCard]:
        return self.decisions.get(decision_id)

    def list_decisions(self, status: Optional[ActionStatus] = None) -> List[DecisionCard]:
        cards = list(self.decisions.values())
        if status:
            return [c for c in cards if c.status == status]
        return cards

    def reset_all(self):
        """Resets all decisions and ledger records for demo replay."""
        self.decisions.clear()
        self.savings_ledger.clear()
        self.total_saved_monthly = 0.0
        self.total_saved_annual = 0.0

    async def emit_event(self, event: AgentEvent):
        """Broadcasts an agent thought or action event to all connected SSE clients."""
        for q in list(self.event_subscribers):
            try:
                await q.put(event)
            except Exception:
                self.event_subscribers.remove(q)

    async def approve_decision(self, decision_id: str, user_note: Optional[str] = None) -> Dict[str, Any]:
        decision = self.decisions.get(decision_id)
        if not decision:
            raise ValueError(f"Decision {decision_id} not found")

        decision.status = ActionStatus.APPROVED
        decision.action_taken_at = datetime.now(timezone.utc).isoformat()
        decision.user_note = user_note or "Approved by human principal via LifeGuard Action Center."
        confirmation_num = f"CONF-{uuid.uuid4().hex[:8].upper()}"
        decision.confirmation_reference = confirmation_num

        # Log into cumulative savings ledger
        savings = SavingsRecord(
            id=f"sav_{uuid.uuid4().hex[:6]}",
            decision_id=decision.id,
            provider=decision.provider,
            category=decision.category,
            resolved_at=decision.action_taken_at,
            amount_monthly=decision.monthly_impact,
            amount_annual=decision.annual_impact,
            action_type=decision.drafted_action_type,
            confirmation_number=confirmation_num
        )
        self.savings_ledger.append(savings)
        self.total_saved_monthly += decision.monthly_impact
        self.total_saved_annual += decision.annual_impact

        # Emit audit event
        await self.emit_event(AgentEvent(
            id=str(uuid.uuid4()),
            agent_name="HITLGatekeeper",
            step="HUMAN_APPROVAL_EXECUTED",
            thought=f"Human authorized dispatch for {decision.provider}. Bounded action executed with confirmation {confirmation_num}.",
            tool_called="dispatch_resolution_payload",
            tool_output={
                "confirmation": confirmation_num,
                "annual_savings": decision.annual_impact,
                "dispatched_to": decision.provider
            }
        ))

        return {
            "success": True,
            "decision": decision,
            "savings": savings,
            "total_annual_savings": self.total_saved_annual
        }

    async def dismiss_decision(self, decision_id: str, reason: Optional[str] = None) -> Dict[str, Any]:
        decision = self.decisions.get(decision_id)
        if not decision:
            raise ValueError(f"Decision {decision_id} not found")

        decision.status = ActionStatus.DISMISSED
        decision.action_taken_at = datetime.utcnow().isoformat()
        decision.user_note = reason or "Dismissed by user (acceptable charge)."

        await self.emit_event(AgentEvent(
            id=str(uuid.uuid4()),
            agent_name="HITLGatekeeper",
            step="HUMAN_DISMISSAL",
            thought=f"Human dismissed action for {decision.provider}. No money or dispute was dispatched.",
            tool_called="archive_card"
        ))

        return {"success": True, "decision": decision}

    def get_summary_metrics(self) -> Dict[str, Any]:
        pending_count = len([d for d in self.decisions.values() if d.status == ActionStatus.PENDING_APPROVAL])
        approved_count = len([d for d in self.decisions.values() if d.status == ActionStatus.APPROVED])
        
        return {
            "total_saved_monthly": round(self.total_saved_monthly, 2),
            "total_saved_annual": round(self.total_saved_annual, 2),
            "pending_reviews_count": pending_count,
            "approved_dispatches_count": approved_count,
            "ledger_items": self.savings_ledger
        }

decision_manager = DecisionManager()
