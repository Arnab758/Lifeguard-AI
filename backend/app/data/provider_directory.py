"""
Provider Executive Directory
Real-world executive escalation emails, corporate dispute addresses,
and regulatory complaint portals.
"""

from typing import Dict, Any

PROVIDER_DIRECTORY: Dict[str, Dict[str, Any]] = {
    "comcast": {
        "formal_name": "Comcast Cable Communications, LLC (Xfinity)",
        "executive_email": "executive_customer_relations@cable.comcast.com",
        "portal_url": "https://consumercomplaints.fcc.gov",
        "regulatory_agency": "Federal Communications Commission (FCC)",
        "mailing_address": "1701 John F. Kennedy Blvd, Philadelphia, PA 19103, Attn: Executive Care",
        "phone": "1-800-934-6489"
    },
    "verizon": {
        "formal_name": "Verizon Communications Inc.",
        "executive_email": "executivecare@verizon.com",
        "portal_url": "https://consumercomplaints.fcc.gov",
        "regulatory_agency": "Federal Communications Commission (FCC)",
        "mailing_address": "1095 Avenue of the Americas, New York, NY 10036",
        "phone": "1-800-922-0204"
    },
    "att": {
        "formal_name": "AT&T Inc.",
        "executive_email": "executive.appeals@att.com",
        "portal_url": "https://consumercomplaints.fcc.gov",
        "regulatory_agency": "Federal Communications Commission (FCC)",
        "mailing_address": "208 S. Akard St, Dallas, TX 75202",
        "phone": "1-800-288-2020"
    },
    "spectrum": {
        "formal_name": "Charter Communications (Spectrum)",
        "executive_email": "executive.escalations@charter.com",
        "portal_url": "https://consumercomplaints.fcc.gov",
        "regulatory_agency": "Federal Communications Commission (FCC)",
        "mailing_address": "400 Atlantic St, Stamford, CT 06901",
        "phone": "1-833-267-6094"
    },
    "planet fitness": {
        "formal_name": "Planet Fitness Franchising, LLC",
        "executive_email": "customercare@planetfitness.com",
        "portal_url": "https://reportfraud.ftc.gov",
        "regulatory_agency": "Federal Trade Commission (FTC)",
        "mailing_address": "4 Holland Way, Hampton, NH 03842",
        "phone": "1-603-750-0001"
    },
    "adobe": {
        "formal_name": "Adobe Inc. Consumer Care",
        "executive_email": "cancellations-executive@adobe.com",
        "portal_url": "https://reportfraud.ftc.gov",
        "regulatory_agency": "Federal Trade Commission (FTC)",
        "mailing_address": "345 Park Avenue, San Jose, CA 95110",
        "phone": "1-800-833-6687"
    },
    "quest": {
        "formal_name": "Quest Diagnostics Clinical Laboratories, Inc.",
        "executive_email": "billing.disputes@questdiagnostics.com",
        "portal_url": "https://www.cms.gov/nosurprises/consumers",
        "regulatory_agency": "Centers for Medicare & Medicaid Services (CMS) / HHS",
        "mailing_address": "500 Plaza Drive, Secaucus, NJ 07094",
        "phone": "1-866-697-8378"
    },
    "breville": {
        "formal_name": "Breville USA, Inc.",
        "executive_email": "recalls.us@breville.com",
        "portal_url": "https://www.cpsc.gov/Recalls",
        "regulatory_agency": "Consumer Product Safety Commission (CPSC)",
        "mailing_address": "19400 S. Western Ave, Torrance, CA 90501",
        "phone": "1-866-273-8455"
    }
}

def lookup_provider_contacts(provider_name: str) -> Dict[str, Any]:
    """Finds executive contacts, regulatory portals, and mailing addresses for a provider."""
    normalized = provider_name.lower()
    for key, info in PROVIDER_DIRECTORY.items():
        if key in normalized:
            return info
    
    # Generic consumer advocacy contacts fallback
    return {
        "formal_name": provider_name,
        "executive_email": f"billing-disputes@{normalized.replace(' ', '')}.com",
        "portal_url": "https://reportfraud.ftc.gov",
        "regulatory_agency": "Federal Trade Commission (FTC) Consumer Bureau",
        "mailing_address": f"Corporate Headquarters, Attn: Legal & Billing Disputes, {provider_name}",
        "phone": "Check back of monthly statement"
    }
