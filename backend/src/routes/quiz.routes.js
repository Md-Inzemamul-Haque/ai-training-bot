import express from "express";

import { generateQuiz } from "../controllers/quiz.controller.js";

export const quizRouter = express.Router();

quizRouter.post("/generate", generateQuiz);