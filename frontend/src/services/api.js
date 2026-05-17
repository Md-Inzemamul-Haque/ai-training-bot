const API_BASE = "http://localhost:5000";

const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const login = async (email, password) => {
    const res = await fetch(
        `${API_BASE}/user/login`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );

    return res.json();
};

export const register = async (data) => {
    const res = await fetch(
        `${API_BASE}/user/register`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return res.json();
};

export const sendMessage = async (data) => {
    const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    return res.json();
};

export const getTip = async (language) => {
    const res = await fetch(
        `${API_BASE}/tip?language=${language}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return res.json();
};

export const getQuizHistory = async () => {
    const res = await fetch(
        `${API_BASE}/quiz-attempt/history/`,
        {
            headers: getAuthHeaders(),
        }
    );

    return res.json();
};

export const generateQuiz = async (data) => {
    const res = await fetch(
        `${API_BASE}/quiz/generate`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    );

    return res.json();
};

export const submitQuiz = async (data) => {
    const res = await fetch(
        `${API_BASE}/quiz-attempt/submit`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    );

    return res.json();
};