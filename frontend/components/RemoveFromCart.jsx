"use client";
import React from "react";
import apiClient from "@/lib/apiClient";
const RemoveFromCart = ({ productId, count }) => {
    const handleRemoveFromCart = async () => {
        try {
            const response = await apiClient("/api/cart/item", "DELETE", {
                productId: productId,
                quantity: count,
            });
            if (!response.error) {
                // Optionally handle success, e.g., show a message or update state
                console.log("Product removed From cart successfully");
            } else {
                console.log(error)
            }
        } catch (error) {
            console.error("An error occurred while removing From cart ", error);
        }
    };

    return (
        <div>
            <button onClick={handleRemoveFromCart}>Removed From cart </button>
        </div>
    );
};

export default RemoveFromCart;
