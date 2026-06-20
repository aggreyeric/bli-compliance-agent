# ⚖️ BLI Legal Compliance Agent

AI-powered legal document compliance scanner. Extracts obligations, identifies risk, and generates compliance reports.

## Quick Start
```bash
npm install && npm start
```
Open http://localhost:3000, paste a contract, click Analyze.

## Architecture
- **Agent** — keyword-based obligation extraction with 15 legal term categories
- **Risk Scoring** — high/medium/low classification with recommendations
- **REST API** — POST /api/comply for programmatic access
- **Web UI** — paste-and-analyze interface

## Demo
1. Start: `docker compose up`
2. Open http://localhost:3000
3. Paste any legal document (contract, terms of service, NDA)
4. Click "Analyze Document" — see obligations with risk scores

Built for the BLI Legal Tech 2 Hackathon ($50K). MIT License.
