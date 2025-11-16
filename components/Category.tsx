import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import CategoryFilters from "./Filter";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const PAGE_SIZE = 12;

interface CategoryProps {
  category: string;
  page: number;
  filters?: Record<string, string | undefined>;
}

const CATEGORY_MAP: Record<string, string> = {
  Седани: "sedan",
  Позашляховики: "crosovers",
  Кросовери: "crosovers",
  Хетчбеки: "hatchback",
  Пiкапи: "pickup",
  Главная: "main",
};

const REVERSE_CATEGORY_MAP: Record<string, string[]> = Object.entries(
  CATEGORY_MAP
).reduce((acc, [ukr, slug]) => {
  if (!acc[slug]) acc[slug] = [];
  acc[slug].push(ukr);
  return acc;
}, {} as Record<string, string[]>);

export default async function Category({
  category,
  page,
  filters = {},
}: CategoryProps) {
  const skip = (page - 1) * PAGE_SIZE;

  // Build "where" filter for Prisma
  const where: any = {};

  // CATEGORY FILTER USING MAP
  if (category) {
    const dbCategories = REVERSE_CATEGORY_MAP[category];
    if (dbCategories?.length) {
      where.OR = dbCategories.map((ukr) => ({
        category: { contains: ukr, mode: "insensitive" },
      }));
    }
  }

  // Handle filters from URL
  const numericFields = [
    "price",
    "priceUSD",
    "quantity",
    "year",
    "mileage",
    "weight",
    "engineVolume",
    "enginePower",
    "length",
    "width",
    "height",
  ];

  const { priceMin, priceMax, ...restFilters } = filters;

  // Apply remaining filters (except price) to the "where" clause
  for (const key in restFilters) {
    const value = restFilters[key];
    if (!value) continue;

    if (numericFields.includes(key)) {
      const num = Number(value);
      if (!isNaN(num)) where[key] = num;
      continue;
    }

    where[key] = { contains: value, mode: "insensitive" };
  }

  // Price range filter (min and max price)
  if (priceMin || priceMax) {
    where.price = {}; // Initialize the price filter

    if (priceMin) where.price.gte = Number(priceMin); // Min price filter (gte)
    if (priceMax) where.price.lte = Number(priceMax); // Max price filter (lte)
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
    <div className="py-6 bg-gray-50">
      {/* Filters */}
      <CategoryFilters />

      {cars.length === 0 ? (
        <p className="text-gray-600 text-center font-medium">Немає автомобілів.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cars.map((car: { id: Key | null | undefined; photo: string; title: string; priceUSD: string }) => (
            <Link
              key={car.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group overflow-hidden"
              href={`/car/${car.id}`}
            >
              <div className="relative w-full h-48">
                <Image
                  src={car.photo?.split(" ")[0] || "/placeholder.png"}
                  alt={String(car.title)}
                  layout="fill"
                  className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{car.title}</h3>
                <p className="text-green-600 font-semibold text-lg">{car.priceUSD} $</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center flex-wrap gap-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i + 1}
              href={`/catalog/${category}/?page=${i + 1}`}
              className={`px-4 py-2 rounded-lg border text-lg font-semibold transition-all duration-300 ${
                page === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
