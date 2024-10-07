import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div><Header /></div>
      <div className=" w-full p-3 space-y-3 ">

        <div className=" w-full mx-auto max-w-[1200px]  ">
          <Link href="/shop">
            <div className="relative w-full aspect-[10/4]" >
              <Image
                src={'/images/banners/hero.webp'}
                alt={'/'}
                fill
                placeholder='empty'
                priority={true}
                sizes="100%"
                className="rounded-lg object-cover bg-black/5 text-black/50 flex justify-center items-center text-right text-xs md:text-sm   "
              />
            </div>
          </Link>
        </div>

        <div className="w-full h-[10rem] rounded-sm flex ">
          categories
        </div>
      </div >
      <Footer />
    </div >
  );
}