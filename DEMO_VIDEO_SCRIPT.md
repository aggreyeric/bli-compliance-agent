# 🎬 BLI Legal Compliance Agent — Demo Video Script

**Runtime:** ~3:00
**Format:** Single-host screencast (voiceover + screen capture)
**Audience:** BLI Legal Tech 2 Hackathon judges
**Setup:** Terminal, browser, and a text file with the sample NDA (provided below) ready to paste

---

## 📝 Sample Contract — Have This Ready to Paste

Copy this into your clipboard before recording. It's a realistic Mutual NDA excerpt designed to trigger multiple risk categories (Confidentiality, Liability, Indemnity, Governing Law, Jurisdiction, IP, Termination, Warranty, Breach).

```
MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of the
Effective Date by and between Acme Analytics, Inc. ("Disclosing Party") and
Northwind Systems GmbH ("Receiving Party").

1. CONFIDENTIALITY. Each party agrees to hold the other party's Confidential
Information in strict confidence and shall not disclose it to any third party
without prior written consent, except as required by law or binding court order.

2. PERMITTED USE. The Receiving Party shall use Confidential Information solely
for the purpose of evaluating a potential business collaboration between the parties.

3. LIABILITY. Neither party shall be liable for indirect, incidental, or
consequential damages. The aggregate liability of either party under this Agreement
shall not exceed the total fees paid in the twelve months preceding the claim.

4. INDEMNIFICATION. Each party shall indemnify and hold harmless the other from
any third-party claims arising out of breach of this Agreement or gross negligence.

5. INTELLECTUAL PROPERTY. All Confidential Information remains the sole property
of the Disclosing Party. No license or other intellectual property rights are
granted except as expressly stated herein.

6. WARRANTY. Confidential Information is provided "AS IS" without warranty of any
kind, express or implied, including any warranty of accuracy or fitness for purpose.

7. TERM AND TERMINATION. This Agreement shall remain in effect for three (3) years.
Either party may terminate this Agreement upon thirty (30) days written notice if
the other party commits a material breach and fails to cure within sixty (60) days.

8. GOVERNING LAW AND JURISDICTION. This Agreement shall be governed by the laws of
the State of Delaware, without regard to conflict of laws. The parties submit to
the exclusive jurisdiction of the state and federal courts located in Wilmington,
Delaware for any dispute arising hereunder.

9. BREACH. The parties acknowledge that monetary damages alone may be inadequate
remedy for breach of confidentiality obligations, and that equitable relief may
be sought.

10. RETURN OF MATERIALS. Upon termination, the Receiving Party shall return or
destroy all Confidential Information within ten (10) business days.
```

> 📋 **Before pressing record:** Select-all and copy the block above.

---

## 🎥 SCRIPT

### [0:00 – 0:25] Intro — The Problem

**VOICEOVER:**

> Reading a legal contract shouldn't take a lawyer and three billable hours. Most teams paste NDAs, terms of service, and vendor agreements into a chat tool and hope for the best.
>
> BLI Legal Compliance Agent does something different. You paste a document, and in seconds it extracts every obligation, flags the high-risk clauses, and tells you exactly what to negotiate. No API keys, no per-token cost, no data leaving your machine.

**ON SCREEN:**
- Title card: **"BLI Legal Compliance Agent — AI-Powered Contract Risk Scanning"**
- Subtitle: "Built for BLI Legal Tech 2"
- Quick montage of a dense contract scrolling by (motion blur, no readable text)

---

### [0:25 – 0:45] Step 1 — Spin It Up

**VOICEOVER:**

> The entire stack ships in a single Docker container — agent, risk scorer, web UI, and REST API. One command brings it all up.

**ON SCREEN:**
- Terminal, type and run:
  ```bash
  docker compose up
  ```
- Show logs streaming: server listening on port 3000.
- Highlight the single line: `BLI Legal Compliance Agent ready at http://localhost:3000`

---

### [0:45 – 1:05] Step 2 — Open the UI

**VOICEOVER:**

