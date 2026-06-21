# DoraHacks Submission Form Fields — BLI Legal Tech 2

> Hackathon: **BLI Legal Tech 2** · DoraHacks · $50,000 prize pool · Deadline 2026-11-01
> Repo: https://github.com/aggreyeric/bli-compliance-agent
> Status: **DRAFT — do not submit.** Awaiting Eric's approval before any portal entry.

This document collects every field a DoraHacks submission form typically asks for, pre-filled and copy-paste ready. Fill the `[PLACEHOLDER]` for the demo video URL once recorded.

---

## 1. Project Name

```
BLI Legal Compliance Agent
```

---

## 2. One-line Tagline (max 255 chars)

```
Paste a contract. Get a risk-scored compliance report in seconds — no lawyer, no API keys, no data leaving your machine.
```

_(153 characters — well under the 255 limit.)_

---

## 3. Description (500–800 words, judge narrative)

```
Every founder, engineer, and procurement lead signs contracts they've never fully read.

It isn't negligence — it's economics. Outside counsel runs hundreds of dollars per hour. Consumer chat tools are cheap but they leak confidential text and hallucinate clauses that don't exist. So NDAs, vendor agreements, and terms of service get signed on faith, and the first time anyone discovers an indemnity trap or a one-sided jurisdiction clause is when it's already too late.

BLI Legal Compliance Agent fixes that. Paste any contract and in seconds it extracts every obligation buried inside, classifies each clause across fifteen legal term categories, and flags high-risk language with a plain-English recommendation for what to negotiate next.

### What it does

The lifecycle is deliberately small and fast:

1. **Ingest** a document — either via the paste-and-analyze web UI or the JSON `POST /api/comply` endpoint.
2. **Segment** the text into clause-level units.
3. **Extract obligations** by matching each segment against a corpus of fifteen legal term categories.
4. **Score risk** on every match — high, medium, or low — with a category-specific recommendation.
5. **Return structured JSON**: a list of obligations, each with `{ category, risk, snippet, recommendation }`, plus a summary rollup of total, high, medium, and low counts.

### The fifteen categories

The engine ships with a rules corpus covering the categories that actually move risk in commercial agreements: liability, indemnity, jurisdiction, governing law, penalty, breach, intellectual property, warranty, termination, confidentiality, dispute resolution, regulatory, non-compete, force majeure, and compliance / audit. Each carries a default risk tier and a one-line, actionable recommendation — "Negotiate cap on liability," "Ensure mutual indemnification," "Add a cure period before termination." The kind of guidance a junior associate would give, minus the billable hour.

### Risk scoring, made readable

Every matched obligation carries a severity tier — high (red), medium (amber), low (green). The UI renders this as color-coded badges and a summary bar: Total: N · High: H · Medium: M · Low: L. A procurement manager gets an instant at-a-glance risk read on a fifty-page vendor agreement before anyone signs anything.

### API-first, so it lives in your pipeline

The same engine that powers the UI is available as a JSON endpoint for automation. Drop it into a CI gate that fails a pull request when a new vendor contract introduces uncapped liability. Wire it into a contract-lifecycle tool. Bolt a Slack bot on top that posts the high-risk summary whenever legal uploads a redline. One curl and you're in:

    curl -X POST http://localhost:3000/api/comply \
      -H "Content-Type: application/json" \
      -d '{"document":"The supplier shall indemnify the buyer against any liability..."}'

### Deterministic, private, zero-marginal-cost

This is the part worth dwelling on. The analysis engine is keyword-based and runs entirely on the operator's own infrastructure — no external LLM calls, no API keys, no per-token fees. That means three things judges should care about.

First, **determinism**. The same contract always returns the same obligations. Reproducible audits, testable pipelines, no drift between runs. Second, **privacy**. Sensitive documents — the kind procurement teams and legal departments handle every day — never leave the machine. No data egress, no vendor exposure, no compliance headaches. Third, **economics**. There is no marginal cost to scan a contract. Run it on ten documents or ten thousand; the cost is the same flat zero.

We made a deliberate engineering trade-off: instead of bolting an LLM onto every request for the sake of a buzzword, we built a typed, deterministic corpus that does the boring, repeatable work of legal triage perfectly every time. An LLM layer can be layered on later for novel clauses — but the bones are reliable.

### How judges should look at it

One command — `docker compose up --build` — brings up the compliance agent, the risk scorer, the REST API, and the web UI in a single container. Open `localhost:3000`, paste the sample Mutual NDA bundled in the repo (it covers confidentiality, liability, indemnity, IP, and a Delaware governing-law clause), and watch the high-risk badges light up immediately. Then run the identical analysis over the JSON API with the curl one-liner above.

The engine itself — `src/agent.ts` — is short, typed, and self-documenting: a pure function, `complianceAgent(doc)`, that turns a rules corpus into clause segmentation, risk scoring, recommendations, and a summary rollup. Read it. It's the cleanest piece of the project.

### Why this matters

Legal review should not be a luxury of well-funded companies. Fast, private, deterministic contract risk scanning belongs in every engineering and procurement workflow — without a legal budget. That's the thesis, and that's what we shipped.
```

---

## 4. Demo Video URL

```
[PLACEHOLDER — record per DEMO_VIDEO_SCRIPT.md (~3:00 runtime), upload to YouTube as unlisted, paste link here before submitting.]
```

---

## 5. GitHub Repository

```
https://github.com/aggreyeric/bli-compliance-agent
```

- **License:** MIT
- **Entry points:** `src/index.ts` (app) · `src/agent.ts` (compliance engine) · `src/routes.ts` (API) · `public/index.html` (UI)
- **One-command run:** `docker compose up --build` → http://localhost:3000

---

## 6. Track Suggestion

DoraHacks tracks aren't enumerated in the brief, but based on the official hackathon tags (**legaltech · compliance · regtech · RWA · AI**), the suggested primary and secondary track selections:

- **Primary track:** **AI** — the project is an AI-powered compliance agent; obligation extraction, classification, and risk scoring are the core value.
- **Secondary track (if offered):** **Legal Tech / RegTech** — closest fit to the "legaltech, compliance, regtech" tags.
- **If RWA is a distinct track:** the current build is off-chain (no attestation layer shipped). Do **not** select RWA unless the optional blockchain attestation layer from BUILD_BRIEF.md is implemented before submission — judges will check.

**Recommended copy for an open "which track best fits" field:**

```
Primary: AI. Secondary: Legal Tech / RegTech. The project is a deterministic, keyword-based compliance agent that extracts obligations from contracts across 15 legal term categories and scores each by risk. It is AI in the legal-tech and regtech sense — automated regulatory document review and risk assessment.
```

---

## Pre-Submission Checklist (for Eric)

- [ ] Demo video recorded, uploaded unlisted, URL pasted into section 4
- [ ] GitHub repo public and README renders cleanly on dorahacks preview
- [ ] `docker compose up --build` runs clean on a fresh clone (verify on a judge-style machine)
- [ ] Track selection confirmed against the live DoraHacks track list once published
- [ ] No secrets, API keys, or PII in repo or submission text
- [ ] Eric's explicit GO before any portal submit button is pressed
