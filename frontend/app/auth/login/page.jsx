"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient"; // Ensure the correct path to apiClient.js
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

export default function Page() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        apiClient("/api/auth/login", "POST", {
            phone,
            password,
        })

            .then(({ data, status }) => {
                switch (status.code) {
                    case 200:
                        localStorage.setItem('authToken', data.token);
                        localStorage.setItem('name', data.user.name);
                        localStorage.setItem('phone', data.user.phone);
                        localStorage.setItem('role', data.user.role);
                        toast.success("خوش آمدید");
                        console.log(localStorage)
                    case 400:

                        toast.error(data.message); // Display the error message from the response

                        break;

                    default:
                        toast.error(data.message); // Display the error message from the respons
                        break;
                }


            })
            .catch(error => {
                console.error("Error:", error); // Handle any network errors
                toast.error("Registration failed. Please try again.");
            });
    };

    return (
        <div>
            <input
                type="phone"
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
