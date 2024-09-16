import ProductCard from "@/components/ProductCard";
const apiUrl = process.env.BACKEND_API_URL;

export default async function Page() {
    try {
        console.log(`${apiUrl}/api/products`)
        let data = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
        // let data = await fetch(`${apiUrl}/api/products`, { revalidate: 10 })
        let products = await data.json();

        return (
            <div className="mx-auto py-10 w-11/12 flex items-center justify-center flex-wrap gap-5">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        title={product.name}
                        originalPrice={product.price}
                        discountedPrice={product.finalPrice}
                        discount={0}
                        imageAlt={product.imageAlt}
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error fetching products:', error);
        return <div>Error loading products</div>;
    }
}
