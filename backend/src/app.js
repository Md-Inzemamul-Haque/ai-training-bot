import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import { chatRouter } from "./routes/chat.routes.js";
import { tipRouter } from "./routes/tip.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { quizRouter } from "./routes/quiz.routes.js";
import { quizAttemptRouter } from "./routes/quizAttempt.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});


dotenv.config();
const app = express();
app.use(limiter);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI training bot is running");
});

app.use("/user", userRouter);
app.use("/chat", authMiddleware, chatRouter);
app.use("/tip", authMiddleware, tipRouter);
app.use("/quiz", authMiddleware, quizRouter);
app.use("/quiz-attempt", authMiddleware, quizAttemptRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({ status, message });
});

export default app;