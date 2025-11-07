"use client";

import { useState } from "react";
import Image from "next/image";

export default function Search() {
  const [query, setQuery] = useState("");

  // Example car dataset (replace with real data or API)
  const cars = [
    {
      id: 1,
      name: "Toyota Camry",
      cost: "18 500 $",
      year: 2018,
      image: "/images/cars/camry.jpg",
    },
    {
      id: 2,
      name: "Nissan Leaf",
      cost: "12 900 $",
      year: 2020,
      image: "/images/cars/leaf.jpg",
    },
    {
      id: 3,
      name: "Ford Ranger",
      cost: "25 000 $",
      year: 2019,
      image: "/images/cars/ranger.jpg",
    },
    {
      id: 4,
      name: "Hyundai Tucson",
      cost: "21 300 $",
      year: 2021,
      image: "/images/cars/tucson.jpg",
    },
  ];

  const filtered = cars.filter((car) =>
    car.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gray-50 px-6">
      <div className="max-w-2xl mx-auto">
        {/* --- Search Input --- */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Пошук автомобіля..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* --- Results List --- */}
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition flex items-center p-4"
              >
                <div className="relative w-24 h-16 shrink-0 rounded overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {car.name}
                  </h3>
                  <p className="text-gray-500 text-sm">Рік: {car.year}</p>
                </div>

                <div className="text-red-500 font-semibold text-base">
                  {car.cost}
                </div>
              </div>
            ))
          ) : (
            query && (
              <p className="text-gray-500 text-center py-8">
                Нічого не знайдено 😔
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
