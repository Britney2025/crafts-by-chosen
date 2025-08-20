import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router";


function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/"); // redirect to homepage after signup
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create an Account
                </h2>
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}
                <form onSubmit={handleSignUp} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-orange-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default SignUp;