import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, signup } from "@/store/authActions"; // Import signup action
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AuthForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoginMode, setIsLoginMode] = useState(true); // State to toggle between login and signup
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            if (isLoginMode) {
                await dispatch(login({ email, password }) as any);
                navigate("/products");
            } else {
                await dispatch(signup({ email, password }) as any);
                navigate("/products");
            }
        } catch (err: any) {
            setError(err.message || "Failed to authenticate. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-center">
                        {isLoginMode ? "Login" : "Sign Up"}
                    </CardTitle>
                </CardHeader>
                <form onSubmit={handleAuth} className="space-y-4">
                    {error && toast(error)}
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full"
                        required
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full"
                        required
                    />
                    <CardFooter className="flex justify-between">
                        <Button type="submit" className="w-full">
                            {isLoginMode ? "Log In" : "Sign Up"}
                        </Button>
                    </CardFooter>
                </form>
                <div className="text-center mt-4">
                    <Button variant="link" onClick={() => setIsLoginMode(!isLoginMode)}>
                        {isLoginMode ? "Switch to Sign Up" : "Switch to Log In"}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default AuthForm;