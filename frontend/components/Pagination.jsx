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

    // Generate page indicators
    const getPageIndicators = () => {
        const indicators = [];
        if (totalPages <= 1) return indicators; // Early return for edge case

        // Add first page
        indicators.push(1);
        if (currentPage > 3) indicators.push('...'); // Show ellipsis if needed

        // Add current and neighboring pages
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            indicators.push(i);
        }

        // Add last page
        if (currentPage < totalPages - 2) indicators.push('...');
        if (totalPages > 1) indicators.push(totalPages);

        return indicators;
    };

    return (
        <div className="flex justify-center items-center space-x-4 mt-5">
            {/* Previous Button */}
            <button
                onClick={() => navigateToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Go to previous page"
                className="w-8 text-xl aspect-square bg-stone-900/80 text-white rounded-full flex justify-center items-center font-bold  disabled:bg-gray-300 hover:bg-blue-600 transition duration-200"
            >
                \
            </button>

            {/* Page Indicators */}
            <div className="px-4 py-2 flex justify-center items-center gap-1">
                {getPageIndicators().map((indicator, index) => (
                    <div
                        key={index}
                        className={`w-8 text-xl aspect-square bg-stone-900/50 text-white rounded-full flex justify-center items-center font-bold cursor-pointer select-none hover:bg-blue-600 transition duration-200 ${indicator === currentPage ? 'bg-stone-900/80 text-white' : ''}`}
                        onClick={() => typeof indicator === 'number' && navigateToPage(indicator)}
                    >
                        {indicator}
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => navigateToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Go to next page"
                className="w-8 text-xl aspect-square bg-stone-900/80 text-white rounded-full flex justify-center items-center font-bold  disabled:bg-gray-300 hover:bg-blue-600 transition duration-200"
            >
                /
            </button>
        </div>
    );
}
