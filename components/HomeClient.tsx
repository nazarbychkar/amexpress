"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Key } from "react";
import { formatPrice } from "@/lib/price-format";
import HomeFilters from "./HomeFilters";
import ScrollToTop from "./ScrollToTop";
import Toast from "./Toast";

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

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const toggleFavorite = (carId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setFavorites((prev) => {
      const wasFavorite = prev.includes(carId);
      const newFavorites = wasFavorite
        ? prev.filter((id) => id !== carId)
        : [...prev, carId];
      
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        
        // Show toast notification
        setToastMessage(
          wasFavorite
            ? "Видалено з обраного"
            : "Додано до обраного ❤️"
        );
        setShowToast(true);

        // Dispatch custom event to update bottom nav counter
        window.dispatchEvent(new CustomEvent("favoritesUpdated"));
      }
      
      return newFavorites;
    });
  };

  const CarCard = ({ car }: { car: Car }) => {
    const isFavorite = isMounted && favorites.includes(Number(car.id));
    
    return (
      <Link
        href={`/car/${car.id}`}
        className="group bg-white rounded-2xl shadow-elegant hover:shadow-luxury border-premium overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] relative animate-scale-in hover-lift"
      >
        <div className="w-full h-40 sm:h-48 relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
          <Image
            src={car.photo?.split(" ")[0] || "/placeholder.png"}
            alt={String(car.title)}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
          
          <button
            onClick={(e) => toggleFavorite(Number(car.id), e)}
            className="absolute top-3 right-3 p-2.5 glass rounded-full shadow-medium hover:shadow-strong transition-all duration-300 z-10 hover:scale-110 active:scale-95 backdrop-blur-md"
          >
            <svg
              className={`w-5 h-5 transition-all duration-300 ${
                isFavorite
                  ? "fill-red-500 text-red-500 scale-110 animate-pulse"
                  : "fill-none text-gray-500 group-hover:text-red-400"
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <div className="p-5 bg-gradient-elegant">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-gradient transition-all duration-300">
            {car.title}
          </h3>
          <p
            className={`text-lg sm:text-xl font-black transition-all duration-300 ${
              !car.priceUSD || car.priceUSD === "0" || car.priceUSD === "0.00"
                ? "text-gray-400"
                : "text-gray-900 group-hover:text-gray-800 group-hover:scale-105 inline-block"
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

      {/* --- Переваги Section --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Чому обирають нас
          </h2>
          <p className="text-gray-600 text-lg">
            Ми працюємо для вашого комфорту та впевненості
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Перевага 1 */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Перевірена історія</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Всі автомобілі проходять ретельну перевірку перед доставкою
            </p>
          </div>

          {/* Перевага 2 */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Вигідні ціни</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Автомобілі за ціною нижче ринку без прихованих платежів
            </p>
          </div>

          {/* Перевага 3 */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Швидка доставка</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Оперативна доставка автомобілів з США до України
            </p>
          </div>

          {/* Перевага 4 */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Підтримка 24/7</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Професійна консультація та підтримка на всіх етапах
            </p>
          </div>
        </div>
      </section>

      {showFilters && (
        <HomeFilters
          onClose={() => setShowFilters(false)}
          brands={brands}
          modelsByBrand={modelsByBrand}
        />
      )}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

