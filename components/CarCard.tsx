"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/price-format";
import Toast from "./Toast";

interface CarCardProps {
  car: {
    id: number | string;
    photo: string | null;
    title: string;
    priceUSD: string;
  };
}

export default function CarCard({ car }: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];
      return favorites.includes(Number(car.id));
    }
    return false;
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];

      const wasFavorite = isFavorite;
      const newFavorites = wasFavorite
        ? favorites.filter((id: number) => id !== Number(car.id))
        : [...favorites, Number(car.id)];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(!wasFavorite);

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
  };

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
          onClick={toggleFavorite}
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
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </Link>
  );
}

