"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Car {
  id: string | number;
  photo: string;
  title: string;
  category: string;
  priceUSD: string | number;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

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
    };

    fetchCars();
  }, [query]);

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Search Input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Пошук автомобіля..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-6 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-gray-500 text-center py-8 animate-pulse">Завантаження...</p>
          ) : cars.length > 0 ? (
            cars.map((car) => (
              <Link
                href={`/car/${car.id}`}
                key={car.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-stretch"
              >
                {/* Large image at the top */}
                <div className="relative w-full h-60 sm:h-72 md:h-80 overflow-hidden rounded-t-lg">
                  <Image
                    src={car.photo?.split(" ")[0] || "/placeholder.png"}
                    alt={car.title}
                    layout="fill"
                    className="object-cover"
                  />
                </div>

                {/* Car info */}
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{car.title}</h3>
                    <p className="text-gray-500 text-sm">
                      Категорія: {car.category}
                    </p>
                  </div>

                  <div className="text-red-500 font-semibold text-lg mt-3">
                    {car.priceUSD} $
                  </div>
                </div>
              </Link>
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
