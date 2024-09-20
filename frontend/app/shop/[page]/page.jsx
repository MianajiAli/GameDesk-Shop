import ProductCard from "@/components/ProductCard";
import api from "@/lib/api";

export default async function Page({ params }) {
    if (params) {
        const page = Number(params.page);

        // Validate that page is a number between 1 and 10000
        if (isNaN(page) || page < 1 || page > 10000) {
            return (
                <div className="mx-auto py-10 w-11/12 text-center">
                    <p>Invalid page number. Please enter a number between 1 and 10,000.</p>
                </div>
            );
        }
    }

    try {
        // Fetch products from the API
        const data = await api(`/api/products/?page=${params.page}`);
        const products = await data.products;

        // Check if the returned data contains an error message
        if (products.error) {
            throw new Error(products.error);
        }

        // If the products list is empty, show a message
        if (!products.length) {
            return (
                <div className="mx-auto py-10 w-11/12 text-center">
                    <p>Page Not Found</p>
                </div>
            );
        }

        // Render the products list
        return (
            <div className="mx-auto py-10 w-11/12 flex items-center justify-center flex-wrap gap-5">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
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
