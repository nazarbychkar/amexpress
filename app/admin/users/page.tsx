// app/admin/users/page.tsx
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

const PAGE_SIZE = 20; // number of users per page

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams; // unwrap the promise
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const skip = (page - 1) * PAGE_SIZE;

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Користувачі Telegram
        </h1>
        <div className="text-sm text-gray-600">
          Всього: <span className="font-bold text-gray-900">{totalUsers}</span>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Telegram ID",
                "Username",
                "First Name",
                "Last Name",
                "Language",
                "Is Bot",
                "Created At",
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
            {users.map(
              (user: {
                id:
                  | boolean
                  | Key
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
                telegramId:
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                username: any;
                firstName:
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                lastName: any;
                languageCode:
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                isBot: any;
                createdAt: string | number | Date;
              }) => (
                <tr
                  key={String(user.id)}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 text-sm text-gray-600">{user.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {user.telegramId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {user.username || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {user.firstName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {user.lastName || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {user.languageCode}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {user.isBot ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
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
            key={i + 1}
            href={`/admin/users?page=${i + 1}`}
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
