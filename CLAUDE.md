# CLAUDE.md

## Overview
BLI Legal Compliance Agent — AI-powered legal document scanner. Analyzes contracts, NDAs, and TOS to extract obligations across 15 legal term categories and score each clause by risk (high/medium/low) with plain-English recommendations. **Deterministic, keyword-based** (no LLM, no per-token cost, no data egress). Built for the BLI Legal Tech 2 Hackathon.

## Tech Stack
- **Runtime:** Node.js ≥ 18, TypeScript (CommonJS)
- **Server:** Express 4, served via `node dist/index.js`
- **UI:** static HTML/JS paste interface (`public/index.html`)
- **Container:** Docker / docker-compose (Node 20 Alpine)
- **Testing:** Jest + ts-jest

## Commands
```bash
npm install            # install deps
npm run dev            # live reload via ts-node (http://localhost:3000)
npm run build          # tsc -> dist/
npm start              # run compiled dist/index.js
npm test               # jest --coverage
npm run typecheck      # tsc --noEmit
docker compose up --build   # one-command full stack
```

## Architecture
- **`src/index.ts`** — Express bootstrap; mounts JSON body parser (5mb limit), static UI, and routes. Reads `PORT` (default 3000).
- **`src/routes.ts`** — REST routes: `POST /api/comply`, `GET /api/health`.
- **`src/agent.ts`** — core engine. `complianceAgent(docText)` is a **pure, deterministic, typed** function. Splits doc on `.`/newlines, matches the 15-term rules corpus, returns `{ obligations[], summary }`.
- **`public/index.html`** — paste-and-analyze UI with color-coded risk badges.

## API Endpoints
- `GET  /api/health` → `{"status":"ok"}`
- `POST /api/comply` → body `{"document": "<text>"}`; returns `{ obligations: [{category,risk,recommendation,snippet,position}], summary: {total,high,medium,low} }`. Missing/non-string `document` → `400`.

## Testing
```bash
npm test            # jest with coverage
npm run test:watch  # watch mode
```
Note: no `*.test.ts` files ship yet — `npm test` runs green but with no assertions. Add tests under `tests/` or `__tests__/` co-located with `src/`.

## Important Notes
- **No env file needed.** Only `PORT` is read (defaults to 3000). No API keys, no LLM calls, no external dependencies.
- **Determinism is a feature** — same input always yields identical output. Preserve this when modifying `agent.ts`; do not introduce randomness or network calls.
- The 15-term corpus lives as the `TERMS` array at the top of `src/agent.ts` — extend categories there.
- Body size cap is 5mb (`express.json({ limit: "5mb" })`) — raise in `index.ts` for very large contracts.
- Git remote: `https://github.com/aggreyeric/bli-compliance-agent` (branch `main`).
