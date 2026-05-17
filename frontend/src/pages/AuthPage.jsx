import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/api";

export default function AuthPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    // login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // register
    const [name, setName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [preferredLanguage, setPreferredLanguage] = useState("en");

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = await login(
            email,
            password
        );

        if (data?.token) {
            const normalizedUser = {
                ...data.user,
                _id: data.user.id,
            };

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(normalizedUser));

            navigate("/dashboard");

        } else {
            alert(
                data.error ||
                "Login failed"
            );
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = await register({
            name,
            email: regEmail,
            password: regPassword,
            preferredLanguage,
        });

        if (data?.message || data?.success) {
            alert("Account created! Please login.");
            setIsLogin(true);
        } else {
            alert(data.error || "Registration failed");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                <h2>{isLogin ? "Login" : "Register"}</h2>

                {/* LOGIN */}
                {isLogin ? (
                    <form onSubmit={handleLogin} style={styles.form}>
                        <input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />

                        <button
                            type="submit"
                            style={styles.button}
                        >
                            Login
                        </button>

                        <p>
                            Don't have an account?
                            <button
                                type="button"
                                onClick={() => setIsLogin(false)}
                                style={styles.link}
                            >
                                Create account
                            </button>
                        </p>
                    </form>
                ) : (
                    /* REGISTER */
                    <form onSubmit={handleRegister} style={styles.form}>
                        <input
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                        />

                        <input
                            placeholder="Email"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            style={styles.input}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            style={styles.input}
                        />

                        <select
                            value={preferredLanguage}
                            onChange={(e) => setPreferredLanguage(e.target.value)}
                            style={styles.input}
                        >
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="es">Spanish</option>
                        </select>

                        <button
                            type="submit"
                            style={styles.button}
                        >
                            Create Account
                        </button>

                        <p>
                            Already have an account?
                            <button
                                type="button"
                                onClick={() => setIsLogin(true)}
                                style={styles.link}
                            >
                                Login
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
    },
    card: {
        width: 350,
        padding: 20,
        background: "#1e293b",
        borderRadius: 10,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    input: {
        padding: 10,
        borderRadius: 5,
        border: "none",
    },
    button: {
        padding: 10,
        background: "#2563eb",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
    link: {
        marginLeft: 5,
        background: "none",
        border: "none",
        color: "#38bdf8",
        cursor: "pointer",
    },
};