import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen justify-between">

      {/* Header Section */}
      <div>
        <Header />
      </div>

      {/* Main Content */}
      <main className="w-full p-3 space-y-1">

        {/* Hero Banner Section */}
        <section className="w-full mx-auto max-w-[1200px] space-y-2">

          <Link href="/shop">
            <div className="relative w-full aspect-[10/4]">
              <Image
                src={'/images/banners/hero.webp'}
                alt={'/'}
                fill
                placeholder='empty'
                priority={true}
                sizes="100%"
                className="rounded-md object-cover bg-black/5 text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
              />
            </div>
          </Link>

          {/* Banner Grid */}
          <div className="w-full min-h-[10rem] rounded-sm grid grid-cols-2 md:grid-cols-4 gap-1 *:flex *:justify-center *:items-center">

            <div>
              <div className="relative w-full aspect-[10/4]">
                <Image
                  src={'/images/banners/hero11.webp'}
                  alt={'/'}
                  fill
                  placeholder='empty'
                  priority
                  sizes="100%"
                  className="rounded-md object-cover text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="relative w-full aspect-[10/4]">
                <Image
                  src={'/images/banners/hero12.webp'}
                  alt={'/'}
                  fill
                  placeholder='empty'
                  priority
                  sizes="100%"
                  className="rounded-md object-cover text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="relative w-full aspect-[10/4]">
                <Image
                  src={'/images/banners/hero13.webp'}
                  alt={'/'}
                  fill
                  placeholder='empty'
                  priority
                  sizes="100%"
                  className="rounded-md object-cover text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
                />
              </div>
            </div>
            <div>
              <div className="relative w-full aspect-[10/4]">
                <Image
                  src={'/images/banners/hero14.webp'}
                  alt={'/'}
                  fill
                  placeholder='empty'
                  priority
                  sizes="100%"
                  className="rounded-md object-cover text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Featured Products or Bestsellers */}
        <section className="w-full mx-auto max-w-[1200px] space-y-2">
          <h2 className="text-xl font-semibold">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Placeholder for featured products */}
            <div className="p-4 bg-gray-200">Product 1</div>
            <div className="p-4 bg-gray-200">Product 2</div>
            <div className="p-4 bg-gray-200">Product 3</div>
            <div className="p-4 bg-gray-200">Product 4</div>
          </div>
        </section>

        {/* Section 7: Sales & Promotions */}
        <section className="w-full mx-auto max-w-[1200px] space-y-2">
          <h2 className="text-xl font-semibold">Current Sales & Promotions</h2>
          <div className="p-4 bg-yellow-200">Limited-time Offer: 20% off on all items!</div>
        </section>

        {/* Section 8: Customer Testimonials/Reviews */}
        <section className="w-full mx-auto max-w-[1200px] space-y-2">
          <h2 className="text-xl font-semibold">What Our Customers Say</h2>
          <div className="space-y-4">
            <blockquote className="p-4 bg-gray-100 rounded-md">
              "Great products, fast shipping!" - Customer A
            </blockquote>
            <blockquote className="p-4 bg-gray-100 rounded-md">
              "I love the quality of the items!" - Customer B
            </blockquote>
          </div>
        </section>

        {/* Section 9: Trust Signals */}
        <section className="w-full mx-auto max-w-[1200px] space-y-2">
          <h2 className="text-xl font-semibold">Shop with Confidence</h2>
          <div className="flex space-x-4">
            <Image src="/images/trust-badge-1.webp" alt="Secure Payment" width={50} height={50} />
            <Image src="/images/trust-badge-2.webp" alt="Free Returns" width={50} height={50} />
          </div>
        </section>

        {/* Section 10: Personalized Recommendations */}
        <section className="w-full mx-auto max-w-[1200px] space-y-2">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Placeholder for recommended products */}
            <div className="p-4 bg-gray-200">Product A</div>
            <div className="p-4 bg-gray-200">Product B</div>
            <div className="p-4 bg-gray-200">Product C</div>
            <div className="p-4 bg-gray-200">Product D</div>
          </div>
        </section>





      </main>

      {/* Footer Section */}
      <Footer />

    </div>
  );
}
