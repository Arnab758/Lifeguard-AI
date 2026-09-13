import pytest
import asyncio
from backend.app.agent.tools.bill_parser import audit_bill_drift
from backend.app.agent.tools.policy_checker import lookup_consumer_rights
from backend.app.agent.tools.recall_database import check_safety_and_warranty
from backend.app.agent.tools.dispute_drafter import draft_action_resolution
from backend.app.models.schemas import IngestedDocument, CategoryType, ActionStatus
from backend.app.hitl.decision_manager import decision_manager
from backend.app.agent.orchestrator import orchestrator

def test_bill_drift_calculation():
    line_items = [
        {"name": "Base Plan", "current_charge": 75.0, "baseline_charge": 60.0, "is_hidden_or_new": False},
        {"name": "Infrastructure Fee", "current_charge": 7.5, "baseline_charge": 0.0, "is_hidden_or_new": True}
    ]
    res = audit_bill_drift(current_total=82.5, previous_total=60.0, line_items=line_items, provider_name="Xfinity")
    assert res["monthly_drift"] == 22.5
    assert res["annual_leakage"] == 270.0
    assert "Infrastructure Fee" in res["new_surcharges"]
    assert res["requires_intervention"] is True

def test_policy_lookup():
    telecom_res = lookup_consumer_rights("TELECOM", "stealth_fee")
    assert "Federal Communications Commission" in telecom_res["authority"]
    assert "47 C.F.R." in telecom_res["citation"]

    sub_res = lookup_consumer_rights("SUBSCRIPTION", "cancel_barrier")
    assert "Federal Trade Commission" in sub_res["authority"]
    assert "16 C.F.R." in sub_res["citation"]

def test_recall_and_warranty_database():
    res = check_safety_and_warranty("Breville", "BRV-BES878-S24901", "2026-09-18")
    assert res["has_active_safety_recall"] is True
    assert res["days_remaining_in_warranty"] <= 7
    assert res["action_required"] == "IMMEDIATE_WARRANTY_RECALL_CLAIM"

def test_dispute_memo_drafting():
    draft = draft_action_resolution(
        action_type="FCC_PRICE_MATCH",
        provider_name="Comcast",
        account_id="ACC-123",
        dollar_impact=22.5,
        statutory_citation="47 C.F.R. § 8.1",
        specific_facts="Rate increased from $60 to $82.50."
    )
    assert "NOTICE OF RATE DISCREPANCY" in draft["subject"]
    assert "Federal Communications Commission" in draft["body"]
    assert draft["ready_for_dispatch"] is True

def test_end_to_end_orchestration_and_hitl_approval():
    async def _test():
        doc = IngestedDocument(
            id="test_doc_01",
            title="Test Telecom Bill",
            provider="TestTelco",
            category=CategoryType.TELECOM,
            document_date="2026-09-01",
            account_id="TEST-9901",
            total_amount=95.0,
            previous_month_amount=70.0,
            line_items=[
                {"name": "Data Plan", "current_charge": 85.0, "baseline_charge": 70.0, "is_hidden_or_new": False},
                {"name": "Tech Recovery Fee", "current_charge": 10.0, "baseline_charge": 0.0, "is_hidden_or_new": True}
            ]
        )
        card = await orchestrator.process_document(doc)
        assert card.status == ActionStatus.PENDING_APPROVAL
        assert card.monthly_impact == 25.0
        assert card.annual_impact == 300.0

        # Test Human Approval
        approval_res = await decision_manager.approve_decision(card.id, user_note="Test approve")
        assert approval_res["success"] is True
        assert card.status == ActionStatus.APPROVED
        assert approval_res["total_annual_savings"] >= 300.0
    
    asyncio.run(_test())
