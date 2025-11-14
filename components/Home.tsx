// app/page.js
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export default async function HomePage() {
  // Fetch all cars
  const allCars = await prisma.car.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      photo: true,
      category: true,
    },
  });

  // Shuffle and take 10 random cars
  const shuffledCars = allCars.sort(() => 0.5 - Math.random());
  const randomCars = shuffledCars.slice(0, 10);

  // Pick top 4 cars (for example top by newest)
  const topCars = allCars
    .sort(
      (
        a: { createdAt: string | number | Date },
        b: { createdAt: string | number | Date }
      ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* --- Акція / Знижки --- */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <Link href="/order" className="block group">
          <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/sale-banner.png"
              alt="Акція, Знижки"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-3xl font-semibold">
                Акція, Знижки
              </h2>
            </div> */}
          </div>
        </Link>
      </section>

      {/* --- Всі товари (10 random cars) --- */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Всі товари
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {randomCars.map(
            (car: {
              id: Key | null | undefined;
              photo: any;
              title:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              price:
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
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => (
              <Link
                href={`/car/${car.id}`}
                key={car.id}
                className="bg-white rounded-lg shadow hover:shadow-md p-4 flex flex-col items-center"
              >
                <div className="w-full h-32 relative mb-3">
                  <Image
                    src={car.photo?.split(" ")[0] || "/placeholder.png"}
                    alt={String(car.title)}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-gray-700 font-medium text-sm text-center">
                  {car.title}
                </p>
                <p className="text-gray-500 text-sm mt-1">{car.price} ₴</p>
              </Link>
            )
          )}
        </div>
      </section>

      {/* --- Топ товари --- */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Топ товари
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {topCars.map(
            (car: {
              id: Key | null | undefined;
              photo: string;
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
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              price:
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
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => (
              <Link
                href={`/car/${car.id}`}
                key={car.id}
                className="bg-white rounded-lg shadow hover:shadow-md p-4 flex flex-col items-center"
              >
                <div className="w-full h-32 relative mb-3">
                  <Image
                    src={car.photo?.split(" ")[0] || "/placeholder.png"}
                    alt={String(car.title)}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-gray-700 font-medium text-sm text-center">
                  {car.title}
                </p>
                <p className="text-gray-500 text-sm mt-1">{car.price} ₴</p>
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
}
