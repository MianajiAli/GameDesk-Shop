import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div><Header /></div>

      <Footer />
    </div>
  );
}