"use client"
import Image from 'next/image';
import Link from 'next/link';
// pages/products/index.js
import { useEffect, useState } from 'react';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>All Products</h1>
            <div className="w-full flex flex-col gap-5 p-10">
                {products.map(product => (
                    <div dir="rtl" className="w-full rounded-xl bg-black/5  p-3 flex flex-row gap-5" key={product._id}>
                        <div className="relative w-32 sm:w-56 aspect-square  ">
                            <Image
                                src={`http://localhost:8000${product.images[0]}`}
                                alt={product.title}
                                fill
                                placeholder='empty'
                                priority={true}
                                sizes="100%"
                                className="rounded-lg object-contain bg-black/5 text-black/50 flex justify-center items-center text-right text-xs md:text-sm   "
                            />
                        </div>
                        <div className=" text-right " >

                            <h2>نام محصول: {product.name}</h2>
                            <p>توضیحات: {product.description}</p>
                            <p>قیمت: ${product.price}</p>
                            <p>موجودی: {product.stock}</p>
                            <p>دسته بندی: {product.category}</p>
                        </div>
                        <Link href={`/admin/products/${product._id}`}>edit</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
