"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/price-format";

interface CarCardProps {
  car: {
    id: number | string;
    photo: string | null;
    title: string;
    priceUSD: string;
  };
}

export default function CarCard({ car }: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];
      setIsFavorite(favorites.includes(Number(car.id)));
    }
  }, [car.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];

      const newFavorites = isFavorite
        ? favorites.filter((id: number) => id !== Number(car.id))
        : [...favorites, Number(car.id)];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
    }
  };

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
          onClick={toggleFavorite}
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
}