> Open localhost:3000 and you land on a clean paste-and-analyze interface. Big text box, one button. That's the whole UX — on purpose.

**ON SCREEN:**
- Browser opens to `http://localhost:3000`
- Pan across the page: heading, empty textarea, the "Analyze Document" button.

---

### [1:05 – 1:35] Step 3 — Paste & Analyze

**VOICEOVER:**

> Let's feed it a real Mutual NDA. I've got a standard two-party agreement here covering confidentiality, liability, indemnity, IP, and a Delaware governing-law clause. I'll paste it in and click Analyze.

**ON SCREEN:**
- Paste the sample NDA into the textarea (the whole block scrolls in).
- Cursor moves to the **Analyze Document** button.
- Click it. Show a brief processing state, then results render.

---

### [1:35 – 2:15] Step 4 — Read the Obligations

**VOICEOVER:**

> The agent breaks the document into clauses and matches each one against fifteen legal term categories — Liability, Indemnification, Warranty, Termination, Confidentiality, Jurisdiction, Governing Law, Dispute Resolution, Penalty, Breach, Compliance, Regulatory, Intellectual Property, Non-Compete, and Force Majeure.
>
> Every matched obligation gets a risk badge — **high** in red, **medium** in amber, **low** in green — plus a plain-English recommendation. So this Delaware jurisdiction clause? Red flag. The agent says: negotiate a more favorable forum. The uncapped indemnity? Another red flag.

**ON SCREEN:**
- Scroll through the results list.
- Call out three specific obligations:
  - **Governing Law — HIGH** → "Verify applicable law"
  - **Jurisdiction — HIGH** → "Negotiate favorable jurisdiction"
  - **Liability — HIGH** → "Negotiate cap on liability"
- Show the summary bar at the top: e.g. `Total: 12 · High: 6 · Medium: 4 · Low: 2`

---

### [2:15 – 2:45] Step 5 — The REST API

**VOICEOVER:**

> Same engine is available as a REST endpoint for CI pipelines, contract lifecycle tools, or a Slack bot. POST your document to `/api/comply` and get back structured JSON — obligations, risk levels, recommendations, and a summary.

**ON SCREEN:**
- New terminal pane, run:
  ```bash
  curl -s -X POST http://localhost:3000/api/comply \
    -H "Content-Type: application/json" \
    -d '{"document":"This agreement includes an indemnification clause and a non-compete for 24 months."}' | jq .
  ```
- Show the JSON response: `obligations` array with `category`, `risk`, `recommendation`, and the `summary` object (`total`, `high`, `medium`, `low`).

---

### [2:45 – 3:00] Closing — Legal Tech for Everyone

**VOICEOVER:**

> Fifteen categories, three risk tiers, instant recommendations — running entirely on your own infrastructure. No legal budget required.
>
> BLI Legal Compliance Agent. Legal tech that works for everyone.
>
> Star the repo, fork it, ship it. Thanks for watching.

**ON SCREEN:**
- Title card: **"BLI Legal Compliance Agent"**
- Subtitle: `docker compose up` → `http://localhost:3000`
- Footer: "MIT License · Built for BLI Legal Tech 2"
- Fade out.

---

## 🎬 Production Notes

| Item | Detail |
|---|---|
| **Resolution** | 1920×1080, 30fps |
| **Audio** | Clean voiceover, no background music during narration — soft ambient bed only on title cards |
| **Font** | System default in browser; monospace in terminal |
| **Pacing** | Leave 2–3s breathing room after each Analyze click for results to render |
| **Redo segments** | Steps 3–4 are the hero shot; record multiple takes |
| **Total target** | 3:00 ± 10s — if over, trim the curl JSON output display |

## ✅ Pre-Record Checklist

- [ ] Docker daemon running; `docker compose up` tested and starts in <10s
- [ ] Sample NDA copied to clipboard
- [ ] Browser at `http://localhost:3000`, cache cleared, fresh load
- [ ] Second terminal tab open with the `curl` command typed (not yet run)
- [ ] Mic levels checked; room quiet
- [ ] Notifications muted (Slack, calendar, etc.)
