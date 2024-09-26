"use client";
import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';

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
                    return console.log("توکن احراز هویت یافت نشد");
                }

                const response = await apiClient("/api/cart", "GET", null, token);
                const { data, status } = response;

                if (status.code === 200) {
                    setCartData(data.items || []);
                    setTotalPrice(data.totalPrice);
                } else {
                    toast.error(data.message || "خطایی در بارگذاری اطلاعات سبد خرید به وجود آمد.");
                }
            } catch (error) {
                console.error("خطا:", error);
                toast.error(error.message || "بارگذاری اطلاعات سبد خرید با شکست مواجه شد. لطفاً دوباره تلاش کنید.");
            }
        };

        fetchData();
    }, []);

    const handleQuantityChange = (index, increment) => {
        const newCartData = [...cartData];
        const currentItem = newCartData[index];
        currentItem.quantity += increment;

        // Ensure quantity does not go below 1
        if (currentItem.quantity < 1) currentItem.quantity = 1;

        currentItem.itemTotal = currentItem.product.finalPrice * currentItem.quantity;

        setCartData(newCartData);

        // Optionally, you could update this quantity on the server
    };

    const handleVoucherChange = (e) => {
        setVoucher(e.target.value);
    };

    const applyVoucher = () => {
        // Call your API to apply voucher here
        console.log('کد تخفیف اعمال شد:', voucher);
    };

    return (
        <div>
            {cartData.length > 0 ?
                <section className="bg-white py-8 antialiased md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">سبد خرید</h2>

                        <div dir="rtl" className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    {cartData.map((item, index) => (
                                        <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <a href="#" className="shrink-0 md:order-1">
                                                    <div className="h-20 w-20 relative" >
                                                        <Image
                                                            src={`http://localhost:8000${item.product.images[0]}`} // Ensure the URL includes the protocol
                                                            alt={item.product.imageAlt}
                                                            fill
                                                            placeholder='empty' // Optional: change to 'blur' for a blurred placeholder
                                                            priority={true}
                                                            sizes="100%"
                                                            className="rounded-lg object-cover bg-black/5 text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
                                                        />
                                                    </div>
                                                </a>

                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="flex items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuantityChange(index, -1)}
                                                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                                                        >
                                                            <svg className="h-2.5 w-2.5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                        <input type="text" className="w-10 text-center text-sm font-medium text-gray-900" value={item.quantity} readOnly />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuantityChange(index, 1)}
                                                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                                                        >
                                                            <svg className="h-2.5 w-2.5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900">{item.itemTotal} تومان</p>
                                                    </div>
                                                </div>

                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <a href="#" className="text-base font-medium text-gray-900 hover:underline">{item.product.name}</a>
                                                    <div className="flex items-center gap-4">
                                                        <button className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline">
                                                            <svg className="me-1.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                            </svg>
                                                            اضافه به علاقه مندی ها
                                                        </button>

                                                        <button className="inline-flex items-center text-sm font-medium text-red-600 hover:underline">
                                                            <svg className="me-1.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
                                                            </svg>
                                                            حذف
                                                        </button>
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

                                        <a href="#" className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">ادامه به پرداخت</a>
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
                </section> : <div className="w-full h-[80vh] flex justify-center items-center flex-col gap-2">
                    <span className=" text-3xl font-semibold">سبد خرید خالی است</span>
                    <Link className="underline" href="/shop/1">بازگشت به فروشگاه</Link >
                </div>

            }

        </div>
    );
}
