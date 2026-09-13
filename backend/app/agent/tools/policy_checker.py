from strands import tool
from typing import Dict, Any

POLICY_DATABASE = {
    "TELECOM": {
        "authority": "Federal Communications Commission (FCC)",
        "regulation": "Broadband Consumer Label & Transparency Mandate",
        "citation": "47 C.F.R. § 8.1 & FCC Order 22-86",
        "key_protections": "Requires ISPs to disclose all monthly fees, discounts, and non-promotional rate hikes in a standardized format. Unannounced administrative surcharges violate consumer disclosure mandates.",
        "enforcement_action": "Formal consumer complaint with FCC and demand for price-match to prevailing promotional tariff."
    },
    "SUBSCRIPTION": {
        "authority": "Federal Trade Commission (FTC)",
        "regulation": "Negative Option Rule / Click-to-Cancel Mandate",
        "citation": "16 C.F.R. Part 425",
        "key_protections": "Sellers must make canceling a subscription or recurring membership as easy as signing up. Requiring physical visits or certified mail to cancel an online enrollment is an unlawful unfair practice.",
        "enforcement_action": "Demand for immediate electronic cancellation, revocation of payment authorization, and refund of unauthorized post-contract fees."
    },
    "HEALTHCARE": {
        "authority": "Centers for Medicare & Medicaid Services (CMS)",
        "regulation": "Federal No Surprises Act (Balance Billing Protections)",
        "citation": "Public Law 116-260 & 45 C.F.R. § 149.410",
        "key_protections": "Prohibits out-of-network balance billing for ancillary services (such as pathology, lab testing, and radiology) rendered at or ordered through in-network facilities. Patient responsibility is strictly capped at in-network cost-sharing amounts.",
        "enforcement_action": "Demand to re-adjudicate bill to in-network qualifying payment amount (QPA) and cease collection activity."
    },
    "WARRANTY": {
        "authority": "Federal Trade Commission (FTC)",
        "regulation": "Magnuson-Moss Warranty Act",
        "citation": "15 U.S.C. § 2301 et seq.",
        "key_protections": "Governs consumer product warranties. If a latent defect exists or an official product safety recall bulletin is issued before warranty expiry, the warrantor must repair, replace, or refund the full purchase price without cost to the consumer.",
        "enforcement_action": "Formal warranty recall claim for 100% manufacturer replacement unit or free authorized overhaul."
    }
}

@tool
def lookup_consumer_rights(category: str, issue_type: str) -> Dict[str, Any]:
    """
    Looks up applicable federal and state consumer protection statutes,
    statutory citations, and recommended legal leverage for a specific dispute category.

    Args:
        category: The category of dispute ("TELECOM", "SUBSCRIPTION", "HEALTHCARE", "WARRANTY").
        issue_type: Short descriptor of the violation (e.g. "stealth_fee", "cancel_barrier", "surprise_bill", "recall").

    Returns:
        A dictionary with the governing authority, statutory citation, and legal enforcement remedy.
    """
    cat_upper = category.upper()
    policy = POLICY_DATABASE.get(cat_upper, {
        "authority": "Uniform Commercial Code & State Consumer Protection Bureau",
        "regulation": "Unfair and Deceptive Acts and Practices (UDAP)",
        "citation": "State Deceptive Trade Practices Act",
        "key_protections": "Prohibits deceptive billing and non-disclosed recurring surcharges.",
        "enforcement_action": "Demand for refund and itemized billing ledger."
    })
    
    return {
        "category": cat_upper,
        "issue_type": issue_type,
        "authority": policy["authority"],
        "regulation": policy["regulation"],
        "citation": policy["citation"],
        "legal_basis": policy["key_protections"],
        "recommended_action": policy["enforcement_action"]
    }
