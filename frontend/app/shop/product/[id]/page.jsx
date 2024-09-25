import AddToCart from "@/components/cart/AddToCart";
import api from "@/lib/api";
import Image from "next/image";

export default async function Page({ params }) {
    try {
        // Fetch the product data
        const product = await api(`/api/products/${params.id}`);

        // Check for errors in the response
        if (product.error) {
            throw new Error(product.error);
        }

        // Destructure product details, including the product URL

        return (
            <>
                <div className="w-full py-5">
                    <div dir="rtl" className="w-10/12 mx-auto flex flex-col lg:flex-row ">
                        <div className="w-full md:w-auto flex flex-col justify-center items-center  md:flex-row-reverse  gap-3 ">
                            <div className="relative bg-black/5 w-[24rem] xl:w-[36rem]  aspect-square">
                                <Image
                                    src={process.env.BACKEND_API_URL + product.images[0]}
                                    alt={product.imageAlt}
                                    fill
                                    placeholder='empty'
                                    priority={true}
                                    sizes="100%"
                                    className=" object-cover bg-black/5 text-black/50 flex justify-center items-center text-right text-xs md:text-sm   "
                                />
                            </div>
                            <div className="flex md:flex-col justify-center md:justify-start items-center gap-3">
                                <div className="relative bg-black/5 w-20 aspect-square">
                                    <Image
                                        src={process.env.BACKEND_API_URL + product.images[0]}
                                        alt={product.imageAlt}
                                        fill
                                        placeholder='empty'
                                        priority={true}
                                        sizes="100%"
                                        className=" object-cover bg-black/5 text-black/50 flex justify-center items-center text-right text-xs md:text-sm  opacity-50 "
                                    />
                                </div>
                                <div className=" bg-black/5 w-20 aspect-square">img</div>
                                <div className=" bg-black/5 w-20 aspect-square">img</div>
                                <div className=" bg-black/5 w-20 aspect-square">img</div>
                            </div>
                        </div>
                        <div className="w-full min-h-96 flex-1 flex flex-col justify-between py-5 md:py-0 px-0 md:px-10 ">

                            <div className='flex flex-col'>
                                <label className="text-xs text-black/50">{product.category}</label>
                                <h1 className="text-2xl text-black font-semibold">{product.name}</h1>
                                <div className="mt-3 flex items-center  gap-1 *:h-min">
                                    <p className="text-xs line-through opacity-50 font-semibold ">{product.price.toLocaleString()} </p>
                                    <p className="text-lg font-semibold">{product.finalPrice.toLocaleString()} تومان</p>
                                    <span className="bg-red-500 text-white px-2  text-xs">{product.discount}%</span>
                                </div>
                                <p className="mt-1 text-black/80">{product.description}</p>
                                <div>
                                    {product.attributes && product.attributes.length > 0 && (
                                        <ul className="my-5 flex flex-col gap-1">
                                            {product.attributes.map((attribute, index) => (
                                                <li key={index}>
                                                    <label>{attribute.title}:</label>
                                                    <ul className="flex">
                                                        {attribute.values.map((attr, i) => <li key={i} className="py-1 px-5 bg-black/5">{attr}</li>)}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>)}
                                </div>

                            </div>
                            <button className=" w-full my-7 py-2 bg-black/80 text-white">افزودن به سبد خرید</button>
                        </div>
                    </div>
                </div >
                <div className="w-full p-10 flex flex-col md:flex-row gap-5 justify-center">
                    <div className="w-full h-80 rounded-md bg-black/10"></div>
                    <div className="w-full h-80 rounded-md bg-black/10"></div>
                    <div className="w-full h-80 rounded-md bg-black/10"></div>
                </div>
                <div className="w-full p-10">
                    <div className="w-full h-[20vw] rounded-md bg-black/10"></div>
                </div>
            </>

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
