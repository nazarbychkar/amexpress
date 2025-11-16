"use client"; // Client-side only component

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core styles for Swiper
import "swiper/css/navigation"; // Optional: if you use navigation (arrows)
import "swiper/css/pagination"; // Optional: if you use pagination (dots)
import { CATEGORY_MAP } from "@/constants/categories"; // Updated map
import Link from "next/link";

export default function CategorySwiper() {
  return (
    <section className="max-w-6xl mx-auto px-4 mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">Категорії</h2>
        <Link href="/catalog" className="text-sm text-blue-500 hover:underline">
          Показати всі
        </Link>
      </div>

      {/* Swiper Component for Categories */}
      <Swiper
        spaceBetween={15}
        slidesPerView={2.2}
        freeMode={true}
        loop={true}
        className="my-4"
      >
        {Object.keys(CATEGORY_MAP).map((categoryKey) => (
          <SwiperSlide key={categoryKey}>
            <Link
              href={`/catalog/${CATEGORY_MAP[categoryKey]}`}
              className="flex justify-center items-center text-center py-4 px-6 shadow-lg bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="text-lg font-semibold text-gray-800 truncate">
                {categoryKey}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
