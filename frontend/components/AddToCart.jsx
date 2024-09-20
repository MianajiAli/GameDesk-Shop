"use client";
import React from "react";
import apiClient from "@/lib/apiClient";
import { toast } from 'react-toastify';

//TODO: Add attr from props and pass ti to api
const AddToCart = ({ productId, count }) => {
    const handleAddToCart = async () => {
        try {
            const response = await apiClient("/api/cart", "POST", {
                productId: productId,
                quantity: count,
            });
            if (!response.error) {
                // Optionally handle success, e.g., show a message or update state
                toast.success("Product added to cart successfully")
            } else {
                console.log(error)
            }
        } catch (error) {
            console.error("An error occurred while adding to cart", error);
        }
    };

    return (
        <div>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default AddToCart;
