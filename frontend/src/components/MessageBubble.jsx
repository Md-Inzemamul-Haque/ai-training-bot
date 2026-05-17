export default function MessageBubble({ msg }) {
    const isUser = msg.role === "user";

    return (
        <div
            style={{
                textAlign: isUser ? "right" : "left",
                margin: "10px 0",
            }}
        >
            <span
                style={{
                    display: "inline-block",
                    padding: "10px",
                    borderRadius: "10px",
                    background: isUser ? "#d1e7ff" : "#eee",
                    maxWidth: "70%",
                }}
            >
                {msg.text}
            </span>
        </div>
    );
}