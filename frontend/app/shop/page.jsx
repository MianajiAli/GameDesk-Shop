import ProductCard from "@/components/ProductCard";

export default async function Page() {
    try {
        const response = await fetch('http://localhost:8000/api/products');

        // Check if response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const products = await response.json();

        return (
            <div className="mx-auto py-10 w-11/12 flex items-center justify-center flex-wrap gap-5">
                {products.map(product => (
                    <ProductCard
                        key={product._id} // or another unique identifier
                        title={product.name} // use 'name' from your API response
                        description={product.description}
                        originalPrice={product.price}
                        discountedPrice={product.price} // Adjust if there's a discount
                        discount={0} // Assuming no discount in the provided data
                        imageSrc={product.imageUrl} // use 'imageUrl' from your API response
                        imageAlt={product.imageAlt} // use 'imageAlt' from your API response
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error fetching products:', error);
        return <div>Error loading products</div>;
    }
}
