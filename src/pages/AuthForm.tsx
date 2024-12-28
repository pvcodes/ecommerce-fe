import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/store/authActions"; // Adjust the import as needed

const AuthForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            // Dispatch login action and wait for completion
            await dispatch(login({ email, password }) as any);
            // Redirect to the /products route
            navigate("/products");
        } catch (err: any) {
            // Handle any errors during login
            setError(err.message || "Failed to log in. Please try again.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Log In</button>
        </form>
    );
};

export default AuthForm;
