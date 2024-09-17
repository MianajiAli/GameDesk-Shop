import Image from "next/image";
const ProductCard = ({ title, originalPrice, discountedPrice, discount, imageSrc }) => {
    const imageUrl = process.env.BACKEND_API_URL + imageSrc[0];
    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price);
    };

    return (

        <div className="flex flex-row-reverse sm:flex-col shadow-lg rounded-lg p-5 gap-3">
            <div className="relative w-32 sm:w-56 aspect-square  ">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    placeholder='empty'
                    priority={true}
                    sizes="100%"
                    className="rounded-lg object-contain bg-black/5 text-black/50 flex justify-center items-center text-right text-xs md:text-sm   "
                />
            </div>
            <div className="w-56 flex flex-col justify-between">
                <div>
                    <h3 dir="rtl" className="text-base">{title}</h3>
                    {/* <p dir="rtl" className="text-sm opacity-70">{description}</p> */}
                </div>
                <div className="flex justify-between mt-2">
                    <div className="flex gap-1 items-center opacity-80">
                        {discount && discount !== 0 ? (
                            <>
                                <span className="text-lg font-semibold ">
                                    {formatPrice(discountedPrice)}
                                </span>
                                <span className="text-sm font-semibold opacity-60 text-red-800 line-through">
                                    {formatPrice(originalPrice)}

                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-semibold"> {formatPrice(originalPrice)}</span>
                        )}
                        {/* <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1080 1080"
                        >
                            <path d="m1007.94,560.43c-17.72,46.59-50.83,80.65-99.33,102.21-30.81,13.1-67.96,21.58-111.46,25.43-43.5,3.84-129.18,5.76-256.99,5.76s-213.86-2.11-258.14-6.34c-44.28-4.24-81.42-12.52-111.45-24.85-47.75-21.56-80.47-55.04-98.17-100.48-17.72-45.42-18.88-97.39-3.47-155.92l42.73-165.17,102.8,30.03-43.89,169.79c-7.71,30.04-8.28,53.71-1.74,71.04,6.55,17.32,21.38,31,44.47,41,18.47,7.7,47.16,13.09,86.05,16.17,38.87,3.08,119.16,4.61,240.83,4.61,85.47,0,151.11-.96,196.92-2.88,45.81-1.92,75.25-4.23,88.34-6.94,13.1-2.68,26.19-6.73,39.28-12.12,25.41-10.78,40.99-24.83,46.77-42.16,5.78-17.31,4.05-44.07-5.19-80.28l-43.89-160.54,103.95-30.02,43.89,160.53c16.16,60.84,15.4,114.55-2.31,161.13Z" />
                            <rect x="383.63" y="238.5" width="301" height="112" />
                            <rect x="278.38" y="562.75" width="322.5" height="112" transform="translate(1058.38 179.12) rotate(90)" />
                            <rect x="473.38" y="562.75" width="322.5" height="112" transform="translate(1253.38 -15.88) rotate(90)" />
                        </svg> */}
                    </div>
                    {discount !== 0 && (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-1 py-0 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {discount} %
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
