"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_MAP } from "@/constants/categories";
import ScrollToTop from "./ScrollToTop";

interface Category {
  name: string;
  image: string | null;
}

interface Categories {
  [key: string]: Category;
}

const CATEGORY_KEY_MAP: Record<string, string> = {
  Седани: "sedan",
  Хетчбеки: "hatchback",
  Пікапи: "pickup",
  Кросовери: "crosovers",
  Позашляховики: "suv",
  Головна: "main",
};

export default function Catalog() {
  const [categories, setCategories] = useState<Categories>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        Виберіть категорію
      </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Object.keys(CATEGORY_MAP).map((categoryKey) => {
              const categorySlug =
                CATEGORY_KEY_MAP[categoryKey] || categoryKey.toLowerCase();
              const category =
                categories[categorySlug] || {
                  name: categoryKey,
                  image: null,
                };

              return (
                <Link
                  key={categoryKey}
                  href={`/catalog/${categorySlug}`}
                  className="flex flex-col items-center text-center shadow-lg bg-white rounded-2xl hover:shadow-2xl border border-gray-100 hover:border-gray-300 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.03] group overflow-hidden relative"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    {category.image ? (
                      <>
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-125 transition-transform duration-700"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100"></div>
                  )}
                </div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 sm:p-5">
                    <span className="text-base sm:text-lg font-bold text-white drop-shadow-lg block">
                      {category.name}
                    </span>
            </div>
          </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
