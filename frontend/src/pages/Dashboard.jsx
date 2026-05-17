import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import LanguageSelector from "../components/LanguageSelector";
import ChatBox from "../components/ChatBox";
import QuizModal from "../components/QuizModal";
import styles from "./Dashboard.styles";
import { getQuizHistory } from "../services/api.js";

export default function Dashboard() {
    const languageLabelMap = {
        en: "English",
        hi: "Hindi",
        es: "Spanish",
        English: "English",
        Hindi: "Hindi",
        Spanish: "Spanish",
    };

    const { user, loading, logout } = useAuth();

    // HOOKS MUST ALWAYS COME BEFORE RETURNS
    const [sessionLanguage, setSessionLanguage] = useState("en");
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizHistory, setQuizHistory] = useState([]);

    // update language after user loads
    useEffect(() => {
        if (user?.preferredLanguage) {
            setSessionLanguage(user.preferredLanguage);
        }
    }, [user]);

    useEffect(() => {

        const fetchQuizHistory =
            async () => {

                try {

                    const res = await getQuizHistory();

                    setQuizHistory(res.history || []);

                } catch (error) {
                    console.error(
                        "Failed to fetch history",
                        error
                    );
                }
            };

        if (user) {
            fetchQuizHistory();
        }

    }, [user]);

    // SAFE CONDITIONAL RETURNS
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!user) {
        return <div>Redirecting...</div>;
    }

    const effectiveLanguage = sessionLanguage || user?.preferredLanguage || "en";


    return (
        <div style={styles.container}>

            {/* LEFT PANEL */}
            <div style={styles.leftPanel}>

                <div style={{ marginBottom: 20 }}>

                    {/* NAME + LOGOUT */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <h3 style={{ margin: 0 }}>
                            👤 {user?.name || "Guest"}
                        </h3>

                        <button
                            onClick={logout}
                            style={{
                                padding: "6px 12px",
                                background: "#dc2626",
                                color: "white",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                                fontSize: 14,
                            }}
                        >
                            Logout
                        </button>
                    </div>

                    {/* PREFERRED LANGUAGE */}
                    <p style={{ margin: 0 }}>
                        Preferred Language:{" "}
                        <b>
                            {languageLabelMap[user?.preferredLanguage] ||
                                "English"}
                        </b>
                    </p>

                </div>

                <hr />

                <button
                    style={styles.quizButton}
                    onClick={() => setShowQuiz(true)}
                >
                    Take Quiz
                </button>


                <h4>Quiz History</h4>

                {quizHistory.length === 0 ? (

                    <p>No quiz attempts yet</p>

                ) : (

                    quizHistory.map((q, i) => (

                        <div
                            key={i}
                            style={styles.quizItem}
                        >

                            <strong>
                                {
                                    q.quizId?.title ||
                                    "Quiz"
                                }
                            </strong>

                            <p>
                                Score:
                                {" "}
                                {Math.round(
                                    (q.score /
                                        q.totalQuestions) *
                                    100
                                )}
                                %
                            </p>

                            <small>
                                {new Date(
                                    q.createdAt
                                ).toLocaleString()}
                            </small>

                        </div>
                    ))
                )}


            </div>

            {/* RIGHT PANEL */}
            <div style={styles.rightPanel}>

                <div
                    style={{
                        marginBottom: 10,
                        textAlign: "right",
                    }}
                >
                    <label style={{ marginRight: 8 }}>
                        Session Language:
                    </label>

                    <LanguageSelector
                        language={sessionLanguage}
                        setLanguage={setSessionLanguage}
                    />
                </div>

                <ChatBox language={effectiveLanguage} />
            </div>

            {showQuiz && (
                <QuizModal onClose={() => setShowQuiz(false)} />
            )}
        </div>
    );
}