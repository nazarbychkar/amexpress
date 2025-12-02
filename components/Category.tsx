import Link from "next/link";
import { prisma } from "@/lib/db";
import CategoryClient from "./CategoryClient";
import CarCard from "./CarCard";
import ScrollToTop from "./ScrollToTop";
import Pagination from "./Pagination";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const PAGE_SIZE = 12;

interface CategoryProps {
  category: string;
  page: number;
  filters?: Record<string, string | undefined>;
}

const CATEGORY_MAP: Record<string, string> = {
  Седани: "sedan",
  Позашляховики: "suv",
  Кросовери: "crosovers",
  Хетчбеки: "hatchback",
  Пікапи: "pickup",
  Головна: "main",
};

const CATEGORY_NAMES: Record<string, string> = {
  sedan: "Седани",
  hatchback: "Хетчбеки",
  pickup: "Пікапи",
  crosovers: "Кросовери",
  suv: "Позашляховики",
  main: "Головна",
};

// Map slug to possible database category values
const REVERSE_CATEGORY_MAP: Record<string, string[]> = {
  sedan: ["Седани", "Седани;Главная"],
  suv: ["Позашляховики", "Позашляховики / Кросовери", "SUV"],
  crosovers: ["Кросовери", "Позашляховики / Кросовери"],
  hatchback: ["Хетчбеки"],
  pickup: ["Пікапи", "Пікапи"],
  main: ["Головна", "Главная", "Седани;Главная"],
};

export default async function Category({
  category,
  page,
  filters = {},
}: CategoryProps) {
  const skip = (page - 1) * PAGE_SIZE;

  // Fetch all cars to get brands and models for filters
  const allCars = await prisma.car.findMany({
    select: {
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

  // Get category image and description
  let categoryImage: string | null = null;
  let categoryDescription: string | null = null;
  try {
    const categoriesFile = path.join(process.cwd(), "data", "categories.json");
    
    if (existsSync(categoriesFile)) {
      const fileContent = await readFile(categoriesFile, "utf-8");
      const categoryData = JSON.parse(fileContent);
      categoryImage = categoryData[category]?.image || null;
      categoryDescription = categoryData[category]?.description || null;
    }
  } catch (err) {
    console.error("Error fetching category data:", err);
  }

  // Build "where" filter for Prisma
  const where: any = {};

  // CATEGORY FILTER USING MAP
  if (category) {
    const dbCategories = REVERSE_CATEGORY_MAP[category];
    if (dbCategories?.length) {
      where.OR = dbCategories.map((ukr) => ({
        category: { contains: ukr, mode: "insensitive" },
      }));
    } else {
      // Fallback: try to match category directly
      where.category = { contains: category, mode: "insensitive" };
    }
  }

  // Apply URL filters (brands, models, year, price)
  if (filters.brands) {
    const brands = (filters.brands as string).split(",");
    where.brand = { in: brands };
  }
  if (filters.models) {
    const models = (filters.models as string).split(",");
    where.mark = { in: models };
  }
  if (filters.yearFrom || filters.yearTo) {
    where.year = {};
    if (filters.yearFrom) {
      where.year.gte = parseInt(filters.yearFrom);
    }
    if (filters.yearTo) {
      where.year.lte = parseInt(filters.yearTo);
    }
  }
  if (filters.priceFrom || filters.priceTo) {
    // Include cars with no price (null, 0, or "0") along with cars in the price range
    const priceConditions: any[] = [];
    
    // Cars with price in the specified range
    const priceRange: any = {};
    if (filters.priceFrom) {
      priceRange.gte = parseFloat(filters.priceFrom);
    }
    if (filters.priceTo) {
      priceRange.lte = parseFloat(filters.priceTo);
    }

    if (Object.keys(priceRange).length > 0) {
      priceConditions.push({ price: priceRange });
  }

    // Cars with no price or price = 0
    priceConditions.push({ price: null });
    priceConditions.push({ price: 0 });
    
    // Combine with OR
    if (where.OR) {
      // If OR already exists (from category filter), we need to combine
      const existingOR = where.OR;
      where.AND = [
        { OR: existingOR },
        { OR: priceConditions }
      ];
      delete where.OR;
    } else {
      where.OR = priceConditions;
    }
  }

  // Fetch cars with the filters applied
  const cars = await prisma.car.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip,
    take: PAGE_SIZE,
    select: {
      id: true,
      title: true,
      priceUSD: true,
      photo: true,
      category: true,
    },
  });


  const totalCars = await prisma.car.count({ where });
  const totalPages = Math.ceil(totalCars / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <ScrollToTop />
      {/* Category Banner with Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 mb-16">
        {categoryImage && (
          <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-t-3xl overflow-hidden transform transition-all duration-300">
            <img
              src={categoryImage}
              alt={CATEGORY_NAMES[category] || "Категорія"}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6 transform transition-all duration-500 w-[90%]">
                <div className="relative inline-block max-w-full">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] tracking-tight uppercase bg-clip-text animate-fade-in break-words">
                    {CATEGORY_NAMES[category] || category}
                  </h1>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-sm"></div>
                </div>
              </div>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/30 rounded-tl-2xl"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-2xl"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/30 rounded-bl-2xl"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/30 rounded-br-2xl"></div>
          </div>
        )}

        {/* Category Description - directly under banner */}
        {categoryDescription && (
          <div className={`bg-white ${categoryImage ? 'rounded-b-3xl' : 'rounded-3xl'} shadow-elegant border-t-0 border-x border-b border-gray-200/50 ${categoryImage ? '-mt-1' : ''} p-6 md:p-8`}>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed text-center font-medium">
                {categoryDescription}
              </p>
            </div>
          </div>
        )}

        {/* Fallback: Show category name if no image */}
        {!categoryImage && (
          <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-t-3xl overflow-hidden bg-gradient-to-br from-blue-800 via-blue-900 to-blue-800 flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight uppercase">
                {CATEGORY_NAMES[category] || category}
              </h1>
            </div>
          </div>
        )}
      </section>

      {/* Filters Button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <CategoryClient
          brands={uniqueBrands}
          modelsByBrand={modelsByBrand}
          categorySlug={category}
        />
      </section>

      {cars.length === 0 ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center py-20 px-4 bg-white rounded-3xl shadow-xl">
            <div className="relative inline-block mb-6">
              <svg
                className="mx-auto h-20 w-20 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full"></div>
            </div>
            <p className="text-gray-700 text-xl font-bold mb-2">Немає автомобілів за обраними фільтрами</p>
            <p className="text-gray-500 text-base mb-6">Спробуйте змінити параметри пошуку</p>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-600">Рекомендації:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Спробуйте змінити фільтри марки або моделі</li>
                <li>• Збільште діапазон року випуску</li>
                <li>• Розширте діапазон ціни</li>
              </ul>
              <Link
                href={`/catalog/${category}`}
                className="inline-block mt-4 px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
              >
                Скинути фільтри
              </Link>
            </div>
              </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="mb-6 px-4 py-3 bg-white rounded-2xl shadow-md border-l-4 border-gray-900">
            <p className="text-sm text-gray-600">
              Знайдено: <span className="font-black text-gray-900 text-lg">{totalCars}</span> <span className="font-semibold">{totalCars === 1 ? 'автомобіль' : totalCars < 5 ? 'автомобілі' : 'автомобілів'}</span>
            </p>
              </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {cars.map((car: { id: number | string; photo: string | null; title: string; priceUSD: string }) => (
              <CarCard key={car.id} car={car} />
          ))}
        </div>
        </section>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl={`/catalog/${category}`}
        filters={filters}
      />
    </div>
  );
}
