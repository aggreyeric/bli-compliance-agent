# ⚖️ BLI Legal Compliance Agent

### Paste a contract. Get a risk-scored compliance report in seconds — no lawyer, no API keys, no data leaving your machine.

**Hackathon:** BLI Legal Tech 2 (DoraHacks) · Prize pool $50,000 · Virtual
**Team:** Solo — Eric
**Repo:** https://github.com/aggreyeric/bli-compliance-agent
**License:** MIT

---

## Elevator Pitch

Legal review is slow, expensive, and inaccessible. Most teams eyeball contracts or paste them into generic chat tools and hope for the best. **BLI Legal Compliance Agent** changes that: paste any contract, NDA, or terms of service, and in seconds it extracts every obligation, classifies each clause across **fifteen legal categories**, and flags high-risk language with a **plain-English recommendation** for what to negotiate.

The engine ships as a **single Docker container** exposing both a clean paste-and-analyze web UI and a **REST endpoint** for CI pipelines, contract-lifecycle tools, or Slack bots. It runs **entirely on your own infrastructure** — no API keys, no per-token cost, no document data leaving your machine.

Built for the BLI Legal Tech 2 Hackathon, it proves that fast, private, deterministic contract risk scanning belongs in every engineering and procurement workflow — without a legal budget or a call to outside counsel.

---

## Problem It Solves

- **Contracts are unread by the people who sign them.** Engineers, founders, and procurement teams agree to NDAs, vendor agreements, and terms of service without understanding the obligations buried inside.
- **Legal review is expensive and slow.** Outside counsel costs hundreds per hour; turnaround is days. Most low-stakes agreements never get reviewed at all.
- **Generic LLM chat tools leak data and hallucinate.** Pasting a contract into a consumer chatbot sends confidential text to a third party and returns inconsistent, uncited answers.
- **No structured, repeatable signal.** Teams need to triage contracts the way they triage code: a risk classification, a severity badge, and an actionable recommendation per clause — fast, private, and programmatic.

BLI Legal Compliance Agent turns any legal document into a structured compliance report: clause snippets, category, risk tier (high / medium / low), and a negotiation recommendation.

---

## Technical Highlights

- **15 legal term categories** — Liability, Indemnity, Warranty, Termination, Confidentiality, Jurisdiction, Governing Law, Dispute Resolution, Penalty, Breach, Compliance, Regulatory, IP, Non-Compete, Force Majeure.
- **3-tier risk scoring** with a per-category recommendation engine (e.g. "Negotiate cap on liability", "Negotiate favorable jurisdiction").
- **Deterministic & private by design** — runs fully on your own infrastructure. No external LLM calls, no per-token cost, no document data egress. Results are reproducible.
- **Dual interface** — a zero-friction web UI (paste → analyze) **and** a JSON REST API (`POST /api/comply`) for automation.
- **One-container deploy** — agent, risk scorer, API, and UI ship together via Docker; `docker compose up` and you're live.
- **Snippet extraction with context** — each matched obligation returns a ±40-char positioned excerpt, not just a label.
- **Typed TypeScript core** with a clean, testable pure function (`complianceAgent(docText) → { obligations, summary }`).
- **5 MB document ingestion** via `multer`/JSON, handling large agreements without choking.

---

## Architecture Overview

```
        ┌──────────────────────────────────────────────────────────┐
        │              BLI Compliance Agent (Node.js)              │
        │                                                          │
        │   public/index.html         src/index.ts                 │
        │   ┌───────────────┐  HTTP   ┌─────────────────────────┐  │
        │   │  Web UI       │────────▶│  Express app            │  │
        │   │  paste box +  │  JSON   │  - express.json (5MB)   │  │
        │   │  Analyze btn  │◀────────│  - static serving       │  │
        │   └───────────────┘         └──────────┬──────────────┘  │
        │                                        │ routes.ts        │
        │                            ┌───────────▼──────────────┐  │
        │                            │  POST /api/comply        │  │
        │                            │  GET  /api/health        │  │
        │                            └───────────┬──────────────┘  │
        │                                        │                  │
        │                            ┌───────────▼──────────────┐  │
        │                            │  agent.ts                │  │
        │                            │  complianceAgent(doc)    │  │
        │                            │  - 15-term rules corpus  │  │
        │                            │  - clause segmentation   │  │
        │                            │  - risk + recommendation │  │
        │                            │  - summary rollup        │  │
        │                            └──────────────────────────┘  │
        └──────────────────────────────────────────────────────────┘
```

