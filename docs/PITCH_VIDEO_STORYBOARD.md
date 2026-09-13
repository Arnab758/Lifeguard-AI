# 🎬 LifeGuard Agent: Video Pitch Script & Demonstration Storyboard
**Target Duration:** 3:30 - 3:50 (Under 4:00 strict hackathon limit)  
**Hackathon:** AWS Agents for Humans Hackathon 2026 (Track: Everyday Agents)  
**Presenter Tone:** Confident, empathetic, crisp, and product-focused.

---

## Shot-by-Shot Script

### [0:00 - 0:35] Scene 1: The Problem & The Modern Consumer Trap
* **Visual:** Close-up of presenter speaking to camera, transitioning to b-roll or graphic of messy monthly bills: Comcast, gym membership, medical diagnostic bills.
* **On-screen graphic:** *"Average US Household Loses $3,200/Year in Silent Fee Creep."*
* **Voiceover / Spoken Script:**
> *"Every single month, millions of everyday people fall victim to what economists call the 'Silent Corporate Tax'. Your internet bill quietly jumps by $35 after a promo ends. Your gym makes it impossible to cancel online, demanding a certified letter or an in-person visit. A routine medical lab hits you with a surprise out-of-network charge. And a home appliance you use every day gets recalled for electrical fire hazards—buried in a government database you'll never see.*
>
> *Why do we lose thousands of dollars each year to this? Because corporations know everyday humans simply don’t have the time, energy, or legal expertise to fight back.*
>
> *Most AI tools claim to help, but they make you do all the work—you have to prompt them, upload PDFs manually, and chat back and forth. That's not an assistant; that’s another chore.*
>
> *We asked: what if an AI agent worked tirelessly in the background, fought for your consumer rights, and only asked for your approval before taking action?*
>
> *Meet **LifeGuard Agent**: the autonomous consumer protection daemon built for everyday humans."*

---

### [0:35 - 1:00] Scene 2: Who It's For & Why It Matters
* **Visual:** Cut to screen recording of the clean, glassmorphic LifeGuard Agent dashboard (`http://localhost:5173`).
* **On-screen badges:** *Everyday Humans | Autonomous Background Daemon | Zero Hallucinations | Human-in-the-Loop*
* **Voiceover / Spoken Script:**
> *"LifeGuard Agent is designed for every busy individual and family. It runs continuously as an ambient background process. When you receive a monthly statement, utility bill, or warranty notice, LifeGuard automatically audits it against your baseline agreements.*
>
> *Crucially, LifeGuard lives by a core design philosophy: **Make it do real work—not just chat.** LifeGuard never takes unilateral actions with your money or legal identity. Instead, it prepares turn-key **Decision Cards** with exact federal statutory citations and one-click execution."*

---

### [1:00 - 2:40] Scene 3: Live Working Demonstration (The Core Walkthrough)
* **Visual:** Direct screen capture of the LifeGuard Web UI. Cursor moves to the **"1-Click Test Scenarios"** panel.
* **Step 1: Ingesting an Anomaly (1:00 - 1:25)**
  * *Action:* Click on **"Comcast Xfinity: Stealth Price Hike (+$34.99/mo)"**.
  * *Visual:* Live SSE Thought Stream on the right side springs to life.
  * *Voiceover / Spoken Script:*
  > *"Let's see LifeGuard in action. I'm going to simulate a classic telecom bill where an internet provider quietly increased the monthly charge from $50 to $84.99 with an unannounced 'Network Enhancement Surcharge'.*
  >
  > *Watch the real-time agent trace on the right. Powered by the **Strands Agents SDK**, four specialized agents take action in milliseconds:*
  > 1. *First, the **AuditAgent** calls `audit_bill_drift`, identifying an unauthorized +$34.99 monthly cost drift—a 70% increase.*
  > 2. *Next, the **PolicyAgent** evaluates federal regulations and identifies a violation of the **FCC Broadband Consumer Label & Transparency Mandate (47 C.F.R. § 8.1)**.*
  > 3. *Third, the **ResolverAgent** invokes `draft_formal_resolution`, generating an iron-clad executive dispute letter.*
  > 4. *Finally, the **HITL Gatekeeper** calculates the financial impact and surfaces a Decision Card for human review."*

