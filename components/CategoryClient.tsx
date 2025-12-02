"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HomeFilters from "./HomeFilters";

interface CategoryClientProps {
  brands: string[];
  modelsByBrand: Record<string, string[]>;
  categorySlug: string;
}

export default function CategoryClient({
  brands,
  modelsByBrand,
  categorySlug,
}: CategoryClientProps) {
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if filters are applied
  const hasFilters = searchParams.toString().length > 0;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Авто
          </h2>
          <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-blue-800 to-transparent rounded-full"></div>
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-xl hover:from-blue-900 hover:to-blue-950 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:-translate-y-0.5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          <svg
            className="relative w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="relative">Фільтри</span>
          {hasFilters && (
            <span className="relative ml-1 px-2.5 py-1 bg-red-500 text-white text-xs rounded-full font-bold shadow-md animate-pulse">
              {searchParams.toString().split("&").filter(p => p && !p.includes("page=")).length}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <HomeFilters
          onClose={() => setShowFilters(false)}
          brands={brands}
          modelsByBrand={modelsByBrand}
        />
      )}
    </>
  );
}

