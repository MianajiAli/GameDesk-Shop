// components/Pagination.js
'use client'; // Ensure this component can use hooks and client-side functionality

import { useRouter } from 'next/navigation';

export default function Pagination({ currentPage, totalPages }) {
    const router = useRouter();

    // Navigate to the specified page number
    const navigateToPage = (page) => {
        if (page > 0 && page <= totalPages) {
            router.push(`/shop/${page}`);
        }
    };

    return (
        <div className="flex justify-center items-center space-x-4 mt-5">
            {/* Previous Button */}
            <button
                onClick={() => navigateToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Previous
            </button>

            {/* Page Indicators */}
            <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
            </span>

            {/* Next Button */}
            <button
                onClick={() => navigateToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
}
