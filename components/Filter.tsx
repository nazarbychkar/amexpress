"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Utility function to parse price ranges
function parsePriceRange(priceRange: string) {
  if (!priceRange) return { minPrice: null, maxPrice: null };

  const cleanedPrice = priceRange.replace(/\s+/g, '').replace(/[^\d\-+]/g, '');

  // Case 1: Single number, no range
  if (!cleanedPrice.includes('-') && !cleanedPrice.includes('+')) {
    return { minPrice: parseFloat(cleanedPrice), maxPrice: null };
  }

  // Case 2: Range with a dash (e.g. 25000-30000)
  if (cleanedPrice.includes('-')) {
    const [min, max] = cleanedPrice.split('-').map(val => parseFloat(val));
    return { minPrice: min, maxPrice: max };
  }

  // Case 3: Range with a plus sign (e.g. 30000+)
  if (cleanedPrice.includes('+')) {
    const minPrice = parseFloat(cleanedPrice.replace('+', ''));
    return { minPrice, maxPrice: null };
  }

  return { minPrice: null, maxPrice: null };
}

export default function CategoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for the filter fields
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [year, setYear] = useState(searchParams.get("year") || "");
  const [engineType, setEngineType] = useState(searchParams.get("engineType") || "");
  const [priceMin, setPriceMin] = useState(searchParams.get("priceMin") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("priceMax") || "");

  // Update URL when filter values change
  useEffect(() => {
    const { minPrice, maxPrice } = parsePriceRange(priceMin);

    const params = new URLSearchParams(searchParams.toString());
    if (brand) params.set("brand", brand);
    else params.delete("brand");

    if (year) params.set("year", year);
    else params.delete("year");

    if (engineType) params.set("engineType", engineType);
    else params.delete("engineType");

    if (minPrice) params.set("priceMin", minPrice.toString());
    else params.delete("priceMin");

    if (maxPrice) params.set("priceMax", maxPrice.toString());
    else params.delete("priceMax");

    params.delete("page"); // Reset to first page when filters are applied

    router.replace(`${pathname}?${params.toString()}`);
  }, [brand, year, engineType, priceMin, priceMax, pathname, router]);

  return (
    <div className="bg-white shadow p-4 rounded mb-6 space-y-4">
      <h3 className="text-lg font-semibold">Фільтри</h3>

      {/* Brand Filter */}
      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Бренд (наприклад Toyota)"
        className="border p-2 w-full rounded"
      />

      {/* Year Filter */}
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Рік"
        className="border p-2 w-full rounded"
      />

      {/* Engine Type Filter */}
      <input
        value={engineType}
        onChange={(e) => setEngineType(e.target.value)}
        placeholder="Тип двигуна (Diesel, бензин...)"
        className="border p-2 w-full rounded"
      />

      {/* Price Min & Max Filters */}
      <div className="flex gap-2">
        <input
          type="text"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          placeholder="Мінімальна ціна"
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          placeholder="Максимальна ціна"
          className="border p-2 w-full rounded"
        />
      </div>
    </div>
  );
}
