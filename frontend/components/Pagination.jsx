'use client'; // Ensure this component can use hooks and client-side functionality

import { useRouter } from 'next/navigation';

export default function Pagination({ currentPage, totalPages, basePath }) {
    const router = useRouter();

    // Navigate to the specified page number
    const navigateToPage = (page) => {
        if (page > 0 && page <= totalPages) {
            router.push(`${basePath}?page=${page}`); // Change to query parameter
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
        <nav dir="ltr" className=" w-full flex justify-center pt-10" aria-label="Page navigation example">
            <ul className="list-style-none flex">
                {/* Previous Button */}
                <li>
                    <a
                        onClick={() => currentPage > 1 && navigateToPage(currentPage - 1)}
                        aria-label="Go to previous page"
                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition duration-300 ${currentPage <= 1 ? 'cursor-not-allowed opacity-50 text-gray-500' : 'text-gray-700 hover:bg-gray-200 focus:bg-gray-200'}`}
                    >
                        Previous
                    </a>
                </li>

                {/* Page Indicators */}
                {getPageIndicators().map((indicator, index) => (
                    <li key={index} aria-current={indicator === currentPage ? 'page' : undefined}>
                        <a
                            onClick={() => typeof indicator === 'number' && navigateToPage(indicator)}
                            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition duration-300 ${indicator === currentPage ? 'bg-gray-300 text-gray-900' : 'text-gray-700 hover:bg-gray-200 focus:bg-gray-200'}`}
                        >
                            {indicator}
                        </a>
                    </li>
                ))}

                {/* Next Button */}
                <li>
                    <a
                        onClick={() => currentPage < totalPages && navigateToPage(currentPage + 1)}
                        aria-label="Go to next page"
                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition duration-300 ${currentPage >= totalPages ? 'cursor-not-allowed opacity-50 text-gray-500' : 'text-gray-700 hover:bg-gray-200 focus:bg-gray-200'}`}
                    >
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
}
