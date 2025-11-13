import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export const revalidate = 0; // disable ISR (always fresh)
const PAGE_SIZE = 12;

interface CategoryProps {
  category: string;
  page: number;
}

// Map Ukrainian category names in the DB → internal slugs
const CATEGORY_MAP: Record<string, string> = {
  Седани: "sedan",
  Позашляховики: "crosovers",
  Кросовери: "crosovers",
  Хетчбеки: "hatchback",
  Пiкапи: "pickup",
  Главная: "main",
};

export default async function Category({ category, page }: CategoryProps) {
  const skip = (page - 1) * PAGE_SIZE;

  // Fetch all cars
  const allCars = await prisma.car.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      price: true,
      photo: true,
      category: true,
    },
  });

  // Normalize category field from DB (handle "Седани; Хетчбеки" etc.)
  const normalizeCategory = (raw: string | null) => {
    if (!raw) return [];
    return raw
      .split(/[;\/]+/) // split by ; or /
      .map((c) => c.trim())
      .filter(Boolean);
  };

  // Convert to consistent internal slug for filtering
  const normalizeToSlug = (raw: string): string[] => {
    return normalizeCategory(raw)
      .map((ukr) => CATEGORY_MAP[ukr] || "")
      .filter(Boolean);
  };

  // Filter cars by category (if provided)
  const filteredCars = category
    ? allCars.filter((car: { category: string }) =>
        normalizeToSlug(car.category || "").includes(category)
      )
    : allCars;

  // Paginate after filtering
  const totalCars = filteredCars.length;
  const totalPages = Math.ceil(totalCars / PAGE_SIZE);
  const pagedCars = filteredCars.slice(skip, skip + PAGE_SIZE);

  return (
    <div className="py-6">
      {/* <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Каталог автомобілів{" "}
        {category && <span className="text-blue-600">({category})</span>}
      </h1> */}

      {pagedCars.length === 0 ? (
        <p className="text-gray-600">Немає автомобілів.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {pagedCars.map(
            (car: {
              id: Key | null | undefined;
              photo: any;
              title:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              price:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => (
              <Link
                key={car.id}
                className="bg-white shadow rounded-lg overflow-hidden"
                href={`/car/${car.id}`}
              >
                <Image
                  src={car.photo?.split(" ")[0] || "/placeholder.png"}
                  alt={String(car.title)}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold truncate">
                    {car.title}
                  </h3>
                  <p className="text-green-600 font-bold mt-1">
                    {car.price} грн
                  </p>
                </div>
              </Link>
            )
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i + 1}
              href={`/catalog/${category}/?page=${i + 1}`}
              className={`px-3 py-1 rounded-md border ${
                page === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
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
