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
    <section className="min-h-screen bg-gray-50 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Пошук автомобіля..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-500 text-center py-8">Завантаження...</p>
          ) : cars.length > 0 ? (
            cars.map((car) => (
              <Link
                href={`/car/${car.id}`}
                key={car.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition flex items-center p-4"
              >
                <div className="relative w-24 h-16 shrink-0 rounded overflow-hidden">
                  <Image
                    src={car.photo?.split(" ")[0] || "/placeholder.png"}
                    alt={car.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {car.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Категорія: {car.category}
                  </p>
                </div>

                <div className="text-red-500 font-semibold text-base">
                  {car.priceUSD} $
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
