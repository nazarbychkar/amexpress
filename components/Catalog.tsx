// app/catalog/page.js
import { validCategories } from "@/constants/categories";
import Link from "next/link";
import { FaCarSide, FaTruckPickup, FaHome } from "react-icons/fa";
import { PiCarProfileLight } from "react-icons/pi"; // nice sedan/hatchback icon alternative

export default function Catalog() {
  // ✅ Category-to-icon mapping
  const categoryIcons = {
    sedan: <PiCarProfileLight className="h-8 w-8" />,
    hatchback: <FaCarSide className="h-8 w-8 " />,
    pickup: <FaTruckPickup className="h-8 w-8 " />,
    crossovers: <FaHome className="h-8 w-8 " />,
    main: <FaHome className="h-8 w-8 " />,
  };

  return (
    <section className="min-h-screen px-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Виберіть категорію:
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {validCategories.map((category) => (
          <Link key={category} href={`/${category}`} passHref>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer grid grid-cols-2 items-center">
              {/* ✅ Display icon */}
              <div className="">
                {categoryIcons[category as keyof typeof categoryIcons] || <FaCarSide className="h-8 w-8" />}
              </div>

              <h2 className="text-lg font-semibold capitalize text-left">
                {category}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
