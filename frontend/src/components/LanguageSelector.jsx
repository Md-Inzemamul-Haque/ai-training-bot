export default function LanguageSelector({ language, setLanguage }) {
    return (
        <div style={{ marginBottom: 10 }}>
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
            </select>
        </div>
    );
}