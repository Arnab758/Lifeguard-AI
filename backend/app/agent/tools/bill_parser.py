from strands import tool
from typing import Dict, Any, List

@tool
def audit_bill_drift(
    current_total: float,
    previous_total: float,
    line_items: List[Dict[str, Any]],
    provider_name: str
) -> Dict[str, Any]:
    """
    Audits a household recurring statement or bill for stealth price increases,
    unannounced surcharges, and baseline drift.

    Args:
        current_total: Current monthly total billed amount.
        previous_total: Baseline or previous month total amount.
        line_items: List of item dictionaries with name, current_charge, baseline_charge, is_hidden_or_new.
        provider_name: Name of the billing provider or utility.

    Returns:
        A dictionary containing monthly drift, annual projected leakage, new surcharges found, and severity.
    """
    monthly_drift = round(current_total - previous_total, 2)
    annual_leakage = round(monthly_drift * 12, 2)
    
    new_surcharges = []
    drift_items = []
    
    for item in line_items:
        current = item.get("current_charge", 0.0)
        baseline = item.get("baseline_charge", 0.0)
        is_new = item.get("is_hidden_or_new", False)
        
        diff = round(current - baseline, 2)
        if is_new or diff > 0:
            drift_items.append({
                "item": item.get("name"),
                "increase": diff,
                "current": current,
                "baseline": baseline,
                "is_new": is_new,
                "details": item.get("details", "")
            })
            if is_new:
                new_surcharges.append(item.get("name"))
                
    percentage_increase = round((monthly_drift / previous_total) * 100, 1) if previous_total > 0 else 100.0
    
    severity = "LOW"
    if monthly_drift > 50 or percentage_increase > 30:
        severity = "HIGH"
    elif monthly_drift > 15 or percentage_increase > 15:
        severity = "MEDIUM"
        
    return {
        "provider": provider_name,
        "monthly_drift": monthly_drift,
        "annual_leakage": annual_leakage,
        "percentage_increase": percentage_increase,
        "new_surcharges": new_surcharges,
        "drift_items": drift_items,
        "severity": severity,
        "requires_intervention": monthly_drift > 5.0
    }
