import express from "express";
import path from "path";
import routes from "./routes";

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BLI Compliance Agent running on port ${PORT}`));

export default app;
