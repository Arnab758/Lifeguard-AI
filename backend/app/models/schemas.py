from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum
from datetime import datetime, timezone

class SeverityLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class ActionStatus(str, Enum):
    PENDING_APPROVAL = "PENDING_APPROVAL"
    APPROVED = "APPROVED"
    MODIFIED = "MODIFIED"
    DISMISSED = "DISMISSED"

class CategoryType(str, Enum):
    TELECOM = "TELECOM"
    SUBSCRIPTION = "SUBSCRIPTION"
    WARRANTY = "WARRANTY"
    HEALTHCARE = "HEALTHCARE"
    UTILITIES = "UTILITIES"

class LineItem(BaseModel):
    name: str
    current_charge: float
    baseline_charge: Optional[float] = None
    is_hidden_or_new: bool = False
    details: Optional[str] = None

class IngestedDocument(BaseModel):
    id: str
    title: str
    provider: str
    category: CategoryType
    document_date: str
    account_id: str
    total_amount: float
    previous_month_amount: Optional[float] = None
    line_items: List[LineItem] = []
    contract_end_date: Optional[str] = None
    warranty_expiration: Optional[str] = None
    serial_number: Optional[str] = None
    raw_notes: Optional[str] = None

class AnomalyReport(BaseModel):
    doc_id: str
    detected_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    category: CategoryType
    provider: str
    headline: str
    monthly_leakage: float
    annual_leakage: float
    severity: SeverityLevel
    primary_issue: str
    supporting_evidence: List[str]

class ConsumerPolicyReference(BaseModel):
    authority: str # e.g. "Federal Communications Commission (FCC)"
    regulation: str # e.g. "Broadband Consumer Label & Transparency Mandate"
    citation: str # e.g. "47 C.F.R. § 8.1"
    relevance: str

class DecisionCard(BaseModel):
    id: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    doc_id: str
    provider: str
    category: CategoryType
    severity: SeverityLevel
    title: str
    summary: str
    monthly_impact: float
    annual_impact: float
    status: ActionStatus = ActionStatus.PENDING_APPROVAL
    policy_reference: ConsumerPolicyReference
    drafted_action_type: str # e.g. "FCC_PRICE_MATCH_DISPUTE", "FTC_CLICK_TO_CANCEL", "WARRANTY_RECALL_CLAIM", "CPT_OVERBILLING_APPEAL"
    drafted_subject: str
    drafted_body: str
    executive_email: Optional[str] = None
    portal_url: Optional[str] = None
    mailing_address: Optional[str] = None
    regulatory_agency: Optional[str] = None
    suggested_actions: List[str] = ["Approve & Dispatch", "Modify Terms", "Dismiss"]
    action_taken_at: Optional[str] = None
    user_note: Optional[str] = None
    confirmation_reference: Optional[str] = None

class AgentEvent(BaseModel):
    id: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    agent_name: str # e.g. "AuditAgent", "PolicyAgent", "ResolverAgent", "HITLGatekeeper"
    step: str
    thought: str
    tool_called: Optional[str] = None
    tool_input: Optional[Dict[str, Any]] = None
    tool_output: Optional[Dict[str, Any]] = None
    severity: Optional[SeverityLevel] = None

class SavingsRecord(BaseModel):
    id: str
    decision_id: str
    provider: str
    category: CategoryType
    resolved_at: str
    amount_monthly: float
    amount_annual: float
    action_type: str
    confirmation_number: str
