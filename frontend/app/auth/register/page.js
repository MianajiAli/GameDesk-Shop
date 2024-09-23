"use client";
import { useState } from "react";
import apiClient from "@/lib/apiClient"; // Ensure the correct path to apiClient.js
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

export default function Register() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        apiClient("/api/auth/register", "POST", {
            name,
            phoneNumber: phone,
            email,
            password,
        })
            .then(({ data, error, status }) => {
                switch (status.code) {
                    case 400:
                        console.log(status, data)

                        toast.error(error[0]); // Display the error message from the response

                        break;

                    default:
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
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
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
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}
