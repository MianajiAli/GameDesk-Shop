import Link from "next/link"; // Import Link for navigation
import AddToCart from "@/components/AddToCart";
import api from "@/lib/api";

export default async function Page({ params }) {
    try {
        // Fetch the product data
        const product = await api(`/api/products/${params.id}`);

        // Check for errors in the response
        if (product.error) {
            throw new Error(product.error);
        }

        // Destructure product details, including the product URL
        const { _id, name, price, description, category, stock, attributes, productUrl } = product;

        return (

            <div className="mx-auto py-10 w-11/12">
                <h1 className="text-2xl font-bold mb-4">{name}</h1>
                <p><strong>Price:</strong> {price.toLocaleString()} IRR</p>
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Stock:</strong> {stock}</p>

                {/* Render the product URL if available */}
                {productUrl && (
                    <p>
                        <strong>Product URL:</strong>{" "}
                        <a href={productUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            {productUrl}
                        </a>
                    </p>
                )}

                <AddToCart productId={_id} count={1} />

                {/* Map additional attributes if available */}
                {attributes && attributes.length > 0 && (
                    <div className="mt-4">

                        <h2 className="text-xl font-semibold">Attributes:</h2>
                        <ul className="list-disc list-inside">
                            {attributes.map((attribute, index) => (
                                <li key={index}>
                                    <strong>{attribute.title}:</strong>
                                    <ul>
                                        {attribute.values.map((attr, index) => <li key={index}>{attr}</li>)}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        // Handle and display any errors
        console.error('Error fetching product:', error);

        return (
            <div className="mx-auto py-10 w-11/12 text-center">
                <p>Error fetching product: {error.message}</p>
            </div>
        );
    }
}
