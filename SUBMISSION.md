# ⚖️ BLI Legal Compliance Agent

> **Paste a contract. Get a risk-scored compliance report in seconds — no lawyer, no API keys, no data leaving your machine.**

**Hackathon:** BLI Legal Tech 2 (DoraHacks) · Prize pool $50,000 · Virtual
**Team:** Solo — Eric
**Repo:** https://github.com/aggreyeric/bli-compliance-agent
**License:** MIT

---

## Elevator Pitch

Legal review is slow, expensive, and inaccessible. Engineers, founders, and procurement teams routinely sign contracts they never fully read — NDAs, vendor agreements, terms of service — because outside counsel costs hundreds per hour and consumer chat tools leak confidential text and hallucinate.

**BLI Legal Compliance Agent** fixes that. Paste any contract and in seconds it extracts every obligation, classifies each clause across fifteen legal categories, and flags high-risk language with a plain-English recommendation for what to negotiate next.

It ships as a single Docker container exposing both a clean paste-and-analyze web UI and a JSON REST endpoint for CI pipelines, contract-lifecycle tools, and automation. Everything runs entirely on your own infrastructure — no API keys, no per-token cost, no document data leaving your machine.

Fast, private, and deterministic contract risk scanning belongs in every engineering and procurement workflow — without a legal budget.

---

## Detailed Description

**BLI Legal Compliance Agent** turns any legal document into a structured, risk-scored compliance report. It reads contracts, NDAs, and terms of service and surfaces every obligation buried inside them, so the people who sign agreements actually understand what they're agreeing to.

### What it does
1. **Ingests** a document body — via the web UI paste box or the `POST /api/comply` JSON endpoint.
2. **Segments** the text into clause-level units.
3. **Extracts obligations** by matching each segment against a corpus of **15 legal term categories**.
4. **Scores risk** on every match — `high` / `medium` / `low` — with a category-specific recommendation.
5. **Returns structured JSON**: a list of `{ category, risk, snippet, recommendation }` obligations plus a `summary` rollup of total / high / medium / low counts.

### The 15 legal term categories
The compliance engine ships with a built-in rules corpus covering the categories that actually move risk in commercial agreements:

| Category | Default risk | Example recommendation |
|---|---|---|
| Liability | high | Negotiate cap on liability |
| Indemnity | high | Ensure mutual indemnification |
| Jurisdiction | high | Negotiate favorable jurisdiction |
| Governing Law | high | Verify applicable law |
| Penalty | high | Check penalty caps |
| Breach | high | Define material breach clearly |
| Intellectual Property (IP) | high | Clarify IP ownership |
| Warranty | medium | Define warranty scope and duration |
| Termination | medium | Add cure period before termination |
| Confidentiality | medium | Verify exceptions are reasonable |
| Dispute Resolution | medium | Review arbitration rules |
| Regulatory | medium | Identify applicable regulations |
| Non-Compete | medium | Check duration and scope |
| Force Majeure | low | Check covered events |
| Compliance / Audit | low | Ensure audit right is reasonable |

### Risk scoring
Each matched obligation carries a severity tier — **high** (red), **medium** (amber), **low** (green) — plus a plain-English, actionable recommendation. The UI renders this as color-coded badges and a summary bar (`Total: N · High: H · Medium: M · Low: L`), giving an instant at-a-glance risk read on any document.

### REST API
The same engine that powers the UI is available as a JSON API for automation — CI gates, contract-lifecycle tooling, Slack bots, procurement pipelines:

```bash
# Health check
curl http://localhost:3000/api/health
# {"status":"ok"}

# Analyze a document
curl -X POST http://localhost:3000/api/comply \
  -H "Content-Type: application/json" \
  -d '{"document":"The supplier shall indemnify the buyer against any liability..."}'
```

Sample response:
```json
{
  "obligations": [
    {
      "category": "Indemnity",
      "risk": "high",
      "recommendation": "Ensure mutual indemnification",
      "snippet": "...The supplier shall indemnify the buyer against any liability..."
    },
    {
      "category": "Liability",
      "risk": "high",
      "recommendation": "Negotiate cap on liability",
      "snippet": "...against any liability..."
    }
  ],
  "summary": { "total": 2, "high": 2, "medium": 0, "low": 0 }
}
```

