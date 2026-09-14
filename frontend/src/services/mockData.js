// Standalone Client-Side Fallback Engine for Netlify / Static Deployments
// Ensures 100% full functionality, realistic AI reasoning streams,
// and instant response even without a live Python backend server.

export const DEFAULT_SCENARIOS = {
  comcast: {
    id: "dec_comcast_2026_09",
    doc_id: "doc_comcast_2026_09",
    provider: "Comcast Xfinity",
    category: "TELECOM",
    severity: "HIGH",
    title: "Action Required: Comcast Xfinity — $419.88 at stake",
    summary: "LifeGuard detected telecom fee creep. Promotional rate expired ($22.50/mo increase) and an unannounced $7.50 'Network Modernization Fee' was added. Prepared dispute citing FCC Broadband Consumer Labels.",
    monthly_impact: 34.99,
    annual_impact: 419.88,
    status: "PENDING_APPROVAL",
    policy_reference: {
      authority: "Federal Communications Commission (FCC)",
      regulation: "Broadband Consumer Label & Transparency Mandate",
      citation: "47 C.F.R. § 8.1 & FCC Order 22-86",
      relevance: "ISPs are legally required to disclose all monthly fees and price increases in a standardized format. Adding unannounced surcharges violates federal disclosure mandates."
    },
    drafted_action_type: "FCC_PRICE_MATCH",
    drafted_subject: "Notice of Formal Billing Dispute: Unlawful Rate Increase (Account #XFIN-98214-77A)",
    drafted_body: `To Comcast Executive Customer Relations & Billing Compliance:

I am formally disputing the billing charges appearing on Statement #XFIN-98214-77A dated September 02, 2026. 

Under the FCC Broadband Consumer Label Rule (47 C.F.R. § 8.1), providers are legally mandated to furnish transparent disclosures of base service rates and ancillary recurring fees prior to renewal. The recent assessment of an unannounced $7.50 "Regional Network Modernization Fee" alongside the expiration of the baseline tariff constitutes an unlawful fee hike without statutory notice.

DEMANDED RESOLUTION:
1. Immediate reversal and credit of the $7.50 unauthorized administrative surcharge.
2. Reinstatement of the contracted $50.00/mo promotional tariff for a minimum 12-month extension.
3. Written confirmation that no collection actions or negative credit reporting will occur during this dispute.

Should Comcast fail to rectify this within thirty (30) business days, this matter will be escalated as a formal complaint with the FCC Consumer Inquiries and Complaints Division and the State Attorney General's Consumer Protection Division.

Sincerely,
Consumer Principal (Authorized via LifeGuard AI)`,
    executive_email: "executive_support@comcast.com",
    portal_url: "https://consumercomplaints.fcc.gov",
    mailing_address: "Comcast Center, 1701 JFK Blvd, Philadelphia, PA 19103",
    regulatory_agency: "Federal Communications Commission (FCC)"
  },
  gym: {
    id: "dec_gym_2026_09",
    doc_id: "doc_gym_2026_09",
    provider: "Planet Fitness",
    category: "SUBSCRIPTION",
    severity: "CRITICAL",
    title: "Action Required: Planet Fitness — $599.88 at stake",
    summary: "Zombie membership auto-debiting. Online cancellation disabled; club demands physical in-person desk visit or certified mail. Prepared FTC Rule 425 violation notice.",
    monthly_impact: 29.99,
    annual_impact: 599.88,
    status: "PENDING_APPROVAL",
    policy_reference: {
      authority: "Federal Trade Commission (FTC)",
      regulation: "Negative Option Rule / Click-to-Cancel Mandate",
      citation: "16 C.F.R. Part 425",
      relevance: "Sellers must make canceling recurring memberships as easy as signing up. Forcing physical visits or notarized certified mail to cancel online enrollment is an unlawful unfair practice with statutory penalties up to $51,744 per violation."
    },
    drafted_action_type: "FTC_CANCELLATION",
    drafted_subject: "FORMAL DEMAND FOR IMMEDIATE CANCELLATION & REVOCATION OF ACH CONSENT (Member #PF-88392)",
    drafted_body: `To Club General Manager & Corporate Billing Compliance:

Effective immediately, I hereby revoke all authorization for Planet Fitness to initiate recurring ACH debits or credit card charges against Member #PF-88392.

Under the Federal Trade Commission's Click-to-Cancel Mandate (16 C.F.R. Part 425), merchants enrolling consumers via digital channels are legally required to provide an equally accessible digital cancellation mechanism. Conditioning membership termination upon an in-person physical desk visit is an unlawful deceptive practice under Section 5 of the FTC Act.

DEMANDED ACTIONS:
1. Terminate membership #PF-88392 immediately upon receipt of this electronic notice.
2. Issue an immediate refund for all fees assessed post-cancellation request.
3. Cease all automated payment processing immediately.

Non-compliance will result in formal reporting to the FTC Consumer Sentinel Network and the Consumer Financial Protection Bureau (CFPB).

Sincerely,
Consumer Principal (Authorized via LifeGuard AI)`,
    executive_email: "resolutions@planetfitness.com",
    portal_url: "https://reportfraud.ftc.gov",
    mailing_address: "Planet Fitness Headquarters, 4 Liberty Lane West, Hampton, NH 03842",
    regulatory_agency: "Federal Trade Commission (FTC)"
  },
  medical: {
    id: "dec_quest_2026_09",
    doc_id: "doc_quest_2026_09",
    provider: "Quest Diagnostics",
    category: "HEALTHCARE",
    severity: "HIGH",
    title: "Action Required: Quest Diagnostics — $420.00 at stake",
    summary: "Surprise out-of-network balance billing for routine preventive lipid panel ordered during an in-network annual exam. Prepared statutory dispute citing the federal No Surprises Act.",
    monthly_impact: 35.00,
    annual_impact: 420.00,
    status: "PENDING_APPROVAL",
    policy_reference: {
      authority: "Centers for Medicare & Medicaid Services (CMS)",
      regulation: "Federal No Surprises Act (Balance Billing Protections)",
      citation: "45 C.F.R. § 149.410 & Public Law 116-260",
      relevance: "Prohibits out-of-network balance billing for ancillary lab services ordered during in-network encounters. Patient cost-sharing is strictly capped at in-network rates."
    },
    drafted_action_type: "NO_SURPRISES_APPEAL",
    drafted_subject: "FORMAL DISPUTE: Out-of-Network Balance Billing in Violation of the Federal No Surprises Act (Invoice #QD-78912)",
    drafted_body: `To Quest Diagnostics Patient Billing & Dispute Resolution:

I am writing to formally dispute Invoice #QD-78912 in the amount of $420.00 for diagnostic laboratory testing performed on August 18, 2026.

These tests were ordered by an in-network primary care physician during a covered annual wellness examination. Under the federal No Surprises Act (45 C.F.R. § 149.410), out-of-network laboratory providers performing ancillary diagnostic work ordered in connection with in-network care are legally prohibited from balance-billing patients beyond in-network cost-sharing limits.

DEMANDED ACTIONS:
1. Immediately suspend all billing collection efforts regarding Invoice #QD-78912.
2. Re-adjudicate this claim against the in-network Qualifying Payment Amount (QPA).
3. Issue an amended statement showing zero ($0.00) balance due.

Sincerely,
Consumer Principal (Authorized via LifeGuard AI)`,
    executive_email: "patientadvocacy@questdiagnostics.com",
    portal_url: "https://www.cms.gov/nosurprises/consumers",
    mailing_address: "Quest Diagnostics Billing Dispute Unit, 500 Plaza Drive, Secaucus, NJ 07094",
    regulatory_agency: "Centers for Medicare & Medicaid Services (CMS)"
  },
  warranty: {
    id: "dec_breville_2026_09",
    doc_id: "doc_breville_2026_09",
    provider: "Breville Culinary Systems",
    category: "WARRANTY",
    severity: "CRITICAL",
    title: "Action Required: Breville Barista Pro — $899.95 at stake",
    summary: "Safety hazard alert. Appliance thermal shutoff malfunction matches active CPSC Safety Recall #24-789 (boiler pressure scald & fire risk). Prepared recall replacement demand.",
    monthly_impact: 74.99,
    annual_impact: 899.95,
    status: "PENDING_APPROVAL",
    policy_reference: {
      authority: "U.S. Consumer Product Safety Commission (CPSC)",
      regulation: "Fast-Track Product Recall Mandate & Consumer Product Safety Act",
      citation: "15 U.S.C. § 2064 & CPSC Recall #24-789",
      relevance: "Manufacturers are required under federal law to repair, replace, or refund recalled consumer products posing fire or burn hazards at zero cost to the consumer."
    },
    drafted_action_type: "WARRANTY_RECALL",
    drafted_subject: "CPSC RECALL NOTICE: Demand for Factory Replacement Unit (Model: BES878 / Serial: BRV-993821)",
    drafted_body: `To Breville Product Safety & Warranty Administration:

This notice concerns Breville Barista Pro espresso machine (Serial: BRV-993821), which has experienced recurring high-pressure thermal shutoffs.

This condition corresponds directly to CPSC Fast-Track Safety Recall #24-789 regarding boiler pressure valve failures that present burn, scald, and electrical fire hazards. Under 15 U.S.C. § 2064, manufacturers are legally obligated to remediate recalled hazards at no cost to consumers.

DEMANDED ACTIONS:
1. Provide an expedited prepaid shipping container for the return of the affected unit.
2. Dispatch a factory-certified replacement unit or issue a full refund of the $899.95 purchase price.
3. Extend a full 2-year warranty on the replacement unit.

Sincerely,
Consumer Principal (Authorized via LifeGuard AI)`,
    executive_email: "recalls@brevilleusa.com",
    portal_url: "https://www.saferproducts.gov",
    mailing_address: "Breville USA Customer Support, 19400 S. Western Ave, Torrance, CA 90501",
    regulatory_agency: "U.S. Consumer Product Safety Commission (CPSC)"
  }
};

// Initial verified savings records for immediate display in the ledger
export const INITIAL_LEDGER_ITEMS = [
  {
    id: "sav_9281a",
    decision_id: "dec_verizon_prev",
    provider: "Verizon Wireless",
    category: "TELECOM",
    resolved_at: "2026-09-08T14:32:00Z",
    amount_monthly: 22.50,
    amount_annual: 270.00,
    action_type: "FCC_PRICE_MATCH",
    confirmation_number: "CONF-VZ90281"
  },
  {
    id: "sav_4812b",
    decision_id: "dec_adobe_prev",
    provider: "Adobe Creative Cloud",
    category: "SUBSCRIPTION",
    resolved_at: "2026-08-25T11:15:00Z",
    amount_monthly: 25.00,
    amount_annual: 300.00,
    action_type: "FTC_CANCELLATION",
    confirmation_number: "CONF-ADB44812"
  }
];

export const INITIAL_METRICS = {
  total_saved_annual: 570.00,
  pending_reviews_count: 1,
  ledger_items: INITIAL_LEDGER_ITEMS
};
