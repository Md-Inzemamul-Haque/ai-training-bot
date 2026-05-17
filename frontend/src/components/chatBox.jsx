import { useState } from "react";
import { sendMessage, getTip } from "../services/api";
import MessageBubble from "./MessageBubble";

export default function ChatBox({ language }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = {
            role: "user",
            text: input,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const payload = {
                message: input,
                language,
                sessionId: "demo-session",
            };


            const res = await sendMessage(payload);

            const botMsg = {
                role: "bot",
                text: res.response || "No response",
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "Server error" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleGetTip = async () => {
        setLoading(true);

        try {
            const res = await getTip(language);

            const tipMsg = {
                role: "bot",
                text: `Tip of the Day: ${res.tip || "No tip found"}`,
            };

            setMessages((prev) => [
                ...prev,
                tipMsg,
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: "Failed to fetch tip",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div
            style={{
                width: 600,
                margin: "0 auto",
                border: "1px solid #ccc",
                padding: 20,
                borderRadius: 10,
                background: "#fff",
            }}
        >
            {/* TIP BUTTON */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 15
            }}>
                <button
                    onClick={handleGetTip}
                    disabled={loading}
                    style={{
                        padding: "8px 14px",
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background: "#f8f9fa"
                    }}
                > Tip of the Day
                </button>
            </div>

            {/* CHAT MESSAGES */}
            <div style={{ height: 400, overflowY: "auto" }}>
                {messages.map((m, i) => (
                    <MessageBubble key={i} msg={m} />
                ))}

                {loading && (
                    <p style={{ fontStyle: "italic", color: "gray" }}>
                        Bot is thinking...
                    </p>
                )}
            </div>

            {/* INPUT BOX */}
            <div style={{ display: "flex", marginTop: 10 }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ flex: 1, padding: 10 }}
                    placeholder="Ask something..."
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}