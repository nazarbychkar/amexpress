import Link from "next/link";
import { FiHome, FiSearch, FiHeart, FiGrid } from "react-icons/fi";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-700 text-gray-100 z-50 border-t border-gray-800">
      <div className="max-w-md mx-auto flex justify-around items-center py-3">
        <Link
          href="/"
          className="flex flex-col items-center text-sm hover:text-gray-400 transition"
        >
          <FiHome className="text-xl mb-1" />
          Головна
        </Link>

        <Link
          href="/catalog"
          className="flex flex-col items-center text-sm hover:text-gray-400 transition"
        >
          <FiGrid className="text-xl mb-1" />
          Каталог
        </Link>

        <Link
          href="/search"
          className="flex flex-col items-center text-sm hover:text-gray-400 transition"
        >
          <FiSearch className="text-xl mb-1" />
          Пошук
        </Link>

        <Link
          href="/favorites"
          className="flex flex-col items-center text-sm hover:text-gray-400 transition"
        >
          <FiHeart className="text-xl mb-1" />
          Обране
        </Link>
      </div>
    </nav>
  );
}
