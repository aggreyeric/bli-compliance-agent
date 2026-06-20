const TERMS = [
  { term: "liability", category: "Liability", risk: "high", rec: "Negotiate cap on liability" },
  { term: "indemnification", category: "Indemnity", risk: "high", rec: "Ensure mutual indemnification" },
  { term: "warranty", category: "Warranty", risk: "medium", rec: "Define warranty scope and duration" },
  { term: "termination", category: "Termination", risk: "medium", rec: "Add cure period before termination" },
  { term: "confidentiality", category: "Confidentiality", risk: "medium", rec: "Verify exceptions are reasonable" },
  { term: "jurisdiction", category: "Jurisdiction", risk: "high", rec: "Negotiate favorable jurisdiction" },
  { term: "force_majeure", category: "Force Majeure", risk: "low", rec: "Check covered events" },
  { term: "governing_law", category: "Governing Law", risk: "high", rec: "Verify applicable law" },
  { term: "arbitration", category: "Dispute Resolution", risk: "medium", rec: "Review arbitration rules" },
  { term: "penalty", category: "Penalty", risk: "high", rec: "Check penalty caps" },
  { term: "breach", category: "Breach", risk: "high", rec: "Define material breach clearly" },
  { term: "audit", category: "Compliance", risk: "low", rec: "Ensure audit right is reasonable" },
  { term: "regulatory", category: "Regulatory", risk: "medium", rec: "Identify applicable regulations" },
  { term: "intellectual_property", category: "IP", risk: "high", rec: "Clarify IP ownership" },
  { term: "non_compete", category: "Non-Compete", risk: "medium", rec: "Check duration and scope" },
];

export interface Obligation {
  snippet: string;
  category: string;
  risk: string;
  recommendation: string;
  position: number;
}

export function complianceAgent(docText: string): { obligations: Obligation[]; summary: { total: number; high: number; medium: number; low: number } } {
  const lines = docText.split(/[.\n]/);
  const obligations: Obligation[] = [];
  for (const term of TERMS) {
    for (let i = 0; i < lines.length; i++) {
      const lower = lines[i].toLowerCase();
      if (lower.includes(term.term)) {
        const start = Math.max(0, lines[i].trim().search(new RegExp(term.term, "i")) - 40);
        const snippet = (start > 0 ? "..." : "") + lines[i].trim().substring(start, start + 120) + (lines[i].trim().length > start + 120 ? "..." : "");
        obligations.push({ snippet, category: term.category, risk: term.risk, recommendation: term.rec, position: i });
      }
    }
  }
  const summary = { total: obligations.length, high: obligations.filter(o => o.risk === "high").length, medium: obligations.filter(o => o.risk === "medium").length, low: obligations.filter(o => o.risk === "low").length };
  return { obligations, summary };
}
