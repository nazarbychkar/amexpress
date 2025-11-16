"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path
      ? "flex flex-col items-center text-sm text-white font-semibold transition-transform transform hover:scale-110"
      : "flex flex-col items-center text-sm text-gray-400 hover:text-gray-300 transition-transform transform hover:scale-110";
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-black text-white z-50 border-t border-gray-900 shadow-lg rounded-t-3xl">
      <div className="max-w-md mx-auto flex justify-around items-center py-3">
        <Link href="/" className={getLinkClass("/")}>
          <svg
            className="w-7 h-7 mb-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span>Головна</span>
        </Link>

        <Link href="/catalog" className={getLinkClass("/catalog")}>
          <svg
            className="w-7 h-7 mb-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span>Каталог</span>
        </Link>

        <Link href="/search" className={getLinkClass("/search")}>
          <svg
            className="w-7 h-7 mb-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span>Пошук</span>
        </Link>

        <Link href="/favorites" className={getLinkClass("/favorites")}>
          <svg
            className="w-7 h-7 mb-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>Обране</span>
        </Link>
      </div>
    </nav>
  );
}

