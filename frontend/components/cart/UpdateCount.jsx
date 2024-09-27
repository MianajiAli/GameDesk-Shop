"use client";
import React from "react";
import apiClient from "@/lib/apiClient";
import { toast } from 'react-toastify';

const UpdateCount = ({ productId, quantity, onUpdate = () => { }, children }) => {
    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                window.location.href = '/auth/login';
                return console.log("Authentication not found");
            }

            const response = await apiClient("/api/cart", "POST", {
                productId,
                quantity
            }, token);

            const { data, status } = response;

            if (status.code === 200) {
                toast.success(data.message || "Quantity updated successfully");
                // Call the onUpdate callback only on successful update
                onUpdate(quantity);
            } else {
                toast.error(data.message || "An error occurred while updating quantity.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message || "Failed to update quantity. Please try again.");
            // Ensure onUpdate is not called on error
        }
    };

    return (
        <button onClick={handleAddToCart}>
            {children}
        </button>
    );
};

export default UpdateCount;
