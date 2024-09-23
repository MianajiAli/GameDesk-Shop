"use client";

import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import RemoveFromCart from '@/components/RemoveFromCart';

export default function CartComponent() {
    const [cartData, setCartData] = useState(null);

    useEffect(() => {
        // Make the API request within the useEffect, which runs only on the client side
        apiClient("/api/auth/register", "POST", {
            name,
            phoneNumber: phone,
            email,
            password,
        })
            .then(response => {
                if (response.ok) {
                    toast.success(response.message);
                }
                else {
                    toast.error(response.message);
                }
                // Optionally, you could redirect the user or clear the form here
            })
            .catch(error => {
                console.error("Error:", error); // Handle any errors
                toast.error("Registration failed. Please try again.");
            });
    }, []);


    return (
        <div>
            <h1>Cart Items</h1>
            {cartData && (
                <div>
                    <h2>Total Price: {cartData.totalPrice}</h2>
                    <ul className=" w-10/12 mx-auto flex flex-col gap-5  ">
                        {cartData.map((item) => (
                            <li key={item._id} dir="rtl" className="w-full flex justify-between bg-black/5 rounded-md text-right">
                                <h3>{item.product.name}</h3>
                                <h3>{item.product.price}</h3>
                                <h3>{item.product.discount}%</h3>
                                <h3>{item.product.finalPrice}</h3>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {item.product.finalPrice}</p>

                                <RemoveFromCart productId={item.product._id} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
