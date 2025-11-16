import { prisma } from "@/lib/db";
import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import DropdownCar from "@/components/DropdownCar";
import Order from "@/components/Order";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;

  // Fetch the main car details
  const car = await prisma.car.findUnique({
    where: { id: parseInt(id) },
  });

  if (!car) {
    return <div className="p-4 text-center text-red-500">Авто не знайдено</div>;
  }

  // If multiple photos, split by comma
  const photos = car.photo?.split(" ");

  // Fetch two random cars (excluding the current car)
  const randomCars = await prisma.car.findMany({
    take: 2,
    where: {
      id: { not: car.id }, // Exclude the current car
    },
    orderBy: {
      // This can be adjusted to any random order logic. For simplicity, we just use ID sorting here.
      id: "desc",
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Image Carousel */}
      {photos.length > 0 && <ImageCarousel photos={photos} title={car.title} />}

      {/* Car Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{car.title}</h1>
        <div
          className="text-lg text-gray-600 mt-4"
          dangerouslySetInnerHTML={{
            __html: `<strong>${car.title}</strong> — ${car.text}`,
          }}
        />
        <p className="mt-4 text-xl text-green-600 font-semibold">
          {car.priceUSD.toLocaleString()}$
          {car.priceOld && (
            <span className="line-through text-gray-400 ml-2">
              {car.priceOld.toLocaleString()}$
            </span>
          )}
        </p>
      </div>

      {/* Buy Button */}
      <Order />

      {/* Characteristics */}
      <div className="mb-8">
        <DropdownCar car={car} />
      </div>

      {/* View Other Cars Section */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Переглянути інші авто
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {randomCars.length > 0 ? (
            randomCars.map((randomCar: any) => (
              <div
                key={randomCar.id}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <ImageCarousel
                  photos={randomCar.photo.split(" ")}
                  title={randomCar.title}
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  {randomCar.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {randomCar.description}
                </p>
                <p className="text-xl text-green-600 mt-2">
                  {randomCar.priceUSD.toLocaleString()}$
                </p>
                <Link
                  href={`/car/${randomCar.id}`}
                  className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition duration-200"
                >
                  Переглянути
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">Завантаження...</div>
          )}
        </div>
      </div>
    </div>
  );
}
