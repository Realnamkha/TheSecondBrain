import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); // equivalent to { origin: "*", credentials: false }

// ✅ Body parser
app.use(express.json({ limit: "16kb" }));

// ✅ Routes
import healthcheckrouter from "./routes/healthcheck.routes";
import userRouter from "./routes/user.routes";
import contentRouter from "./routes/content.routes";

app.use("/api/v1/healthcheck", healthcheckrouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/content", contentRouter);

export { app };
