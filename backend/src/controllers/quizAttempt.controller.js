import { Quiz } from "../models/quiz.model.js";
import { QuizAttempt } from "../models/quizAttempt.model.js";

export const submitQuiz = async (req, res) => {
    try {

        const { quizId, answers } = req.body;
        const { userId } = req.user;


        if (!userId || !quizId || !answers) {
            return res.status(400).json({
                error: "userId, quizId and answers are required",
            });
        }

        // FETCH QUIZ
        const quiz =
            await Quiz.findById(
                quizId
            );

        if (!quiz) {
            return res.status(404).json({
                error: "Quiz not found",
            });
        }

        // CALCULATE SCORE
        let score = 0;

        quiz.questions.forEach(
            (q, index) => {
                if (answers[index]?.trim() === q.correctAnswer?.trim()) {
                    score++;
                }
            }
        );

        // PERCENTAGE
        const percentage = Math.round((score / quiz.questions.length) * 100);

        // SAVE ATTEMPT
        const attempt = await QuizAttempt.create({ userId, quizId, score, totalQuestions: quiz.questions.length, percentage });

        return res.status(201).json({
            message: "Quiz submitted successfully",
            score,
            percentage,
            totalQuestions: quiz.questions.length,
            attempt,
        });

    } catch (error) {
        console.error("Submit Quiz Error:", error);

        return res.status(500).json({
            error: "Failed to submit quiz",
        });
    }
};

export const getQuizHistory =
    async (req, res) => {
        try {

            const { userId } = req.user;

            const history = await QuizAttempt.find({ userId, })
                .populate("quizId", "title topic")
                .sort({ createdAt: -1 });

            return res.status(200).json({ history });

        } catch (error) {

            console.error("Quiz History Error:", error);

            return res.status(500).json({ error: "Failed to fetch history", });
        }
    };