"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient"; // Ensure the correct path to apiClient.js
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        apiClient("/api/auth/login", "POST", {
            email,
            password,
        })
            .then(response => {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('name', response.user.name);
                localStorage.setItem('email', response.user.email);
                localStorage.setItem('role', response.user.role);
                toast.success("خوش آمدید");
            })
            .catch(error => {
                console.error("Error:", error); // Handle any errors
                toast.error("Login failed. Please try again.");
            });
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
