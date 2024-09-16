import ProductCard from "@/components/ProductCard";

export default async function Page() {
    let data = await fetch('https://fakestoreapi.com/products')
    let products = await data.json()

    return (
        <div className="mx-auto py-10 w-11/12 flex items-center justify-center flex-wrap gap-5 ">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    originalPrice={product.price}
                    discountedPrice={product.price}
                    discount={product.rate}
                    imageSrc={product.image}
                />
            ))}
        </div>
    );
}
