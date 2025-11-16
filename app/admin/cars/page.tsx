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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Таблиця Автомобілі
      </h1>

      <div className="flex justify-center pb-5">
        <Link
          href="/admin/cars/add"
          className="bg-blue-500 text-white py-2 w-full text-center rounded hover:bg-blue-600 transition"
        >
          Додати автомобіль
        </Link>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
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
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
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
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
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
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
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
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
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
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
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
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 text-sm text-gray-600">{car.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {car.brand}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {car.title}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    ${car.priceUSD}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {car.year}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {new Date(car.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      href={`/admin/cars/${car.id}`}
                      className="px-3 py-1 rounded bg-yellow-500 text-white text-sm hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>

                    <DeleteButton carId={Number(car.id)} />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/admin/cars?page=${i + 1}`}
            className={`px-3 py-1 rounded-md border ${
              page === i + 1
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
