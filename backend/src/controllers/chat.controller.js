import { generateResponse } from "../services/ollama.service.js";
import { retrieveRelevantContext } from "../services/rag.service.js";
import { User } from "../models/user.model.js";
import { QuizAttempt } from "../models/quizAttempt.model.js";

export const chatController = async (req, res) => {
    try {
        const { message, language = "en" } = req.body;
        const { userId } = req.user;

        if (!message || !userId) {
            return res.status(400).json({
                error: "message and userId are required",
            });
        }

        // FETCH USER
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                response: "User not found",
            });
        }

        const lowerMsg = message.toLowerCase();

        // LAST QUIZ
        if (lowerMsg.includes("last quiz")) {
            const last = await QuizAttempt.findOne({ userId })
                .sort({ createdAt: -1 })
                .populate("quizId");

            if (!last) {
                return res.status(200).json({
                    response: "No quiz attempts found.",
                    source: ["quizAttempt.model"],
                });
            }

            return res.status(200).json({
                response: `Your last score was ${Math.round((last.score / last.totalQuestions) * 100)}% in ${last.quizId.title}`,
                source: ["quizAttempt.model"],
            });
        }

        // QUIZ HISTORY
        if (lowerMsg.includes("quiz") || lowerMsg.includes("history")) {
            const attempts = await QuizAttempt.find({ userId });

            return res.status(200).json({
                response: `You have attempted ${attempts.length} quizzes.`,
                data: attempts,
                source: ["quizAttempt.model"],
            });
        }

        // RAG RETRIEVAL
        const { context, source } = await retrieveRelevantContext(message);

        const languageMap = {
            en: "English",
            hi: "Hindi",
            es: "Spanish",
        };

        const prompt = `
            You are a helpful AI tutor.

            User: ${user.name}
            Respond ONLY in ${languageMap[language] || "English"}.
            Do NOT use any other language.
            All questions, explanations, and outputs must be in this language only.
            Use the context below if relevant:

            Context:
            ${context || "No relevant context found"}

            Question:
            ${message}

            Respond naturally and clearly.
            `;

        const aiResponse = await generateResponse(prompt);

        // FINAL RESPONSE
        return res.status(200).json({
            response: aiResponse,
            source: source || ["llm"],
        });
    } catch (error) {
        console.error("Chat Controller Error:", error);

        return res.status(500).json({
            error: "Failed to process chat request",
        });
    }
};