"use client";

import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import RemoveFromCart from '@/components/RemoveFromCart';

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
                    <ul className=" w-10/12 mx-auto flex flex-col gap-5  ">
                        {cartData.items.map((item) => (
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
