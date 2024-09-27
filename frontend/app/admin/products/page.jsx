"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination'; // Import the Pagination component

const ProductsPage = ({ searchParams }) => {
    const page = Number(searchParams.page) || 1; // Get the current page from searchParams, default to 1
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0); // State for total number of pages

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products?page=${page}&limit=8`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.products);
                setTotalPages(data.totalPages); // Assuming your API provides totalPages
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page]); // Fetch products when the page changes

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
                setError(error.message);
            }
        }
    };

    if (loading) {
        return <div className="text-center">Loading products...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{`Error: ${error}`}</div>;
    }

    return (
        <div dir="rtl" className="max-w-full mx-auto p-5 md:p-10">
            <h1 className="text-center text-xl font-bold mb-5">All Products</h1>
            <div className="overflow-x-auto rounded-md shadow">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-right">
                            <th className="py-3 px-4 border-b">تصویر</th>
                            <th className="py-3 px-4 border-b">نام محصول</th>
                            <th className="py-3 px-4 border-b">قیمت</th>
                            <th className="py-3 px-4 border-b">موجودی</th>
                            <th className="py-3 px-4 border-b">دسته بندی</th>
                            <th className="py-3 px-4 border-b">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b text-right">
                                    <div className="relative w-16 h-16">
                                        <Image
                                            src={`http://localhost:8000${product.images[0]}`}
                                            alt={product.imageAlt}
                                            fill
                                            placeholder="empty"
                                            priority={true}
                                            sizes="100%"
                                            className="rounded-md object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b text-right">{product.name}</td>
                                <td className="py-2 px-4 border-b text-right">{`$${product.price}`}</td>
                                <td className="py-2 px-4 border-b text-right">{product.stock}</td>
                                <td className="py-2 px-4 border-b text-right">{product.category}</td>
                                <td className="py-2 px-4 border-b text-right space-x-2">
                                    <Link href={`/shop/product/${product._id}`} className="text-blue-500 underline">
                                        Preview
                                    </Link>
                                    <Link href={`/admin/products/${product._id}`} className="text-blue-500 underline">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-500 underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component */}
            <Pagination
                currentPage={page} // Pass the current page
                totalPages={totalPages} // Pass total number of pages
                basePath="/admin/products" // Set the base path for pagination
            />
        </div>
    );
};

export default ProductsPage;
