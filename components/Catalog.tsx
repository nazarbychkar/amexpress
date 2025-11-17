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
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-12">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-2">
            Виберіть категорію
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-900 to-transparent rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : (
          <div className="space-y-4">
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
                  className="block group relative w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
                    {category.image ? (
                      <>
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        {/* Dark Gradient Overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                        {/* Hover gradient effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100"></div>
                    )}
                  </div>

                  {/* Enhanced Text Overlay */}
                  <div className="absolute inset-0 flex items-center justify-start px-8 sm:px-12 md:px-16">
                    <div className="relative z-10">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tight mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                        {category.name}
                      </h2>
                      <div className="w-16 h-1 bg-white/90 rounded-full transform group-hover:translate-x-2 transition-transform duration-300"></div>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute right-8 bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-8 h-8 text-white drop-shadow-lg transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
