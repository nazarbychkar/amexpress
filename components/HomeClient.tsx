"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Key } from "react";
import { formatPrice } from "@/lib/price-format";
import HomeFilters from "./HomeFilters";
import ScrollToTop from "./ScrollToTop";

interface Car {
  id: Key | null | undefined;
  photo: any;
  title: string;
  priceUSD: string;
}

interface HomeClientProps {
  randomCars: Car[];
  topCars: Car[];
  brands: string[];
  modelsByBrand: Record<string, string[]>;
}

export default function HomeClient({
  randomCars,
  topCars,
  brands,
  modelsByBrand,
}: HomeClientProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      setFavorites(stored ? JSON.parse(stored) : []);
    }
  }, []);

  const toggleFavorite = (carId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setFavorites((prev) => {
      const newFavorites = prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId];
      
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      }
      
      return newFavorites;
    });
  };

  const CarCard = ({ car }: { car: Car }) => {
    const isFavorite = isMounted && favorites.includes(Number(car.id));
    
    return (
      <Link
        href={`/car/${car.id}`}
        className="group bg-white rounded-xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-2 relative"
      >
        <div className="w-full h-40 sm:h-48 relative overflow-hidden bg-gray-100">
          <Image
            src={car.photo?.split(" ")[0] || "/placeholder.png"}
            alt={String(car.title)}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button
            onClick={(e) => toggleFavorite(Number(car.id), e)}
            className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all z-10"
          >
            <svg
              className={`w-5 h-5 transition-all ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "fill-none text-gray-400 hover:text-red-400"
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
            {car.title}
          </h3>
          <p
            className={`text-lg sm:text-xl font-bold ${
              !car.priceUSD || car.priceUSD === "0" || car.priceUSD === "0.00"
                ? "text-gray-500"
                : "text-green-600"
            }`}
          >
            {formatPrice(car.priceUSD)}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <>
      <ScrollToTop />
      {/* --- Всі товари Section --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Всі авто
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Широкий вибір автомобілів з США
            </p>
          </div>
          <div className="flex items-center gap-4">
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
            <Link
              href="/catalog"
              className="hidden sm:flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm md:text-base transition-colors"
            >
              Дивитись всі
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {randomCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/catalog"
            className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium text-base"
          >
            Дивитись всі
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* --- Топ товари Section --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Топ авто
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Найпопулярніші та найновіші моделі
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
          {topCars.map((car) => (
            <Link
              href={`/car/${car.id}`}
              key={car.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-2 relative"
            >
              <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                НОВИНКА
              </div>
              <div className="w-full h-40 sm:h-48 relative overflow-hidden bg-gray-100">
                <Image
                  src={car.photo?.split(" ")[0] || "/placeholder.png"}
                  alt={String(car.title)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={(e) => toggleFavorite(Number(car.id), e)}
                  className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all z-10"
                >
                  <svg
                    className={`w-5 h-5 transition-all ${
                      isMounted && favorites.includes(Number(car.id))
                        ? "fill-red-500 text-red-500"
                        : "fill-none text-gray-400 hover:text-red-400"
                    }`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                  {car.title}
                </h3>
                <p
                  className={`text-lg sm:text-xl font-bold ${
                    !car.priceUSD ||
                    car.priceUSD === "0" ||
                    car.priceUSD === "0.00"
                      ? "text-gray-500"
                      : "text-green-600"
                  }`}
                >
                  {formatPrice(car.priceUSD)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

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

