"use client";

import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';

export default function CartComponent() {
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiClient('/api/cart');
                setCartData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error}</p>;

    return (
        <div>
            <h1>Cart Items</h1>
            {cartData && (
                <div>
                    <h2>Total Price: {cartData.totalPrice}</h2>
                    <ul>
                        {cartData.items.map((item) => (
                            <li key={item._id}>
                                <h3>{item.product.name}</h3>
                                <p>Price: {item.product.finalPrice}</p>


                                <p>Quantity: {item.quantity}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
