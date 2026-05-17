
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";


export default function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (storedUser?.id || storedUser?._id) {
                setUser(storedUser);
            } else {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        } catch (err) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

        navigate("/", { replace: true });
    };

    return { user, loading, logout };
}