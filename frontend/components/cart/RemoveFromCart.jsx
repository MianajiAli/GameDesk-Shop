"use client";
import React from "react";
import apiClient from "@/lib/apiClient";
import { toast } from 'react-toastify';

const RemoveFromCart = ({ productId, onRemove = () => { }, children }) => {
    const handleRemoveFromCart = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                window.location.href = '/auth/login';
                return console.log("Authentication not found");
            }

            const response = await apiClient(`/api/cart/item`, "DELETE", { productId }, token);

            const { data, status } = response;

            if (status.code === 200) {
                toast.success(data.message || "Product removed successfully");
                // Call the onRemove callback only on successful removal
                onRemove(productId);
            } else {
                toast.error(data.message || "An error occurred while removing the product.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message || "Failed to remove product. Please try again.");
            // Ensure onRemove is not called on error
        }
    };

    return (
        <button onClick={handleRemoveFromCart}>
            {children}
        </button>
    );
};

export default RemoveFromCart;
