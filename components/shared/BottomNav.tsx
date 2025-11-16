import Link from "next/link";
import { FiHome, FiSearch, FiHeart, FiGrid } from "react-icons/fi";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-gray-800 to-gray-700 text-white z-50 border-t border-gray-800 shadow-lg rounded-t-3xl">
      <div className="max-w-md mx-auto flex justify-around items-center py-3">
        <Link
          href="/"
          className="flex flex-col items-center text-sm text-gray-100 hover:text-gray-400 transition-transform transform hover:scale-110"
        >
          <FiHome className="text-2xl mb-1 hover:bg-gray-600 transition-all" />
          <span>Головна</span>
        </Link>

        <Link
          href="/catalog"
          className="flex flex-col items-center text-sm text-gray-100 hover:text-gray-400 transition-transform transform hover:scale-110"
        >
          <FiGrid className="text-2xl mb-1 hover:bg-gray-600 transition-all" />
          <span>Каталог</span>
        </Link>

        <Link
          href="/search"
          className="flex flex-col items-center text-sm text-gray-100 hover:text-gray-400 transition-transform transform hover:scale-110"
        >
          <FiSearch className="text-2xl mb-1 hover:bg-gray-600 transition-all" />
          <span>Пошук</span>
        </Link>

        <Link
          href="/favorites"
          className="flex flex-col items-center text-sm text-gray-100 hover:text-gray-400 transition-transform transform hover:scale-110"
        >
          <FiHeart className="text-2xl mb-1 hover:bg-gray-600 transition-all" />
          <span>Обране</span>
        </Link>
      </div>
    </nav>
  );
}
