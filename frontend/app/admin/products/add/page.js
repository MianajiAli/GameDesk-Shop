"use client"
// pages/products/create.js
import { useState } from 'react';

const CreateProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        attributes: '',
        imageUrl: '',
        imageAlt: '',
        discount: ''
    });
    const [errors, setErrors] = useState({}); // For storing validation errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.price || formData.price <= 0) {
            newErrors.price = 'Price must be a positive number';
        }
        // Add other validations if needed

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Product created successfully!');
                setFormData({
                    name: '',
                    price: '',
                    description: '',
                    category: '',
                    stock: '',
                    attributes: '',
                    imageUrl: '',
                    imageAlt: '',
                    discount: ''
                });
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Create Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        id="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        id="price"
                        className={`mt-1 block w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Price"
                        required
                    />
                    {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        id="description"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Description"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        id="category"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Category"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        id="stock"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Stock"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="attributes" className="block text-sm font-medium text-gray-700">Attributes</label>
                    <input
                        type="text"
                        name="attributes"
                        value={formData.attributes}
                        onChange={handleChange}
                        id="attributes"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Attributes"
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        id="imageUrl"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Image URL"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700">Image Alt</label>
                    <input
                        type="text"
                        name="imageAlt"
                        value={formData.imageAlt}
                        onChange={handleChange}
                        id="imageAlt"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Image Alt"
                    />
                </div>
                <div>
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        id="discount"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Discount"
                        min="0"
                        max="100"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProductPage;
