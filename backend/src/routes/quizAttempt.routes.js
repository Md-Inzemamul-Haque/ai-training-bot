import express from "express";

import { submitQuiz, getQuizHistory } from "../controllers/quizAttempt.controller.js";

export const quizAttemptRouter = express.Router();

quizAttemptRouter.post("/submit", submitQuiz);

quizAttemptRouter.get("/history/", getQuizHistory);