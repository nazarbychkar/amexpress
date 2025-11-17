"use client";

import { useState, useEffect } from "react";
import Toast from "./Toast";

interface FavoriteButtonProps {
  carId: number;
  className?: string;
}

export default function FavoriteButton({ carId, className = "" }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];
      setIsFavorite(favorites.includes(carId));
    }
  }, [carId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];
      
      const wasFavorite = isFavorite;
      const newFavorites = wasFavorite
        ? favorites.filter((id: number) => id !== carId)
        : [...favorites, carId];
      
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
    <>
      <button
        onClick={toggleFavorite}
        className={`p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all ${className}`}
        title={isFavorite ? "Видалити з обраного" : "Додати в обране"}
      >
        <svg
          className={`w-6 h-6 transition-all duration-300 ${
            isFavorite
              ? "fill-red-500 text-red-500 scale-110"
              : "fill-none text-gray-400 hover:text-red-400"
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

