"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CatalogVisit {
  id: number;
  userId: number | null;
  phone: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  userAgent: string | null;
  ipAddress: string | null;
  visitedAt: string;
  createdAt: string;
  user?: {
    id: number;
    telegramId: bigint;
    username: string | null;
    firstName: string;
    lastName: string | null;
  } | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AnalyticsPage() {
  const [visits, setVisits] = useState<CatalogVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVisits(currentPage);
  }, [currentPage]);

  const fetchVisits = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics/catalog-visits?page=${page}&limit=50`);
      if (response.ok) {
        const data = await response.json();
        setVisits(data.visits);
        setPagination(data.pagination);
      } else {
        console.error("Failed to fetch visits");
      }
    } catch (error) {
      console.error("Error fetching visits:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  const getUserDisplayName = (visit: CatalogVisit) => {
    if (visit.user) {
      return `${visit.user.firstName} ${visit.user.lastName || ""}`.trim();
    }
    if (visit.firstName) {
      return `${visit.firstName} ${visit.lastName || ""}`.trim();
    }
    if (visit.username) {
      return `@${visit.username}`;
    }
    if (visit.phone) {
      return visit.phone;
    }
    return "Невідомий користувач";
  };

  const getUserIdentifier = (visit: CatalogVisit) => {
    if (visit.phone) {
      return visit.phone;
    }
    if (visit.username) {
      return `@${visit.username}`;
    }
    if (visit.user?.telegramId) {
      return `Telegram ID: ${visit.user.telegramId.toString()}`;
    }
    return "—";
  };

  if (loading && visits.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-6 md:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Аналітика відвідувань
              </h1>
              <p className="text-gray-600 mt-1">
                Відвідування каталогу: {pagination.total} записів
              </p>
            </div>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Назад
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Всього відвідувань</p>
              <p className="text-3xl font-bold text-gray-800">{pagination.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Унікальних користувачів</p>
              <p className="text-3xl font-bold text-gray-800">
                {new Set(visits.map((v) => v.phone || v.username || v.userId || v.id)).size}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <svg
                className="w-6 h-6 text-green-600"
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
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Сторінка</p>
              <p className="text-3xl font-bold text-gray-800">
                {pagination.page} / {pagination.totalPages}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Visits Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Користувач
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Телефон / Нік
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Час відвідування
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  IP адреса
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  User Agent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visits.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Немає відвідувань
                  </td>
                </tr>
              ) : (
                visits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getUserDisplayName(visit)}
                      </div>
                      {visit.user && (
                        <div className="text-xs text-gray-500">
                          ID: {visit.user.id}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getUserIdentifier(visit)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(visit.visitedAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 font-mono">
                        {visit.ipAddress || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-500 max-w-xs truncate">
                        {visit.userAgent || "—"}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Показано {(currentPage - 1) * pagination.limit + 1} -{" "}
              {Math.min(currentPage * pagination.limit, pagination.total)} з {pagination.total}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Попередня
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={currentPage === pagination.totalPages}
                className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Наступна
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

