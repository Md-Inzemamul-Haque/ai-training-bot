import { useState } from "react";
import { generateQuiz, submitQuiz } from "../services/api";

export default function QuizModal({ onClose }) {

    const [topic, setTopic] = useState("");
    const [language, setLanguage] = useState("en");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [quizData, setQuizData] = useState(null);

    // fetch quiz from backend (later DB + RAG)
    const startQuiz = async () => {
        try {
            const data = await generateQuiz({ topic, language, });

            if (!data?.quiz) {
                alert(data.error || "Failed to generate quiz");
                return;
            }

            setQuizData(data.quiz);
            setQuestions(data.quiz.questions || []);

        } catch (error) {
            console.error(error);
            alert("Failed to start quiz");
        }
    };

    const handleAnswer = async (option) => {

        const updatedAnswers = [
            ...answers,
            option,
        ];

        setAnswers(updatedAnswers);

        const current = questions[currentIndex];

        if (option.trim() === current.correctAnswer.trim()) {
            setScore((s) => s + 1);
        }

        const nextIndex =
            currentIndex + 1;

        // LAST QUESTION
        if (nextIndex >= questions.length) {
            try {

                await submitQuiz({ quizId: quizData?._id, answers: updatedAnswers, });

            } catch (error) {
                console.error(
                    "Quiz submit failed",
                    error
                );
            }
        }

        setCurrentIndex(nextIndex);
    };

    return (
        <div style={styles.overlay}>

            <div style={styles.modal}>

                <h3>Take Quiz</h3>

                {/* TOPIC INPUT */}
                {questions.length === 0 && (
                    <>
                        {/* TOPIC SELECT */}
                        <select
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            style={{
                                width: "100%",
                                padding: 10,
                                marginBottom: 10,
                                borderRadius: 6,
                            }}
                        >
                            <option value="">
                                Select Quiz Topic
                            </option>

                            <option value="Java">
                                Java
                            </option>

                            <option value="JavaScript">
                                JavaScript
                            </option>

                            <option value="Python">
                                Python
                            </option>

                            <option value="Nodejs">
                                NodeJs
                            </option>
                        </select>

                        {/* LANGUAGE SELECT */}
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{
                                width: "100%",
                                padding: 10,
                                marginBottom: 15,
                                borderRadius: 6,
                            }}
                        >
                            <option value="en">
                                English
                            </option>

                            <option value="hi">
                                Hindi
                            </option>

                            <option value="es">
                                Spanish
                            </option>
                        </select>

                        {/* BUTTONS */}
                        <button
                            onClick={startQuiz}
                            disabled={!topic}
                        >
                            Start Quiz
                        </button>

                        <button onClick={onClose}>
                            Close
                        </button>
                    </>
                )}

                {/* QUESTIONS */}
                {questions.length > 0 && currentIndex < questions.length && (
                    <div>
                        <h4>{questions[currentIndex].question}</h4>

                        {questions[currentIndex].options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(opt)}
                                style={{ display: "block", margin: 5 }}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}

                {/* RESULT */}
                {currentIndex >= questions.length && questions.length > 0 && (
                    <div>
                        <h3>Score: {score} / {questions.length}</h3>
                        <button onClick={onClose}>Close</button>
                    </div>
                )}

            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        background: "white",
        padding: 20,
        width: 400,
        borderRadius: 10,
    },
};