### Request lifecycle
1. Client submits a document via the web UI textarea or `POST /api/comply` with `{ "document": "..." }`.
2. `complianceAgent()` splits the text into clause-level segments.
3. Each segment is matched against the 15-term rules corpus.
4. Every match becomes an `Obligation` with a positioned ±40-char context snippet (not just a label).
5. A `summary` rollup counts total / high / medium / low risk hits.
6. The caller receives structured JSON.

---

## Tech Stack

- **Language:** TypeScript (typed, testable core — `complianceAgent(doc) → { obligations, summary }` is a pure function)
- **Runtime:** Node.js ≥ 18
- **Web framework:** Express (`express.json` 5 MB body limit, static file serving)
- **Analysis engine:** keyword-based NLP — a deterministic rules corpus mapping legal terms → category, risk tier, and recommendation. No external LLM calls, so results are reproducible and there is zero data egress.
- **UI:** static HTML/JS paste-and-analyze interface (no build step)
- **Container:** Docker + docker-compose (one-command deploy)

**Why keyword-based over an LLM?** Determinism, privacy, and zero marginal cost. Every run on the same contract returns the same obligations, sensitive documents never leave the operator's infrastructure, and there are no per-token fees or API keys to manage.

---

## What Judges Should Look At

1. **The agent in action** — paste any contract, NDA, or terms of service and watch it extract obligations across 15 legal categories with risk badges and recommendations. The sample Mutual NDA in the demo script (confidentiality, liability, indemnity, IP, Delaware governing law) lights up high-risk clauses immediately. Try the `curl` one-liner to see the identical engine over the JSON API.
2. **The UI** — a clean, zero-friction paste-and-analyze interface at `public/index.html`. Color-coded risk badges (red/amber/green), per-obligation recommendation tips, and an at-a-glance summary bar. No accounts, no setup, paste and go.
3. **Docker one-command deploy** — `docker compose up --build` brings up the agent, risk scorer, REST API, and web UI in a single container. No external services, no API keys, no database. It's live at `localhost:3000` in seconds.
4. **The compliance engine** (`src/agent.ts`) — a clean, typed, testable pure function: 15-term rules corpus → clause segmentation → risk + recommendation → summary rollup. Read it; it's short and self-documenting.

> A full **DEMO_VIDEO_SCRIPT.md** (≈3:00 runtime, voiceover + screen capture, sample NDA included) ships in the repo for recording.

---

## How to Run

**One-command Docker deploy (recommended for judges):**
```bash
docker compose up --build
```

**Or local Node:**
```bash
npm install && npm start      # or: npm run dev for live reload
```

**Then:**
1. Open **http://localhost:3000** in your browser.
2. **Paste a contract** into the textarea — any contract, NDA, or terms of service. (The demo script ships a realistic Mutual NDA covering confidentiality, liability, indemnity, IP, and a Delaware governing-law clause.)
3. Click **Analyze Document**.
4. **See results** — color-coded risk badges, per-clause recommendations, and a summary bar showing the high/medium/low breakdown.

That's the whole loop: `docker compose up` → `localhost:3000` → paste → analyze → risk report.

---

## Compliance Note

- **No live data, no real contracts, no third-party PII.** Demos run entirely on the sample Mutual NDA bundled in the repo or on synthetic text. No external data sources are queried and no documents are stored.
- **No data egress.** The analysis engine is deterministic and runs fully on the operator's own infrastructure — there are no external LLM API calls, so pasted document text never leaves the machine.
- **Testnet / no production chain activity.** The project is entirely off-chain; no mainnet or production transactions of any kind are performed.
- **Open source from day one — MIT licensed.** See `LICENSE`. No proprietary dependencies, no secrets, no credentials required to run.

---

## Repository

- **GitHub:** https://github.com/aggreyeric/bli-compliance-agent
- **License:** MIT
- **Entry points:** `src/index.ts` (app) · `src/agent.ts` (compliance engine) · `src/routes.ts` (API) · `public/index.html` (UI)

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

## Status

- ✅ Compliance engine — 15 categories, risk tiers, recommendations
- ✅ Risk scoring + summary rollup
- ✅ REST API (`POST /api/comply`, `GET /api/health`)
- ✅ Web UI (paste-and-analyze)
- ✅ Docker one-command deploy
- ✅ Demo video script + sample NDA
- 🔜 Automated test suite (unit precision targets + integration pipeline) — on the roadmap per `BUILD_BRIEF.md`
