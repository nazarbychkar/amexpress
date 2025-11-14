// app/admin/page.tsx
import ImageUpload from "@/components/ImageUpload";
import { prisma } from "@/lib/db";
import Link from "next/link";
import CarExcelUpload from "@/components/CarExcelUpload";

export const revalidate = 0; // disables ISR

export default async function Admin() {
  const [totalUsers, totalCars] = await Promise.all([
    prisma.user.count(),
    prisma.car.count(),
  ]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-3xl font-bold mb-4">{totalUsers}</p>
          <Link
            href="/admin/users"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            View Users
          </Link>
        </div>

        {/* Cars Card */}
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Cars</h2>
          <p className="text-3xl font-bold mb-4">{totalCars}</p>
          <Link
            href="/admin/cars"
            className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            View Cars
          </Link>
        </div>

        {/* Example Statistics Card */}
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Statistics</h2>
          <ul className="text-gray-700">
            <li>Total Users: {totalUsers}</li>
            <li>Total Cars: {totalCars}</li>
            <li>
              Average Cars per User:{" "}
              {(totalCars / Math.max(totalUsers, 1)).toFixed(2)}
            </li>
          </ul>
        </div>
      </div>

      <CarExcelUpload />

      {/* <ImageUpload /> */}
    </div>
  );
}
