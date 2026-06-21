# ⚖️ BLI Legal Compliance Agent

![CI](https://img.shields.io/badge/CI-passing-brightgreen) ![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6) ![Node.js](https://img.shields.io/badge/runtime-Node.js-339933) ![Express](https://img.shields.io/badge/framework-Express-000000) ![Docker](https://img.shields.io/badge/Docker-ready-2496ED) ![License](https://img.shields.io/badge/license-MIT-green) ![BLI](https://img.shields.io/badge/hackathon-BLI%20Legal%20Tech-orange)

## 📸 Screenshot

![BLI Compliance Agent UI](docs/screenshot-ui.png)

**BLI Legal Compliance Agent** is an AI-powered legal document scanner that analyzes contracts, NDAs, and terms of service to extract obligations across 15 legal term categories and score each clause by risk (high / medium / low) with plain-English recommendations. It is fully deterministic, runs entirely on your own infrastructure with zero per-token cost, and exposes both a paste-and-analyze web UI and a REST API — so no document ever leaves your machine.

Built for the **BLI Legal Tech 2 Hackathon** ($50K · DoraHacks). Open source under MIT.

## ✨ Features
- **Obligation extraction** — keyword-based scanning across 15 legal term categories (liability, indemnification, IP, jurisdiction, …)
- **Risk scoring** — high / medium / low classification with actionable recommendations
- **REST API** — `POST /api/comply` for programmatic access
- **Web UI** — paste-and-analyze interface

## 🚀 Quick Start

**Docker (recommended — one command, no setup):**
```bash
docker compose up --build
```

**Or local Node.js:**
```bash
npm install
npm run build && npm start     # or: npm run dev for live reload
```

Then open **http://localhost:3000**, paste a contract, NDA, or terms of service into the box, and click **Analyze Document**. See risk-scored obligations in seconds.

> The repo ships a realistic **sample Mutual NDA** (see `DEMO_VIDEO_SCRIPT.md`) covering confidentiality, liability, indemnity, IP, and a Delaware governing-law clause — paste it to see the engine light up immediately.

## 🧱 Tech Stack
- **Runtime:** Node.js ≥ 18, TypeScript, Express
- **UI:** static HTML/JS paste interface
- **Container:** Docker / docker-compose

## 🔌 API
Health check:
```bash
curl http://localhost:3000/api/health
# {"status":"ok"}
```
Analyze a document:
```bash
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

## 🏗️ Architecture

```mermaid
flowchart TD
    DOC["📄 Contract / NDA / TOS"] -->|"paste (UI) or POST /api/comply"| API
    subgraph "Express Server (src/index.ts)"
        UI["Web UI<br/>public/index.html"]
        API["REST Routes<br/>src/routes.ts"]
    end
    API --> AGENT["Compliance Agent<br/>src/agent.ts"]
    AGENT --> SEG["Clause Segmentation<br/>split on . / newline"]
    SEG --> CORPUS["15-Term Rules Corpus<br/>liability · indemnity · IP · jurisdiction · ..."]
    CORPUS --> RISK["Risk Scoring<br/>🔴 high / 🟡 medium / 🟢 low<br/>+ plain-English recommendation"]
    RISK --> ROLL["Summary Rollup<br/>total / high / medium / low"]
    ROLL -->|"JSON"| UI
    ROLL -->|"JSON"| EXT["CI · CLM · Slack bots<br/>procurement pipelines"]
    style DOC fill:#dbeafe,stroke:#1a56db
    style AGENT fill:#fef3c7,stroke:#d97706
    style RISK fill:#fee2e2,stroke:#ef4444
```

**Component map:**
- **Agent** (`src/agent.ts`) — keyword-based obligation extraction with 15 legal term categories; `complianceAgent(doc)` is a **pure, deterministic, typed** function
- **Risk Scoring** — high / medium / low classification with category-specific recommendations
- **REST API** (`src/routes.ts`) — `POST /api/comply`, `GET /api/health`
- **Web UI** (`public/index.html`) — paste-and-analyze interface with color-coded risk badges

> **Why keyword-based over an LLM?** Determinism, privacy, and zero marginal cost. Every run on the same contract returns identical results, sensitive documents never leave your infrastructure, and there are no per-token fees or API keys to manage.

## 📋 Demo
1. Start: `docker compose up`
2. Open http://localhost:3000
3. Paste any legal document (contract, terms of service, NDA)
4. Click **Analyze Document** — see obligations with risk scores

## 📄 License
MIT — see [LICENSE](./LICENSE).

## 🤖 AI Assistants

→ See [CLAUDE.md](./CLAUDE.md) for AI coding assistant context.
