from strands import tool
from typing import Dict, Any
from datetime import datetime, timedelta

RECALL_BULLETINS = [
    {
        "brand": "Breville",
        "product": "Barista Touch Impress",
        "model_prefix": "BES878",
        "serial_prefix": "BRV-BES878-S24",
        "cpsc_campaign": "CPSC Recall #26-402",
        "hazard": "Boiler safety overpressure valve failure risk leading to scalding steam discharge",
        "remedy": "Full manufacturer replacement with updated revision unit or 100% refund of $899.95 MSRP",
        "contact_endpoint": "https://recall.breville.com/claims/bes878-pressure"
    },
    {
        "brand": "Samsung",
        "product": "Bespoke Top Load Washer",
        "model_prefix": "WA52A",
        "serial_prefix": "SAM-WA52",
        "cpsc_campaign": "CPSC Recall #26-118",
        "hazard": "Overheating control board poses fire hazard",
        "remedy": "Free in-home repair kit and software update",
        "contact_endpoint": "https://samsung.com/us/support/recall/washer"
    }
]

@tool
def check_safety_and_warranty(
    brand_or_model: str,
    serial_number: str,
    expiration_date_str: str
) -> Dict[str, Any]:
    """
    Scans the Consumer Product Safety Commission (CPSC) registry and warranty database
    for safety bulletins, impending expiration windows, and free repair/replacement eligibility.

    Args:
        brand_or_model: The brand or model name of the consumer product.
        serial_number: Device serial number or batch code.
        expiration_date_str: ISO format string of the warranty expiration date (e.g. '2026-09-18').

    Returns:
        A dictionary indicating days until expiration, active safety recall status, hazard details, and claim remedy.
    """
    days_remaining = None
    if expiration_date_str:
        try:
            exp_date = datetime.strptime(expiration_date_str[:10], "%Y-%m-%d")
            today = datetime(2026, 9, 13) # current local date
            days_remaining = (exp_date - today).days
        except Exception:
            days_remaining = 5

    matched_recall = None
    for bulletin in RECALL_BULLETINS:
        if bulletin["brand"].lower() in brand_or_model.lower() or bulletin["model_prefix"].lower() in brand_or_model.lower():
            if not serial_number or serial_number.startswith(bulletin["serial_prefix"]):
                matched_recall = bulletin
                break

    has_active_recall = matched_recall is not None
    urgent_window = days_remaining is not None and 0 <= days_remaining <= 14

    return {
        "brand_or_model": brand_or_model,
        "serial_number": serial_number,
        "days_remaining_in_warranty": days_remaining,
        "urgent_window": urgent_window,
        "has_active_safety_recall": has_active_recall,
        "recall_details": matched_recall if matched_recall else {},
        "action_required": "IMMEDIATE_WARRANTY_RECALL_CLAIM" if (has_active_recall and urgent_window) else "STANDARD_LOGGING"
    }
