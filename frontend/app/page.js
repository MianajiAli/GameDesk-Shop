import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import FeaturedProducts from "@/components/FeaturedProducts";

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
            <div className="relative w-full aspect-[10/4] ">
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
          <div className="animate-slideDown w-full min-h-[10rem] rounded-sm grid grid-cols-2 md:grid-cols-4 gap-1 *:flex *:justify-center *:items-center">

            <div>
              <div className="relative w-full aspect-[10/4] ">
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
        {/* Section 7: Sales & Promotions */}
        <section className="w-full mx-auto max-w-[1200px] space-y-2">
          <h2 className="text-xl font-semibold text-right">تخفیف‌ها و پیشنهادات ویژه</h2>
          <div className="p-4 bg-yellow-200 text-right" dir="rtl">پیشنهاد ویژه: ۲۰٪ تخفیف روی تمام محصولات!</div>
          <FeaturedProducts discounted></FeaturedProducts>

        </section>

        {/* Section 6: Featured Products or Bestsellers */}
        <section className="w-full mx-auto max-w-[1200px] space-y-2">
          {/* <h2 className="text-xl font-semibold">محصولات ویژه</h2> */}
          <FeaturedProducts></FeaturedProducts>

        </section>



        {/* Section 8: Customer Testimonials/Reviews */}
        <section className="w-full mx-auto max-w-[1200px] space-y-2">
          <h2 className="text-xl font-semibold text-right">نظرات مشتریان ما</h2>
          <div className="flex flex-col md:flex-row gap-3 py-3">

            <blockquote className="flex-1 bg-gray-100 rounded-md">
              <div className="relative w-full aspect-[10/4.8] ">
                <Image
                  src={'/images/banners/x.png'}
                  alt={'/'}
                  fill
                  placeholder='empty'
                  priority
                  sizes="100%"
                  className="rounded-md object-contain text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
                />
              </div>
            </blockquote>
            <blockquote className="flex-1 bg-gray-100 rounded-md">
              <div className="relative w-full aspect-[10/4.8] ">
                <Image
                  src={'/images/banners/x.png'}
                  alt={'/'}
                  fill
                  placeholder='empty'
                  priority
                  sizes="100%"
                  className="rounded-md object-contain text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
                />
              </div>
            </blockquote>
          </div>
        </section>



        {/* Section 10: Personalized Recommendations */}
        <section className="w-full mx-auto max-w-[1200px] space-y-2">
          <h2 className="text-xl font-semibold text-right ">جدیدترین محصولات</h2>

          {/* Placeholder for recommended products */}
          <FeaturedProducts newest></FeaturedProducts>

        </section>

        <section>
          <div className="relative w-full aspect-[1920/500]">
            <Image
              src={'/images/banners/telegram.png'}
              alt={'/'}
              fill
              placeholder='empty'
              priority
              sizes="100%"
              className="rounded-md object-cover text-black/50 flex justify-center items-center text-right text-xs md:text-sm"
            />
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <Footer />

    </div>
  );
}
