"use client";

import { useState } from "react";
import Image from "next/image";

export default function Favorite() {
  // Example favorite cars (replace with real data or API)
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Toyota Camry",
      cost: "18 500 $",
      year: 2018,
      image: "/images/cars/camry.jpg",
    },
    {
      id: 2,
      name: "Hyundai Tucson",
      cost: "21 300 $",
      year: 2021,
      image: "/images/cars/tucson.jpg",
    },
  ]);

  // Optional: remove from favorites
  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((car) => car.id !== id));
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Обране</h1>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition flex items-center p-4 relative"
              >
                {/* Car Image */}
                <div className="relative w-24 h-16 shrink-0 rounded overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Car Info */}
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {car.name}
                  </h3>
                  <p className="text-gray-500 text-sm">Рік: {car.year}</p>
                </div>

                {/* Cost */}
                <div className="text-red-500 font-semibold text-base">
                  {car.cost}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFavorite(car.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                  title="Видалити з обраного"
                >
                  ❤️
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            У вас немає обраних автомобілів 😔
          </p>
        )}
      </div>
    </section>
  );
}
