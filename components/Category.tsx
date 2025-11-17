import Link from "next/link";
import { prisma } from "@/lib/db";
import CategoryClient from "./CategoryClient";
import CarCard from "./CarCard";
import ScrollToTop from "./ScrollToTop";
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
          <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-t-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transform transition-all duration-300 hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)]">
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
          <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-t-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
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
                className="inline-block mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
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
      {totalPages > 1 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex justify-center items-center flex-wrap gap-3">
          {/* Previous button */}
          {page > 1 && (
            <Link
              href={(() => {
                const params = new URLSearchParams();
                Object.entries(filters).forEach(([key, value]) => {
                  if (value && key !== "page") {
                    params.set(key, value);
                  }
                });
                params.set("page", (page - 1).toString());
                return `/catalog/${category}?${params.toString()}`;
              })()}
              className="group px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border-2 bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-300 hover:from-gray-900 hover:to-gray-800 hover:text-white hover:border-gray-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}

          {/* Helper function to create page link */}
          {(() => {
            const createPageLink = (pageNum: number) => {
              const params = new URLSearchParams();
              Object.entries(filters).forEach(([key, value]) => {
                if (value && key !== "page") {
                  params.set(key, value);
                }
              });
              params.set("page", pageNum.toString());
              return `/catalog/${category}?${params.toString()}`;
            };

            const getPageClassName = (pageNum: number) => {
              return `min-w-[36px] sm:min-w-[48px] px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border-2 text-sm sm:text-base font-bold transition-all duration-300 transform ${
                page === pageNum
                  ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-gray-900 shadow-xl scale-110 ring-2 ring-gray-400 ring-offset-2"
                  : "bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-300 hover:from-gray-900 hover:to-gray-800 hover:text-white hover:border-gray-900 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
              }`;
            };

            const pages: (number | string)[] = [];

            // Always show first 3 pages
            for (let i = 1; i <= Math.min(3, totalPages); i++) {
              pages.push(i);
            }

            // If there are more than 3 pages, show ellipsis and handle current/last page
            if (totalPages > 3) {
              // Show current page if it's not in the first 3 and not the last page
              if (page > 3 && page < totalPages) {
                if (page > 4) {
                  pages.push("...");
                }
                // Only add current page if it's not already in the array
                if (!pages.includes(page)) {
                  pages.push(page);
                }
              }

              // Show last page if it's not already shown
              if (totalPages > 3 && !pages.includes(totalPages)) {
                if (page < totalPages - 2 && !pages.includes("...")) {
                  pages.push("...");
                } else if (page === totalPages - 2 && !pages.includes("...")) {
                  pages.push("...");
                }
                pages.push(totalPages);
              }
            }

            return pages.map((item, idx) => {
              if (item === "...") {
                return (
                  <span key={`ellipsis-${idx}`} className="px-2 sm:px-4 py-2 sm:py-3 text-gray-400 font-black text-base sm:text-xl select-none">
                    •••
                  </span>
                );
              }

              const pageNum = item as number;
              return (
                <Link
                  key={pageNum}
                  href={createPageLink(pageNum)}
                  className={getPageClassName(pageNum)}
                >
                  {pageNum}
                </Link>
              );
            });
          })()}

          {/* Next button */}
          {page < totalPages && (
            <Link
              href={(() => {
                const params = new URLSearchParams();
                Object.entries(filters).forEach(([key, value]) => {
                  if (value && key !== "page") {
                    params.set(key, value);
                  }
                });
                params.set("page", (page + 1).toString());
                return `/catalog/${category}?${params.toString()}`;
              })()}
              className="group px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border-2 bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-300 hover:from-gray-900 hover:to-gray-800 hover:text-white hover:border-gray-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
        </section>
      )}
    </div>
  );
}