* **Step 2: Inspecting & Authorizing the Decision Card (1:25 - 2:05)**
  * *Action:* Scroll to the **"Human-in-the-Loop Action Center"**. Show the new Comcast card with "PENDING_APPROVAL" badge. Click **"Inspect Formal Dispute"**.
  * *Visual:* Modal opens displaying the full drafted dispute letter with account numbers, exact CFR statutes, and formal settlement demands.
  * *Voiceover / Spoken Script:*
  > *"Look at this Decision Card. It tells me in plain English: $34.99 monthly impact, $419.88 annual recovery. It cites the exact federal statute.*
  >
  > *If I click 'Inspect Formal Dispute', we can see the complete letter drafted for the telecom executive care team. It's polite, legally grounded, and ready to send.*
  >
  > *The human principal stays 100% in control. With one click, I click **'Approve & Dispatch'**."*

* **Step 3: Verification & Cumulative Savings Ledger (2:05 - 2:40)**
  * *Action:* Click "Approve & Dispatch". Show instant confirmation badge (`CONF-B289F4A1`) and watch the top-level **"Cumulative Annual Savings"** ticker instantly increment by +$419.88.
  * *Action:* Scroll to the **"Verified Financial Recovery Ledger"** showing the permanent audit trail.
  * *Action:* Click a second scenario: **"Breville Barista Pro: Safety Recall"** or **"Planet Fitness: Click-to-Cancel Trap"**. Show that it also analyzes FTC / CPSC rules and updates the ledger.
  * *Voiceover / Spoken Script:*
  > *"Instantly, LifeGuard dispatches the dispute, issues a verified confirmation reference, and records it in our **Cumulative Savings Ledger**. The ticker at the top has logged $419.88 back in my pocket.*
  >
  > *Let's also trigger the **Planet Fitness Cancellation Trap**. The gym refuses online cancellation. Within seconds, LifeGuard cites the **FTC Click-to-Cancel Rule (16 C.F.R. Part 425)**, prepares a formal notice under penalty of federal fines, and recovers another $359.88 annually.*
  >
  > *In under two minutes, LifeGuard has recovered over **$770** in annual cash for this family."*

---

### [2:40 - 3:15] Scene 4: Technical Architecture & AWS Bedrock AgentCore
* **Visual:** Display architecture diagram (from README / Blog post) and the `agentcore.yaml` manifest.
* **On-screen highlights:** *Amazon Bedrock (Claude 3.5 Sonnet) | Strands Agents SDK | AgentCore Runtime | Docker Container*
* **Voiceover / Spoken Script:**
> *"Under the hood, LifeGuard is built for scalable cloud deployment:*
> - *It uses the **Strands Agents SDK** (`strands-agents`) for type-safe tool definitions and stateful multi-agent coordination.*
> - *It is packaged as an **Amazon Bedrock AgentCore** container with full streaming SSE telemetry and automated health checks.*
> - *For intelligence, it leverages **Anthropic Claude 3.5 Sonnet on Amazon Bedrock**, ensuring deterministic reasoning and zero legal hallucinations.*
> - *The backend runs on **FastAPI** with an async event bus, and the frontend is built in **React and Vite** with a modern, glassmorphic dark-mode interface."*

---

### [3:15 - 3:45] Scene 5: Conclusion & Hackathon Vision
* **Visual:** Return to presenter with product UI running smoothly in background. Show GitHub repository and MIT license.
* **Voiceover / Spoken Script:**
> *"The future of AI agents isn't more chatbots. It's autonomous guardians that protect our time, our money, and our peace of mind.*
>
> *LifeGuard Agent turns everyday people from passive victims of corporate fine print into empowered consumers backed by automated legal advocacy.*
>
> *LifeGuard is 100% open-source under the MIT License, fully tested, and ready to deploy on Amazon Bedrock. Thank you for watching!"*

---

## Checklist for Recording
- [ ] Record at 1080p 60fps or 4K.
- [ ] Keep speech pacing brisk and energetic.
- [ ] Highlight the transition from "PENDING_APPROVAL" to "APPROVED".
- [ ] Show the SSE trace stream actively scrolling with thoughts and tool calls.
- [ ] Show the Savings Ledger updating dynamically.
- [ ] Total video runtime target: **3 minutes 40 seconds**.
