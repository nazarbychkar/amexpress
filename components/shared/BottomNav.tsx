"use client";

import Link from "next/link";
import { FiHome, FiSearch, FiHeart, FiGrid } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    // If the current path matches the link's path, set the active color.
    return pathname === path
      ? "flex flex-col items-center text-sm text-blue-500 transition-transform transform hover:scale-110"
      : "flex flex-col items-center text-sm text-gray-100 hover:text-gray-400 transition-transform transform hover:scale-110";
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-gray-800 to-gray-700 text-white z-50 border-t border-gray-800 shadow-lg rounded-t-3xl">
      <div className="max-w-md mx-auto flex justify-around items-center py-3">
        <Link href="/" className={getLinkClass("/")}>
          <FiHome className="text-2xl mb-1 transition-all" />
          <span>Головна</span>
        </Link>

        <Link href="/catalog" className={getLinkClass("/catalog")}>
          <FiGrid className="text-2xl mb-1 transition-all" />
          <span>Каталог</span>
        </Link>

        <Link href="/search" className={getLinkClass("/search")}>
          <FiSearch className="text-2xl mb-1 transition-all" />
          <span>Пошук</span>
        </Link>

        <Link href="/favorites" className={getLinkClass("/favorites")}>
          <FiHeart className="text-2xl mb-1 transition-all" />
          <span>Обране</span>
        </Link>
      </div>
    </nav>
  );
}
