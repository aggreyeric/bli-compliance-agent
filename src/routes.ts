import { Router } from "express";
import { complianceAgent } from "./agent";

const router = Router();

router.post("/api/comply", (req, res) => {
  try {
    const { document } = req.body;
    if (!document || typeof document !== "string") {
      res.status(400).json({ error: "Missing 'document' field (string)" });
      return;
    }
    const result = complianceAgent(document);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/api/health", (_req, res) => res.json({ status: "ok" }));

export default router;
