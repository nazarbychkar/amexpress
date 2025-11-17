"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/price-format";
import CarCard from "./CarCard";
import CarCardSkeleton from "./CarCardSkeleton";
import ScrollToTop from "./ScrollToTop";
import HomeFilters from "./HomeFilters";

interface Car {
  id: string | number;
  photo: string;
  title: string;
  category: string;
  priceUSD: string | number;
}

interface RecentCar {
  id: string | number;
  photo: string;
  title: string;
  priceUSD: string | number;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentCars, setRecentCars] = useState<RecentCar[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [modelsByBrand, setModelsByBrand] = useState<Record<string, string[]>>({});

  // Load recent searches and cars from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSearches = localStorage.getItem("recentSearches");
      if (storedSearches) {
        try {
          const searches = JSON.parse(storedSearches);
          setRecentSearches(searches);
        } catch (e) {
          console.error("Error parsing recent searches:", e);
        }
      }

      const storedCars = localStorage.getItem("recentViewedCars");
      if (storedCars) {
        try {
          const cars = JSON.parse(storedCars);
          setRecentCars(cars);
        } catch (e) {
          console.error("Error parsing recent cars:", e);
        }
      }
    }
  }, []);

  // Load brands and models for filters
  useEffect(() => {
    fetch("/api/cars/filters")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.brands || []);
        setModelsByBrand(data.modelsByBrand || {});
      })
      .catch((err) => {
        console.error("Error fetching filters:", err);
      });
  }, []);

  useEffect(() => {
    if (!query) {
      setCars([]);
      return;
    }

    const fetchCars = async () => {
      setLoading(true);
      const res = await fetch(`/api/cars?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setCars(data);
      setLoading(false);
      
      // Save search query if we have results
      if (data.length > 0 && query.trim()) {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("recentSearches");
          let searches: string[] = stored ? JSON.parse(stored) : [];
          
          // Remove if already exists
          searches = searches.filter((s) => s.toLowerCase() !== query.toLowerCase());
          // Add to beginning
          searches.unshift(query);
          // Keep only last 10
          searches = searches.slice(0, 10);
          
          localStorage.setItem("recentSearches", JSON.stringify(searches));
          setRecentSearches(searches);
        }
      }
    };

    const debounce = setTimeout(() => {
    fetchCars();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const clearRecentSearches = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("recentSearches");
      setRecentSearches([]);
    }
  };

  // Popular search suggestions
  const popularSearches = ["BMW", "Mercedes", "Tesla", "Toyota", "Audi", "Lexus"];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                Пошук автомобілів
              </h1>
              <p className="text-gray-600">
                Знайдіть свій ідеальний автомобіль
              </p>
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="hidden sm:inline">Фільтри</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          <input
            type="text"
              placeholder="Введіть марку, модель або рік..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all shadow-md text-gray-900 placeholder-gray-400"
              autoFocus
              list="search-suggestions"
            />
            <datalist id="search-suggestions">
              {popularSearches.map((suggestion, idx) => (
                <option key={idx} value={suggestion} />
              ))}
            </datalist>
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Popular Searches */}
          {!query && (
            <div className="mt-4 max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-gray-600 mb-3">Популярні пошуки:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches and Viewed Cars */}
          {!query && (recentSearches.length > 0 || recentCars.length > 0) && (
            <div className="mt-4 max-w-2xl mx-auto space-y-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-600">Останні пошуки:</p>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Очистити
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors flex items-center gap-2 group"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Viewed Cars */}
              {recentCars.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-600">Останні переглянуті:</p>
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          localStorage.removeItem("recentViewedCars");
                          setRecentCars([]);
                        }
                      }}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Очистити
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {recentCars.map((car) => (
                      <CarCard
                        key={car.id}
                        car={{
                          id: car.id,
                          photo: car.photo || null,
                          title: car.title,
                          priceUSD: typeof car.priceUSD === "string" ? car.priceUSD : String(car.priceUSD || "0"),
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        {!loading && cars.length > 0 && (
          <div className="mb-6 px-4 py-3 bg-white rounded-2xl shadow-md border-l-4 border-gray-900 max-w-2xl mx-auto">
            <p className="text-sm text-gray-600">
              Знайдено: <span className="font-black text-gray-900 text-lg">{cars.length}</span>{" "}
              <span className="font-semibold">
                {cars.length === 1 ? "автомобіль" : cars.length < 5 ? "автомобілі" : "автомобілів"}
              </span>
            </p>
          </div>
        )}

        {/* Results */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <CarCardSkeleton key={index} />
              ))}
            </div>
          ) : cars.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={{
                    id: car.id,
                    photo: car.photo || null,
                    title: car.title,
                    priceUSD: typeof car.priceUSD === "string" ? car.priceUSD : String(car.priceUSD || "0"),
                  }}
                />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-20 px-4 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto">
              <div className="relative inline-block mb-6">
                <svg
                  className="mx-auto h-20 w-20 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full"></div>
                </div>
              <p className="text-gray-700 text-xl font-bold mb-2">
                Нічого не знайдено за запитом "{query}"
              </p>
              <p className="text-gray-500 text-base mb-6">
                Спробуйте змінити запит або перевірте правильність написання
              </p>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">Рекомендації:</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Перевірте правильність написання марки або моделі</li>
                  <li>• Спробуйте використати популярні пошуки вище</li>
                  <li>• Використайте фільтри для більш точного пошуку</li>
                </ul>
                <Link
                  href="/catalog"
                  className="inline-block mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Переглянути всі авто
                </Link>
                  </div>
                </div>
          ) : (
            <div className="text-center py-20 px-4">
              <svg
                className="mx-auto h-24 w-24 text-gray-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-gray-600 text-lg font-medium">
                Почніть вводити для пошуку
              </p>
            </div>
          )}
        </section>
      </div>

      {showFilters && (
        <HomeFilters
          onClose={() => setShowFilters(false)}
          brands={brands}
          modelsByBrand={modelsByBrand}
        />
      )}
    </section>
  );
}
