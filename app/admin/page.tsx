// app/admin/page.tsx
import ImageUpload from "@/components/ImageUpload";
import { prisma } from "@/lib/db";
import Link from "next/link";
import CarExcelUpload from "@/components/CarExcelUpload";
import DeleteAllCarsButton from "@/components/DeleteAllCarsButton";

export const revalidate = 0; // disables ISR

export default async function Admin() {
  const [totalUsers, totalCars] = await Promise.all([
    prisma.user.count(),
    prisma.car.count(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-blue-700 bg-clip-text text-transparent">
              Панель адміністратора
            </h1>
            <p className="text-gray-600 mt-1">Управління системою AutoPremium</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Users Card */}
          <Link
            href="/admin/users"
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Користувачі</h2>
            <p className="text-4xl font-bold text-gray-800 mb-4">{totalUsers}</p>
            <div className="flex items-center text-sm text-gray-900 font-medium">
              <span>Переглянути всіх</span>
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          </Link>

        {/* Cars Card */}
          <Link
            href="/admin/cars"
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
          >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Автомобілі</h2>
            <p className="text-4xl font-bold text-gray-800 mb-4">{totalCars}</p>
            <div className="flex items-center text-sm text-green-600 font-medium">
              <span>Переглянути всі</span>
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          </Link>

        {/* Statistics Card */}
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl shadow-lg border border-blue-700 overflow-hidden text-white">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-4 opacity-90">Статистика</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="opacity-80">Всього користувачів</span>
                <span className="text-2xl font-bold">{totalUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-80">Всього автомобілів</span>
                <span className="text-2xl font-bold">{totalCars}</span>
              </div>
              <div className="pt-3 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Середнє на користувача</span>
                  <span className="text-xl font-bold">
                    {(totalCars / Math.max(totalUsers, 1)).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Швидкі дії</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/cars/add"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 border border-gray-200 group"
            >
              <div className="p-3 bg-blue-800 rounded-lg group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Додати автомобіль</h3>
                <p className="text-sm text-gray-600">Створити новий запис вручну</p>
              </div>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 border border-gray-200 group"
            >
              <div className="p-3 bg-blue-800 rounded-lg group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Управління користувачами</h3>
                <p className="text-sm text-gray-600">Переглянути та редагувати</p>
              </div>
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-200 group"
            >
              <div className="p-3 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Управління категоріями</h3>
                <p className="text-sm text-gray-600">Додати фото для категорій</p>
              </div>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-200 group"
            >
              <div className="p-3 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Налаштування</h3>
                <p className="text-sm text-gray-600">Telegram Chat ID та інше</p>
              </div>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-purple-200 group"
            >
              <div className="p-3 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Аналітика відвідувань</h3>
                <p className="text-sm text-gray-600">Переглянути відвідування каталогу</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Dangerous Actions */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Небезпечні дії</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DeleteAllCarsButton />
          </div>
        </div>
      </div>

      {/* Excel Upload Section */}
      <CarExcelUpload />

      {/* Banner Upload Section */}
      <ImageUpload />
    </div>
  );
}
