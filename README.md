# ⚖️ BLI Legal Compliance Agent

> AI-powered legal document compliance scanner. Extracts obligations, identifies risk, and generates compliance reports.

Built for the **BLI Legal Tech 2 Hackathon** ($50K). Open source under MIT.

## ✨ Features
- **Obligation extraction** — keyword-based scanning across 15 legal term categories (liability, indemnification, IP, jurisdiction, …)
- **Risk scoring** — high / medium / low classification with actionable recommendations
- **REST API** — `POST /api/comply` for programmatic access
- **Web UI** — paste-and-analyze interface

## 🚀 Quick Start
```bash
npm install
npm run build && npm start
```
Open http://localhost:3000, paste a contract, click **Analyze**.

Or run with Docker:
```bash
docker compose up
```

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
- **Agent** (`src/agent.ts`) — keyword-based obligation extraction with 15 legal term categories
- **Risk Scoring** — high/medium/low classification with recommendations
- **REST API** (`src/routes.ts`) — `POST /api/comply`, `GET /api/health`
- **Web UI** (`public/index.html`) — paste-and-analyze interface

## 📋 Demo
1. Start: `docker compose up`
2. Open http://localhost:3000
3. Paste any legal document (contract, terms of service, NDA)
4. Click **Analyze Document** — see obligations with risk scores

## 📄 License
MIT — see [LICENSE](./LICENSE).
