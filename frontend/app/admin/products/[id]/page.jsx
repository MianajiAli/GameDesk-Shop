"use client"
import { useState, useEffect } from 'react';
export default function Page({ params }) {
    const id = params.id; // Get product ID from the URL
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        images: '',
        imageAlt: '',
        discount: '',
        attributes: [{ title: '', values: [''] }]
    });
    const [loading, setLoading] = useState(true);

    // Fetch product data on component mount
    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        const token = "token";

        try {
            const response = await fetch(`http://localhost:8000/api/products/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Error fetching product data');
            const data = await response.json();

            setFormData({
                name: data.name,
                price: data.price,
                description: data.description,
                category: data.category,
                stock: data.stock,
                images: data.images.join(','),
                imageAlt: data.imageAlt,
                discount: data.discount,
                attributes: data.attributes || [{ title: '', values: [''] }]
            });
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch product:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = [...formData.attributes];
        if (field === 'title') {
            newAttributes[index].title = value;
        } else {
            newAttributes[index].values = value.split(',');
        }
        setFormData({
            ...formData,
            attributes: newAttributes,
        });
    };

    const addAttribute = () => {
        setFormData({
            ...formData,
            attributes: [...formData.attributes, { title: '', values: [''] }],
        });
    };

    const removeAttribute = (index) => {
        const newAttributes = formData.attributes.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            attributes: newAttributes,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = "token";
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            discount: parseFloat(formData.discount),
            images: formData.images.split(','), // Convert image URLs back to array
        };

        try {
            const response = await fetch(`http://localhost:8000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) throw new Error('Failed to update the product');
            const data = await response.json();
            console.log('Product updated successfully:', data);

            // Redirect to the product detail page or show a success message
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner or message
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>

            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium">Stock:</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Images (comma-separated URLs):</label>
                        <input
                            type="text"
                            name="images"
                            value={formData.images}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium">Image Alt Text:</label>
                        <input
                            type="text"
                            name="imageAlt"
                            value={formData.imageAlt}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium">Discount (%):</label>
                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Dynamic attributes section */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-semibold">Attributes</h4>
                    {formData.attributes.map((attribute, index) => (
                        <div key={index} className="flex flex-wrap gap-4 items-center">
                            <div className="flex-1">
                                <label className="block text-sm font-medium">Attribute Title:</label>
                                <input
                                    type="text"
                                    value={attribute.title}
                                    onChange={(e) => handleAttributeChange(index, 'title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium">Attribute Values (comma-separated):</label>
                                <input
                                    type="text"
                                    value={attribute.values.join(',')}
                                    onChange={(e) => handleAttributeChange(index, 'values', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                className="text-red-600 hover:text-red-800"
                                onClick={() => removeAttribute(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addAttribute}
                        className="self-start px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                    >
                        Add Attribute
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            >
                Update Product
            </button>
        </form>
    );
};