**Request lifecycle (analyze):**
1. Client submits a document body — via the web UI textarea or `POST /api/comply` with a `{ "document": "..." }` JSON payload.
2. `complianceAgent()` splits the text into clause-level segments.
3. Each segment is matched against the 15 legal term definitions (term → category, risk, recommendation).
4. Every match becomes an `Obligation` with a positioned context snippet.
5. A `summary` rollup counts total / high / medium / low risk hits.
6. The caller receives structured JSON: `{ obligations: [...], summary: { total, high, medium, low } }`.

**Stack:** TypeScript · Node.js 20 · Express · multer · Docker.

---

## What's On-Chain vs Off-Chain

**This project is entirely off-chain.** It is a pure AI/rule-based compliance engine — no smart contracts, no wallet, no blockchain component was built.

> The original build brief listed an *optional* RWA/document-integrity attestation layer, with an explicit **"PIVOT if SDK fails — drop blockchain and focus on the pure AI compliance engine"** clause. We executed that pivot deliberately to ship a focused, fully-working legal-tech tool rather than a half-baked chain integration. Every dollar of effort went into the compliance engine, risk scorer, and dual interface.

This keeps the tool **private and dependency-free** — sensitive legal documents never leave the operator's infrastructure.

---

## Demo Steps

### Option A — Docker (recommended for judges)
```bash
docker compose up --build
```
Open http://localhost:3000.

### Option B — Local Node
```bash
npm install && npm start      # or: npm run dev
```
Open http://localhost:3000.

### Walkthrough
1. **Spin up** — single command; logs show `BLI Compliance Agent running on port 3000`.
2. **Open the UI** — clean paste-and-analyze interface (heading, textarea, "Analyze Document" button).
3. **Paste a document** — any contract, NDA, or terms of service. (The demo script ships a realistic Mutual NDA covering confidentiality, liability, indemnity, IP, and a Delaware governing-law clause.)
4. **Click Analyze** — results render with risk badges: **high** (red), **medium** (amber), **low** (green), each with a recommendation. A summary bar shows the count breakdown (e.g. `Total: 12 · High: 6 · Medium: 4 · Low: 2`).
5. **Try the REST API** — same engine, for automation:
   ```bash
   curl -s -X POST http://localhost:3000/api/comply \
     -H "Content-Type: application/json" \
     -d '{"document":"This agreement includes an indemnification clause and a non-compete for 24 months."}' | jq .
   ```

> A full **DEMO_VIDEO_SCRIPT.md** (≈3:00 runtime, voiceover + screen capture, sample NDA included) is provided in the repo for recording.

---

## Team

**Solo build — Eric.**

Entire stack designed and built by one person: the compliance/rule engine, risk scorer, REST API, web UI, Docker packaging, demo script, and documentation. No external contractors, no dependencies on third-party legal APIs.

---

## Repository

- **GitHub:** https://github.com/aggreyeric/bli-compliance-agent
- **License:** MIT (open source from day one)
- **Entry points:** `src/index.ts` (app) · `src/agent.ts` (compliance engine) · `src/routes.ts` (API) · `public/index.html` (UI)

### Repository Layout
```
bli-compliance-agent/
├── src/
│   ├── index.ts        # Express app bootstrap
│   ├── agent.ts        # compliance engine: 15-term corpus + risk scoring
│   └── routes.ts       # POST /api/comply · GET /api/health
├── public/
│   └── index.html      # paste-and-analyze web UI
├── Dockerfile · docker-compose.yml
├── README.md · SUBMISSION.md · BUILD_BRIEF.md · DEMO_VIDEO_SCRIPT.md
├── package.json · tsconfig.json
└── LICENSE (MIT)
```

---

## Status

- ✅ Compliance engine — 15 categories, risk tiers, recommendations
- ✅ Risk scoring + summary rollup
- ✅ REST API (`POST /api/comply`)
- ✅ Web UI (paste-and-analyze)
- ✅ Docker one-command deploy
- ✅ Demo video script + sample NDA
- 🔜 Automated test suite (unit precision targets + integration pipeline) — on the roadmap; see `BUILD_BRIEF.md` test plan
