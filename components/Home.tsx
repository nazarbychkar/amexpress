import { prisma } from "@/lib/db";
import CategorySwiper from "./CategorySwiper";
import HomeClient from "./HomeClient";
import Link from "next/link";
import { stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

async function getBannerTimestamp() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, "sale-banner.png");
    
    if (existsSync(filePath)) {
      const stats = await stat(filePath);
      return stats.mtime.getTime();
    }
  } catch (err) {
    console.error("Error getting banner timestamp:", err);
  }
  return Date.now();
}

export default async function HomePage() {
  const bannerTimestamp = await getBannerTimestamp();
  // Fetch all cars
  const allCars = await prisma.car.findMany({
    select: {
      id: true,
      title: true,
      priceUSD: true,
      photo: true,
      category: true,
      createdAt: true,
      brand: true,
      mark: true,
    },
  });

  // Get unique brands and models
  const uniqueBrands = Array.from(
    new Set(allCars.map((car: { brand: string }) => car.brand).filter(Boolean))
  ).sort() as string[];
  const modelsByBrand: Record<string, string[]> = {};
  
  allCars.forEach((car: { brand: string; mark: string }) => {
    if (car.brand && car.mark) {
      if (!modelsByBrand[car.brand]) {
        modelsByBrand[car.brand] = [];
      }
      if (!modelsByBrand[car.brand].includes(car.mark)) {
        modelsByBrand[car.brand].push(car.mark);
      }
    }
  });

  // Sort models for each brand
  Object.keys(modelsByBrand).forEach((brand) => {
    modelsByBrand[brand].sort();
  });

  // Shuffle and take 10 random cars
  const shuffledCars = allCars.sort(() => 0.5 - Math.random());
  const randomCars = shuffledCars.slice(0, 10);

  // Pick top 4 cars (for example top by newest)
  const topCars = allCars
    .sort(
      (
        a: { createdAt: string | number | Date },
        b: { createdAt: string | number | Date }
      ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* --- Hero Banner Section --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <Link href="/order" className="block group">
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 border-4 border-white">
            <img
              src={`/sale-banner.png?v=${bannerTimestamp}`}
              alt="Акція, Знижки"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>
        </Link>
      </section>

      {/* --- Categories Section --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <CategorySwiper />
      </section>

      <HomeClient
        randomCars={randomCars}
        topCars={topCars}
        brands={uniqueBrands}
        modelsByBrand={modelsByBrand}
      />
    </div>
  );
}
