"use client"; // Client-side only component

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core styles for Swiper
import "swiper/css/navigation"; // Optional: if you use navigation (arrows)
import "swiper/css/pagination"; // Optional: if you use pagination (dots)
import { CATEGORY_MAP } from "@/constants/categories"; // Updated map
import Link from "next/link";

// Map Ukrainian category names to slugs
const CATEGORY_TO_SLUG: Record<string, string> = {
  Седани: "sedan",
  Позашляховики: "suv",
  Кросовери: "crosovers",
  Хетчбеки: "hatchback",
  Пікапи: "pickup",
  Головна: "main",
};

export default function CategorySwiper() {
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
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl hover:from-gray-800 hover:to-gray-700 font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
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
        loop={true}
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
        {Object.keys(CATEGORY_MAP).map((categoryKey) => {
          const slug = CATEGORY_TO_SLUG[categoryKey] || categoryKey.toLowerCase();
          return (
          <SwiperSlide key={categoryKey}>
            <Link
                href={`/catalog/${slug}`}
                className="relative flex justify-center items-center text-center py-4 px-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:from-gray-900 hover:to-gray-800 border-2 border-gray-200 hover:border-gray-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group shadow-md hover:shadow-xl overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <span className="relative text-sm font-bold text-gray-700 group-hover:text-white truncate transition-colors duration-300 tracking-wide">
                {categoryKey}
              </span>
            </Link>
          </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
