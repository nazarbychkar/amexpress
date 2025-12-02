"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  filters?: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  filters = {},
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Scroll to top when page changes (detected via URL change)
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      // Small delay to ensure page content is loaded
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [pathname, searchParams]);

  const createPageLink = (pageNum: number) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });
    params.set("page", pageNum.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const handleLinkClick = () => {
    // Scroll to top immediately when link is clicked
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageClassName = (pageNum: number) => {
    return `min-w-[36px] sm:min-w-[48px] px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border-2 text-sm sm:text-base font-bold transition-all duration-300 transform ${
      currentPage === pageNum
        ? "bg-gradient-to-br from-blue-800 via-blue-900 to-blue-800 text-white border-blue-900 shadow-xl scale-110 ring-2 ring-blue-400 ring-offset-2"
        : "bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-300 hover:from-blue-800 hover:to-blue-900 hover:text-white hover:border-blue-900 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
    }`;
  };

  if (totalPages <= 1) return null;

  // Build pages array
  const pages: (number | string)[] = [];

  // Always show first 3 pages
  for (let i = 1; i <= Math.min(3, totalPages); i++) {
    pages.push(i);
  }

  // If there are more than 3 pages, show ellipsis and handle current/last page
  if (totalPages > 3) {
    // Show current page if it's not in the first 3 and not the last page
    if (currentPage > 3 && currentPage < totalPages) {
      if (currentPage > 4) {
        pages.push("...");
      }
      // Only add current page if it's not already in the array
      if (!pages.includes(currentPage)) {
        pages.push(currentPage);
      }
    }

    // Show last page if it's not already shown
    if (totalPages > 3 && !pages.includes(totalPages)) {
      if (currentPage < totalPages - 2 && !pages.includes("...")) {
        pages.push("...");
      } else if (currentPage === totalPages - 2 && !pages.includes("...")) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="flex justify-center items-center flex-wrap gap-3">
        {/* Previous button */}
        {currentPage > 1 && (
          <Link
            href={createPageLink(currentPage - 1)}
            onClick={handleLinkClick}
            className="group px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border-2 bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-300 hover:from-blue-800 hover:to-blue-900 hover:text-white hover:border-blue-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        )}

        {/* Page numbers */}
        {pages.map((item, idx) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 sm:px-4 py-2 sm:py-3 text-gray-400 font-black text-base sm:text-xl select-none"
              >
                •••
              </span>
            );
          }

          const pageNum = item as number;
          return (
            <Link
              key={pageNum}
              href={createPageLink(pageNum)}
              onClick={handleLinkClick}
              className={getPageClassName(pageNum)}
            >
              {pageNum}
            </Link>
          );
        })}

        {/* Next button */}
        {currentPage < totalPages && (
          <Link
            href={createPageLink(currentPage + 1)}
            onClick={handleLinkClick}
            className="group px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border-2 bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-300 hover:from-blue-800 hover:to-blue-900 hover:text-white hover:border-blue-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
    </section>
  );
}

