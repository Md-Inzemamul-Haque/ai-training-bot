import { Quiz } from "../models/quiz.model.js";
import { QuizAttempt } from "../models/quizAttempt.model.js";
import { retrieveQuizContext, retrieveRelevantContext } from "../services/rag.service.js";
import { generateResponse } from "../services/ollama.service.js";

export const generateQuiz = async (req, res) => {
    try {
        const { topic, language = "en" } = req.body;

        if (!topic) {
            return res.status(400).json({
                error: "Topic is required",
            });
        }

        // GET CONTEXT FROM RAG
        const context = await retrieveQuizContext(topic);

        if (!context) {
            return res.status(404).json({
                error: "No relevant knowledge found",
            });
        }

        // PROMPT
        const languageMap = {
            en: "English",
            hi: "Hindi",
            es: "Spanish",
        };

        const selectedLanguage = languageMap[language] || "English";

        const prompt = `
            Generate 5 multiple choice questions from the context below.

            Generate ALL questions, options, and answers in ${selectedLanguage}.

            Return ONLY a raw JSON array.

            Do NOT include:
            - explanations
            - markdown
            - \`\`\`json
            - intro text
            - notes

            Output must start with [
            and end with ]

           Format:
            [
                {
                    "question": "...",
                    "options": [
                        "...",
                        "...",
                        "...",
                        "..."
                    ],
                    "correctAnswer": "must exactly equal one option"
                }
            ]

            IMPORTANT:
            - correctAnswer MUST EXACTLY match one option from options
            - Do not use A/B/C/D
            - Do not generate answers outside options
            - Copy the exact option text into correctAnswer

            Context:
            ${context}
            `;


        // LLM RESPONSE
        const aiResponse = await generateResponse(prompt);

        // CLEAN RESPONSE
        const jsonMatch = aiResponse.match(
            /\[\s*{[\s\S]*}\s*\]/
        );

        if (!jsonMatch) {
            return res.status(500).json({
                error: "No valid JSON found in AI response",
                raw: aiResponse,
            });
        }

        const cleaned = jsonMatch[0];
        let questions;

        try {
            // PARSE AI RESPONSE
            questions = JSON.parse(cleaned);

            // VALIDATE QUESTIONS
            questions = questions.filter((q) => {

                return (
                    q.question &&
                    Array.isArray(q.options) &&
                    q.options.length === 4 &&
                    q.options.includes(
                        q.correctAnswer
                    )
                );
            });

        } catch (err) {
            return res.status(500).json({
                error: "Failed to parse AI quiz response",
                raw: aiResponse,
            });
        }

        // SAVE QUIZ
        if (questions.length < 5) {
            return res.status(500).json({
                error: "AI generated invalid quiz questions",
            });
        }
        const quiz = await Quiz.create({
            title: `${topic} Quiz`,
            topic,
            questions,
        });

        return res.status(201).json({
            message: "Quiz generated successfully",
            quiz,
        });
    } catch (error) {
        console.error("Generate Quiz Error:", error);

        return res.status(500).json({
            error: "Failed to generate quiz",
        });
    }
};
