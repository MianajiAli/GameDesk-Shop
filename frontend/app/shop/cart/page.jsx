"use client";
import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import UpdateCount from '@/components/cart/UpdateCount';
import RemoveFromCart from '@/components/cart/RemoveFromCart';
import { NextSeo } from 'next-seo';

export default function Page() {
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [voucher, setVoucher] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');

                if (!token) {
                    window.location.href = '/auth/login';
                    return console.log("Authentication token not found");
                }

                const response = await apiClient("/api/cart", "GET", null, token);
                const { data, status } = response;

                if (status.code === 200) {
                    setCartData(data.items || []);
                    setTotalPrice(data.totalPrice);
                } else {
                    toast.error(data.message || "Error loading cart data.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error(error.message || "Failed to load cart data. Please try again.");
            }
        };

        fetchData();
    }, []);
    const handleRemoveFromCart = (productId) => {
        const updatedCartData = cartData.filter(item => item.product._id !== productId);
        setCartData(updatedCartData);
        setTotalPrice(updatedCartData.reduce((total, item) => total + item.itemTotal, 0));
    };

    const updateCartQuantity = (index, increment) => {
        const newCartData = [...cartData];
        const currentItem = newCartData[index];
        currentItem.quantity += increment;

        // Ensure quantity does not go below 1
        if (currentItem.quantity < 1) currentItem.quantity = 1;

        currentItem.itemTotal = currentItem.product.finalPrice * currentItem.quantity;

        // Update state to reflect new cart data
        setCartData(newCartData);
        // Update total price
        setTotalPrice(newCartData.reduce((total, item) => total + item.itemTotal, 0));
    };

    const handleVoucherChange = (e) => {
        setVoucher(e.target.value);
    };

    const applyVoucher = () => {
        console.log('Voucher code applied:', voucher);
    };

    return (
        <>
            <NextSeo noindex={true} nofollow={true} />
            <div>
                {cartData.length <= 0 ? (
                    <div className="w-full h-[80vh] flex justify-center items-center flex-col gap-2">
                        <h2 className="text-3xl font-semibold">سبد خرید خالی است</h2>
                        <Link className="hover:underline opacity-80" href="/shop">بازگشت به فروشگاه</Link>
                    </div>
                ) : (
                    <section dir="rtl" className="bg-white py-8 antialiased md:py-16">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">سبد خرید</h2>
                            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                    <div className="space-y-6">
                                        {cartData.map((item, index) => (
                                            <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                    <Link href={`${item.product.productUrl}`} className="shrink-0 md:order-1">
                                                        <div className="h-20 w-20 relative">
                                                            <Image
                                                                src={`http://localhost:8000${item.product.images[0]}`} // Ensure the URL includes the protocol
                                                                alt={item.product.imageAlt}
                                                                fill
                                                                placeholder='empty'
                                                                priority={true}
                                                                sizes="100%"
                                                                className="rounded-lg object-cover bg-black/5 text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
                                                            />
                                                        </div>
                                                    </Link>

                                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                        <div className="flex items-center">
                                                            <UpdateCount productId={item.product._id} quantity={-1} onUpdate={() => updateCartQuantity(index, -1)}>
                                                                <button type="button" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">
                                                                    <svg className="h-2.5 w-2.5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                                    </svg>
                                                                </button>
                                                            </UpdateCount>
                                                            <input type="text" className="w-10 text-center text-sm font-medium text-gray-900" value={item.quantity} readOnly />
                                                            <UpdateCount productId={item.product._id} quantity={1} onUpdate={() => updateCartQuantity(index, 1)}>
                                                                <button type="button" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">
                                                                    <svg className="h-2.5 w-2.5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                                    </svg>
                                                                </button>
                                                            </UpdateCount>
                                                        </div>
                                                        <div className="text-end md:order-4 md:w-32">
                                                            <p className="text-base font-bold text-gray-900">{item.itemTotal} تومان</p>
                                                        </div>
                                                    </div>

                                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                        <Link href={`${item.product.productUrl}`} className="text-base font-medium text-gray-900 hover:underline">{item.product.name}</Link>
                                                        <div className="flex items-center gap-4">
                                                            <button className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline">
                                                                مشاهده محصول
                                                            </button>
                                                            {/* Add the RemoveFromCart button here */}
                                                            <RemoveFromCart productId={item.product._id} onRemove={handleRemoveFromCart}>
                                                                <button className="inline-flex items-center text-sm font-medium text-red-600 opacity-80 hover:opacity-100 hover:underline">
                                                                    حذف
                                                                </button>
                                                            </RemoveFromCart>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                        <p className="text-xl font-semibold text-gray-900">خلاصه سفارش</p>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500">جمع کل</dt>
                                                    <dd className="text-base font-bold text-gray-900">{totalPrice} تومان</dd>
                                                </dl>
                                            </div>

                                            <a href="#" className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">بروزرسانی سبد خرید</a>
                                            <a href="#" className="flex w-full items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300">تکمیل سفارش</a>
                                        </div>

                                        <div className="space-y-4">
                                            <form className="space-y-4">
                                                <div>
                                                    <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900">کد تخفیف</label>
                                                    <div className="flex">
                                                        <input
                                                            type="text"
                                                            id="voucher"
                                                            className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                            placeholder="کد تخفیف را وارد کنید"
                                                            value={voucher}
                                                            onChange={handleVoucherChange}
                                                        />
                                                        <button type="button" onClick={applyVoucher} className="inline-flex items-center whitespace-nowrap rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-900 hover:bg-gray-200">اعمال</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                        <p className="text-sm font-medium text-gray-900">ارسال رایگان</p>
                                        <p className="mt-1 text-sm font-normal text-gray-500">سفارش شما مشمول ارسال رایگان است و زمان تخمینی تحویل ۳-۵ روز کاری می‌باشد.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
