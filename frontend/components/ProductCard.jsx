import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
    const imageUrl = process.env.BACKEND_API_URL + product.images[0];

    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price);
    };

    return (
        <Link href={"/shop/product/" + product._id} className="flex flex-row-reverse sm:flex-col gap-1 ">
            <div className="relative w-32 sm:w-72 aspect-square">
                <Image
                    src={imageUrl}
                    alt={product.imageAlt}
                    fill
                    placeholder='empty'
                    priority={true}
                    sizes="100%"
                    className="object-cover shadow-md bg-black/5 text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
                />
            </div>
            <div className="w-72 flex flex-col justify-between p-2 ">
                <div>
                    <h3 dir="rtl" className="text-xl font-semibold pb-3 text-black/90">{product.name}</h3>
                </div>
                <div className="h-10 flex flex-col justify-center">
                    <div className="flex justify-end mr-2.5">
                        {product.discount > 0 && (
                            <div className="flex gap-1 items-center h-4">
                                <span className="text-lg font-medium opacity-60 text-black line-through">
                                    {formatPrice(product.price)}
                                </span>
                                <span className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-semibold px-1 py-0.5 rounded-md ring-1 ring-inset ring-blue-600/10">
                                    {product.discount} %
                                </span>
                            </div>
                        )}
                    </div>
                    <div dir="rtl" className="flex gap-1 justify-start items-center mr-1.5  text-black/80" >
                        <span className="text-xl font-semibold">{formatPrice(product.finalPrice)}</span>
                        <span className="text-sm">تومان</span>
                    </div>
                </div>
                <div dir="rtl" className="flex gap-1 justify-start items-center h-8">
                    {product.discount > 0 && (
                        <span className="inline-flex items-center bg-pink-50/50 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded-md ring-1 ring-inset ring-pink-600/10">
                            حراج
                        </span>
                    )}
                    {product.featured && (
                        <span className="inline-flex items-center bg-yellow-50/50 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-md ring-1 ring-inset ring-yellow-700/10">
                            ویژه
                        </span>
                    )}

                    {/* <span className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-md ring-1 ring-inset ring-blue-700/10">
                        خرید قسطی
                    </span>
                    <span className="inline-flex items-center bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-md ring-1 ring-inset ring-green-600/10">
                        ارسال رایگان
                    </span> */}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
