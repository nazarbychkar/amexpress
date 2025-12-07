import DeleteButton from "@/components/DeleteButton";
import { prisma } from "@/lib/db";
import Link from "next/link";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export const revalidate = 0; // disables ISR

const PAGE_SIZE = 15;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const page = Math.max(1, parseInt((await searchParams)?.page || "1", 10));
  const skip = (page - 1) * PAGE_SIZE;

  const [cars, totalCars] = await Promise.all([
    prisma.car.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.car.count(),
  ]);

  const totalPages = Math.ceil(totalCars / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Таблиця Автомобілів
      </h1>
            <p className="text-gray-600">Управління каталогом автомобілів</p>
          </div>
        </div>

        <Link
          href="/admin/cars/add"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg
            className="w-5 h-5"
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
          Додати автомобіль
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              {[
                "ID",
                "Brand",
                "Title",
                "priceUSD",
                "Year",
                "Created At",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map(
              (car: {
                id:
                  | boolean
                  | Key
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                brand:
                  | string
                  | number
                  | bigint
                  | boolean
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                title:
                  | string
                  | number
                  | bigint
                  | boolean
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                priceUSD:
                  | string
                  | number
                  | bigint
                  | boolean
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                year:
                  | string
                  | number
                  | bigint
                  | boolean
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                createdAt: string | number | Date;
              }) => (
                <tr
                  key={Number(car.id)}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {car.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {String(car.brand)}
                  </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                      {String(car.title)}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ${String(car.priceUSD)}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {String(car.year)}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(car.createdAt).toLocaleDateString("uk-UA")}
                  </td>

                  {/* ACTIONS */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                    <Link
                      href={`/admin/cars/${car.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
                    >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Редагувати
                    </Link>

                    <DeleteButton carId={Number(car.id)} />
                      </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/admin/cars?page=${i + 1}`}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              page === i + 1
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-400 hover:scale-105"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
