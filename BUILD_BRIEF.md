# BUILD BRIEF — BLI Legal Tech 2

## Opportunity
- **Hackathon:** BLI Legal Tech 2 (DoraHacks)
- **URL:** https://dorahacks.io/hackathon/1904
- **Prize:** $50,000
- **Deadline:** 2026-11-01 (133 days runway)
- **Format:** Virtual / Online
- **Tags:** legaltech, compliance, regtech, RWA, AI

## Goal
Build an **AI-powered legal compliance agent** that automates regulatory document review, risk assessment, and compliance verification. The agent reads contracts/statutes, extracts obligations, cross-checks them against user documents, and produces a compliance report with citations.

## Stack
- **Language:** TypeScript / Node.js (agent runtime)
- **AI:** LLM-powered document analysis (via Higress AI Gateway consumer token)
- **Blockchain:** Optional RWA attestation layer for document integrity proofs
- **Storage:** MinIO shared FS for document uploads
- **Framework:** CoPaw agent runtime

## Deliverables
1. **Compliance Agent** — reads legal docs (PDF/text), extracts obligations, checks against rules corpus
2. **Risk Scorer** — flags high-risk clauses with severity + recommendation
3. **REST API** — submit document → get compliance report
4. **Demo UI** — minimal frontend: document upload + annotated report
5. **README** — setup, architecture, demo video script

## Test Plan
1. **Unit tests** — obligation extraction accuracy on sample contracts (target >80% precision)
2. **Integration test** — full pipeline: upload → extract → score → report
3. **Edge cases** — empty docs, non-legal text, multi-language

## Constraints
- **TESTNET ONLY** — no mainnet transactions
- **OPEN SOURCE from day 1** — public GitHub repo, MIT license
- **NO PORTAL SUBMISSION** — Eric approves all submissions
- **PIVOT if SDK fails** — if blockchain integration fails after 2 attempts, drop it and focus on pure AI compliance engine
- Use Higress AI Gateway for all LLM calls (consumer token only)
- Keep token usage efficient — batch document chunks, cache results

## Phased Build
- **Phase 1 (Days 1-2):** Spike — document parsing POC, LLM obligation extraction
- **Phase 2 (Days 3-7):** Core compliance engine + risk scorer
- **Phase 3 (Days 8-14):** REST API + demo UI + tests
- **Phase 4:** Polish, README, demo video script

## Report Back
After each phase, report progress. Flag blockers immediately.
