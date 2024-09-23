"use client";
import React from "react";
import apiClient from "@/lib/apiClient";
import { toast } from 'react-toastify';

//TODO: Add attr from props and pass ti to api
const AddToCart = ({ productId, quantity, children }) => {
    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                window.location.href = '/auth/login';
                throw new Error("Authentication token not found");
            }

            const response = await apiClient("/api/cart", "POST",
                {
                    productId: productId,
                    quantity: quantity
                }
                , token);
            const { data, status } = response;

            if (status.code === 200) {

                toast.success(data.message || "ok");

            } else {
                toast.error(data.message || "An error occurred while fetching cart data.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message || "Failed to fetch cart data. Please try again.");
        }
    };

    return (
        <button onClick={handleAddToCart}>

            {children}
        </button>
    );
};

export default AddToCart;
