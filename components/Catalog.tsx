import { validCategories } from "@/constants/categories";
import Link from "next/link";
import { FaCarSide, FaTruckPickup, FaHome } from "react-icons/fa";
import { PiCarProfileLight } from "react-icons/pi"; // nice sedan/hatchback icon alternative

export default function Catalog() {
  // Category-to-icon mapping
  const categoryIcons = {
    sedan: <PiCarProfileLight className="h-8 w-8 text-gray-700" />,
    hatchback: <FaCarSide className="h-8 w-8 text-gray-700" />,
    pickup: <FaTruckPickup className="h-8 w-8 text-gray-700" />,
    crossovers: <FaHome className="h-8 w-8 text-gray-700" />,
    main: <FaHome className="h-8 w-8 text-gray-700" />,
  };

  return (
    <section className="min-h-screen bg-gray-50 px-8 py-12">
      <h1 className="text-4xl font-semibold text-center text-gray-900 mb-12">
        Виберіть категорію
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {validCategories.map((category) => (
          <Link key={category} href={`/catalog/${category}`} passHref>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-start space-x-4 transform hover:bg-gray-100">
              {/* Category Icon and Name in One Row */}
              <div className="flex items-center justify-center w-full space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0 transition-transform transform hover:scale-110">
                  {categoryIcons[category as keyof typeof categoryIcons] || (
                    <FaCarSide className="h-8 w-8 text-gray-700" />
                  )}
                </div>
                {/* Category Name */}
                <h2 className="text-xl font-semibold text-gray-800 capitalize transition-colors duration-300 hover:text-blue-600">
                  {category}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
