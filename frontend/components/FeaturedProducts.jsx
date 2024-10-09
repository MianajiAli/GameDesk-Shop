import ProductCard from "@/components/ProductCard";
import api from "@/lib/api";

export default async function FeaturedProducts({ discounted, newest }) {
    try {
        // Determine the correct API endpoint based on the 'discounted' and 'newest' parameters
        let endpoint = "/api/products/featured"; // Default to the featured products endpoint

        if (discounted) {
            endpoint = "/api/products/discounted";
        } else if (newest) {
            endpoint = "/api/products/newest"; // Use the newest products endpoint if 'newest' is true
        }

        // Fetch products from the API
        const response = await api(endpoint);
        const { data, error } = response; // Assuming your API returns an object with a "data" field

        // Check if the returned data contains an error message
        if (error) {
            throw new Error(error);
        }

        // Extract products from the response
        const products = data || []; // Default to an empty array if data is undefined

        // If the products list is empty, show a message
        if (!products.length) {
            return (
                <div className="mx-auto py-10 w-11/12 text-center">
                    <p>No products found on this page.</p>
                </div>
            );
        }

        // Render the products list
        return (
            <div className="w-full py-5">
                {/* Products List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 *:flex *:justify-center *:items-center">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error('Error fetching products:', error);

        // Return an error message to display on the page
        return (
            <div className="mx-auto py-10 w-11/12 text-center">
                <p>Error fetching products: {error.message}</p>
            </div>
        );
    }
}
