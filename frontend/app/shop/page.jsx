import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination"; // Import the Pagination component
import api from "@/lib/api";

export default async function Page({ searchParams }) {
    // Extract page from searchParams or default to 1
    const page = Number(searchParams.page) || 1;

    // Validate that page is a number between 1 and 10,000
    if (isNaN(page) || page < 1 || page > 10000) {
        return (
            <div className="mx-auto py-10 w-11/12 text-center">
                <p>Invalid page number. Please enter a number between 1 and 10,000.</p>
            </div>
        );
    }

    try {
        // Fetch products from the API
        const response = await api(`/api/products/?page=${page}`);
        const { products, error, totalPages } = await response;

        // Check if the returned data contains an error message
        if (error) {
            throw new Error(error);
        }

        // If the products list is empty, show a message
        if (!products || products.length === 0) {
            return (
                <div className="mx-auto py-10 w-11/12 text-center">
                    <p>No products found on this page.</p>
                </div>
            );
        }

        // Render the products list and pagination
        return (
            <div className="mx-auto py-10 w-11/12">
                {/* Products List */}
                <div className="flex items-center justify-center flex-wrap gap-5">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {/* Pagination Component */}


                <Pagination currentPage={page} totalPages={totalPages} basePath="/shop" />

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
