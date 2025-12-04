"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/price-format";
import ScrollToTop from "./ScrollToTop";
import CarCardSkeleton from "./CarCardSkeleton";
import CarCard from "./CarCard";

interface Car {
  id: string | number;
  photo: string;
  title: string;
  category: string;
  priceUSD: string | number;
}

export default function Favorite() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem("favorites");
    const favoriteIds = stored ? JSON.parse(stored) : [];
    setFavorites(favoriteIds);

    // Fetch cars data
    if (favoriteIds.length > 0) {
      fetchFavoriteCars(favoriteIds);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchFavoriteCars = async (ids: number[]) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cars`);
      const allCars = await res.json();
      const favoriteCars = allCars.filter((car: Car) =>
        ids.includes(Number(car.id))
      );
      setCars(favoriteCars);
    } catch (error) {
      console.error("Error fetching favorite cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (carId: number) => {
    const newFavorites = favorites.filter((id) => id !== carId);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setCars(cars.filter((car) => Number(car.id) !== carId));
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                Обране
              </h1>
              <p className="text-gray-600">
                Ваші улюблені автомобілі
              </p>
            </div>
            {cars.length > 0 && (
              <div className="px-4 py-2 bg-blue-950 text-white rounded-xl font-bold">
                {cars.length}
              </div>
            )}
          </div>
        </div>

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
                  priceUSD: String(car.priceUSD || "0"),
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto">
            <div className="relative inline-block mb-6">
              <svg
                className="mx-auto h-24 w-24 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full"></div>
            </div>
            <p className="text-gray-700 text-xl font-bold mb-2">
              У вас поки немає обраних автомобілів
            </p>
            <p className="text-gray-500 text-base mb-6">
              Додайте автомобілі в обране, натиснувши на іконку серця на картці автомобіля
            </p>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-600">Що далі?</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Перегляньте каталог автомобілів</li>
                <li>• Використайте пошук для знаходження потрібного авто</li>
                <li>• Додайте авто в обране для швидкого доступу</li>
              </ul>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-950 text-white rounded-xl hover:bg-blue-950 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-6"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              На головну
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
