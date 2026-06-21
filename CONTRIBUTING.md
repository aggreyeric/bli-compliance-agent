# Contributing to BLI Legal Compliance Agent

Thanks for your interest in the BLI Legal Compliance Agent — the deterministic, privacy-first legal document scanner that extracts obligations across 15 legal term categories and scores each clause by risk. Contributions are welcome: new rule categories, better risk scoring, UI/UX improvements, tests, and docs all help.

> **Read this file first, then the [README](./README.md) for the full architecture and API overview.** This guide assumes you've already gone through the README.

## Prerequisites

Before you start, **read the [README](./README.md)** — it explains the agent's keyword-based design choice (determinism, privacy, zero per-token cost), the 15-term rules corpus, and the REST + web-UI surface.

You'll need:

- **Node.js ≥ 18** and **npm**
- **TypeScript 5.x**, **Express 4.x** — pulled in via `npm install`
- **Jest 29.x** (dev dependency) — for running tests
- **Docker + Docker Compose** (optional) — for the containerized setup

No external API keys or LLM provider credentials are required — the agent is fully local and deterministic.

## Setup

Clone and install dependencies:

```bash
git clone <repo-url> bli-legal-tech-2
cd bli-legal-tech-2
npm install
npm run build && npm start     # production build + run
```

For development with live reload:

```bash
npm run dev                   # ts-node src/index.ts
```

For the Dockerized full stack (recommended — one command, no local setup):

```bash
docker compose up --build
```

Then open **http://localhost:3000**, paste a contract/NDA/terms-of-service, and click **Analyze Document**.

## Running Tests

Tests run on Jest with coverage enabled:

```bash
npm test
```

The test command is `jest --coverage --colors`. New rules, scoring changes, or agent behavior must be accompanied by tests, and the full suite must pass before a PR is merged.

Useful related scripts:

```bash
npm run typecheck   # tsc --noEmit — catch type errors fast
npm run test:watch  # jest --watch while iterating
```

## Code Style

- **TypeScript, CommonJS** — keep types explicit on the agent's public surface (`complianceAgent(doc)` and the API response shape).
- **The agent (`src/agent.ts`) is a pure, deterministic, typed function.** Preserve that: no I/O, no randomness, no external calls. Same document in → identical result out.
- **Risk rules live in the corpus** — when adding a legal term category, add matching keywords, a risk level (high/medium/low), and a plain-English recommendation. Cover it with a Jest test.
- **REST routes (`src/routes.ts`)** expose `POST /api/comply` and `GET /api/health` — keep these shapes stable; external CI/CLM/Slack integrations depend on them.
- **Web UI (`public/index.html`)** is static HTML/JS — keep it dependency-free and self-contained.

## Pull Requests & Issues

1. **Open an issue first** for anything beyond a small fix — describe the problem and your proposed approach (especially for new legal categories or risk-scoring changes) so we can align before you write code.
2. **Fork and branch** off `main`. Use a descriptive branch name (e.g. `feat/force-majeure-rule`, `fix/ui-risk-badge`).
3. **Keep PRs focused** — one logical change per PR. Split unrelated changes into separate PRs.
4. **Tests and typecheck must be green:** `npm run typecheck && npm test`.
5. **Describe what changed and why** in the PR description, and link the related issue. For new rule categories, include a sample clause that triggers the rule.
6. Be respectful and constructive in review — privacy, determinism, and a clean public API are the project's core values, so changes that affect those deserve extra scrutiny.

## License

By contributing, you agree that your contributions will be licensed under the **MIT License** — see [LICENSE](./LICENSE).
