from strands import tool
from typing import Dict, Any

@tool
def draft_action_resolution(
    action_type: str,
    provider_name: str,
    account_id: str,
    dollar_impact: float,
    statutory_citation: str,
    specific_facts: str
) -> Dict[str, Any]:
    """
    Generates a formal, legally grounded dispute letter, cancellation notice,
    or warranty claim ready for human authorization and dispatch.

    Args:
        action_type: The category of action ("FCC_PRICE_MATCH", "FTC_CANCELLATION", "WARRANTY_RECALL", "NO_SURPRISES_APPEAL").
        provider_name: Name of the billing entity or merchant.
        account_id: Consumer account reference or invoice number.
        dollar_impact: Amount in dispute or annual savings figure.
        statutory_citation: Governing legal regulation or rule citation.
        specific_facts: Key factual points, dates, and evidence.

    Returns:
        A dictionary containing the subject line, structured body, and delivery channel recommendation.
    """
    today_str = "September 13, 2026"
    
    if "FCC_PRICE_MATCH" in action_type:
        subject = f"NOTICE OF RATE DISCREPANCY & PROMOTIONAL RETENTION REQUEST — Acct #{account_id}"
        body = (
            f"Date: {today_str}\n"
            f"To: {provider_name} Executive Resolutions & Retention Management\n"
            f"RE: Account #{account_id} | Disputed Monthly Drift: ${dollar_impact:.2f}/mo\n\n"
            f"I am writing regarding my recent billing statement, which reflects an unannounced monthly rate increase "
            f"to ${dollar_impact:.2f} above my agreed baseline, alongside a new regional infrastructure fee.\n\n"
            f"Under the Federal Communications Commission (FCC) Broadband Consumer Transparency rules ({statutory_citation}), "
            f"consumers must be provided clear, conspicuous notice of all rate expirations and mandatory surcharges.\n\n"
            f"Current Facts & Competitive Context:\n"
            f"{specific_facts}\n\n"
            f"Action Requested:\n"
            f"1. Immediate adjustment of my account back to the competitive retention rate of $55.00/month.\n"
            f"2. Waiver and credit of the unauthorized administrative surcharge on the current billing cycle.\n"
            f"Failure to restore equitable terms will result in account cancellation and a formal inquiry filed with the FCC Consumer Inquiries and Complaints Division."
        )
        channel = "CUSTOMER_RETENTION_API_OR_FORM"

    elif "FTC_CANCELLATION" in action_type:
        subject = f"DEMAND FOR IMMEDIATE MEMBERSHIP TERMINATION & REVOCATION OF PRE-AUTH DEBIT — Acct #{account_id}"
        body = (
            f"Date: {today_str}\n"
            f"To: {provider_name} Member Services & Billing Department\n"
            f"RE: Formal Termination of Account #{account_id}\n\n"
            f"Please be advised that I am formally terminating my membership associated with Account #{account_id}, effective immediately.\n\n"
            f"Pursuant to the Federal Trade Commission's (FTC) Negative Option Rule ({statutory_citation}), "
            f"businesses utilizing recurring automatic debits are legally obligated to provide a cancellation mechanism "
            f"that is at least as simple and accessible as the enrollment method ('Click-to-Cancel'). Conditioning cancellation "
            f"on physical attendance or certified mail for an account with zero utilization in over 180 days is unlawful.\n\n"
            f"Account Record:\n"
            f"{specific_facts}\n\n"
            f"Notice of Revocation:\n"
            f"I hereby revoke all recurring auto-debit authorizations linked to this account under Regulation E. "
            f"Please issue written confirmation of cancellation and account closure within three (3) business days."
        )
        channel = "BILLING_LEGAL_NOTICE"

    elif "WARRANTY_RECALL" in action_type:
        subject = f"URGENT: CPSC SAFETY RECALL REPLACEMENT CLAIM — Product: {provider_name} (Ref #{account_id})"
        body = (
            f"Date: {today_str}\n"
            f"To: {provider_name} Warranty & Safety Recall Administration\n"
            f"RE: Recall Claim under {statutory_citation}\n\n"
            f"I am the registered owner of the appliance specified below, which has an active manufacturer limited warranty "
            f"expiring within the current calendar week, and falls under an active Consumer Product Safety Commission recall campaign.\n\n"
            f"Product & Recall Data:\n"
            f"{specific_facts}\n\n"
            f"Remedy Demanded:\n"
            f"Under the Magnuson-Moss Warranty Act ({statutory_citation}), consumers are entitled to a full remedy without charge. "
            f"Please expedite dispatch of a replacement revision unit or provide return shipping authorization for a full refund of the purchase price ($899.95)."
        )
        channel = "MANUFACTURER_RECALL_PORTAL"

    else: # Healthcare No Surprises Act
        subject = f"DISPUTE OF UNLAWFUL OUT-OF-NETWORK BALANCE BILL — Patient Statement #{account_id}"
        body = (
            f"Date: {today_str}\n"
            f"To: {provider_name} Patient Financial Services & Dispute Resolution\n"
            f"RE: Statement #{account_id} | Inappropriate Balance Bill of ${dollar_impact:.2f}\n\n"
            f"I am disputing the charges on the referenced laboratory statement. The blood specimens were obtained during a routine in-network "
            f"preventive visit at an in-network medical provider.\n\n"
            f"Legal Authority:\n"
            f"Under the Federal No Surprises Act ({statutory_citation}), out-of-network balance billing for ancillary services "
            f"ordered by an in-network provider is prohibited by law. The patient can only be held responsible for in-network cost-sharing amounts.\n\n"
            f"Claim Analysis:\n"
            f"{specific_facts}\n\n"
            f"Required Resolution:\n"
            f"1. Recalculate patient responsibility to the in-network negotiated rate ($85.00) or provide documentation of primary payer adjudication.\n"
            f"2. Place a 60-day dispute hold on this account preventing any adverse credit reporting or third-party collection referral."
        )
        channel = "HEALTHCARE_APPEALS_SECURE_PORTAL"

    return {
        "action_type": action_type,
        "subject": subject,
        "body": body,
        "channel": channel,
        "ready_for_dispatch": True
    }
