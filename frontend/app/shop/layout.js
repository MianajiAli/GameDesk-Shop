import Header from "@/components/Header";
import Footer from "@/components/Footer";
const layout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default layout;