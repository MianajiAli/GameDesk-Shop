import ProductCard from "@/components/ProductCard";

export default function Page() {
    const products = [
        {
            id: 1,
            title: "کالا ۱",
            description: "توضیحات کالا ۱",
            originalPrice: "15000",
            discountedPrice: "12000",
            discount: "30%",
        },
        {
            id: 2,
            title: "کالا ۲",
            description: "توضیحات کالا ۲",
            originalPrice: "20000",
            discountedPrice: "17000",
            discount: "15%",
        },
        {
            id: 3,
            title: "کالا ۳",
            description: "توضیحات کالا ۳",
            originalPrice: "25000",
            // No discount
        },
        {
            id: 4,
            title: "کالا ۴",
            description: "توضیحات کالا ۴",
            originalPrice: "30000",
            discountedPrice: "27000",
            discount: "10%",
        },
        {
            id: 5,
            title: "کالا ۵",
            description: "توضیحات کالا ۵",
            originalPrice: "35000",
            // No discount
        },
        {
            id: 6,
            title: "کالا ۶",
            description: "توضیحات کالا ۶",
            originalPrice: "40000",
            discountedPrice: "37000",
            discount: "7%",
        },
        {
            id: 7,
            title: "کالا ۷",
            description: "توضیحات کالا ۷",
            originalPrice: "45000",
            // No discount
        },
        {
            id: 8,
            title: "کالا ۸",
            description: "توضیحات کالا ۸",
            originalPrice: "50000",
            discountedPrice: "45000",
            discount: "10%",
        },
        {
            id: 9,
            title: "کالا ۹",
            description: "توضیحات کالا ۹",
            originalPrice: "55000",
            // No discount
        },
        {
            id: 10,
            title: "کالا ۱۰",
            description: "توضیحات کالا ۱۰",
            originalPrice: "60000",
            discountedPrice: "54000",
            discount: "10%",
        }
    ];

    return (
        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-10">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    originalPrice={product.originalPrice}
                    discountedPrice={product.discountedPrice}
                    discount={product.discount}
                />
            ))}
        </div>

    );
}
