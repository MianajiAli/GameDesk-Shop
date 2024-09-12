export default function Page() {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
                <div className="mt-2">
                    <a href="https://twitter.com/myshop" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Twitter</a> |
                    <a href="https://facebook.com/myshop" className="text-blue-400 hover:underline ml-2" target="_blank" rel="noopener noreferrer">Facebook</a>
                </div>
            </div>
        </footer>
    );
}