"use client"; // Client-side only component

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core styles for Swiper
import "swiper/css/navigation"; // Optional: if you use navigation (arrows)
import "swiper/css/pagination"; // Optional: if you use pagination (dots)
import Link from "next/link";

interface Category {
  name: string;
  image: string | null;
  description: string | null;
  slug: string;
  priority: number;
}

interface Categories {
  [key: string]: Category;
}

export default function CategorySwiper() {
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

  // Filter out "main" category and get only categories with names, sorted by priority
  const displayCategories = Object.keys(categories)
    .filter((key) => key !== "main" && categories[key]?.name)
    .map((key) => ({
      key,
      ...categories[key],
      slug: categories[key].slug || key,
      priority: categories[key].priority !== undefined ? categories[key].priority : 999,
    }))
    .sort((a, b) => a.priority - b.priority);

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Виберіть категорію
            </h2>
            <div className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-blue-800 to-transparent rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
        </div>
      </div>
    );
  }

  if (displayCategories.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Виберіть категорію
          </h2>
          <div className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-gray-900 to-transparent rounded-full"></div>
        </div>
        <Link
          href="/catalog"
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-xl hover:from-blue-900 hover:to-blue-950 font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
        >
          <span>Показати всі</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Swiper Component for Categories */}
      <Swiper
        spaceBetween={16}
        slidesPerView={2.2}
        freeMode={true}
        loop={displayCategories.length > 5}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        }}
        className="!pb-2"
      >
        {displayCategories.map((category) => (
          <SwiperSlide key={category.key}>
            <Link
              href={`/catalog/${category.slug}`}
              className="relative flex justify-center items-center text-center py-4 px-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:from-blue-800 hover:to-blue-900 border-2 border-gray-200 hover:border-blue-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group shadow-md hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <span className="relative text-sm font-bold text-gray-700 group-hover:text-white truncate transition-colors duration-300 tracking-wide">
                {category.name}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
