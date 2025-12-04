import { prisma } from "@/lib/db";
import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import DropdownCar from "@/components/DropdownCar";
import Order from "@/components/Order";
import { formatPrice } from "@/lib/price-format";
import FavoriteButton from "@/components/FavoriteButton";
import CarCard from "@/components/CarCard";
import CarViewTracker from "@/components/CarViewTracker";
import ShareButton from "@/components/ShareButton";
import ScrollToTop from "@/components/ScrollToTop";

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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-2">Авто не знайдено</p>
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 underline"
          >
            Повернутися на головну
          </Link>
        </div>
      </div>
    );
  }

  // If multiple photos, split by space
  const photos = car.photo?.split(" ").filter(Boolean) || [];

  // Fetch random cars (excluding the current car)
  const randomCars = await prisma.car.findMany({
    take: 4,
    where: {
      id: { not: car.id },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      priceUSD: true,
      photo: true,
      category: true,
    },
  });

  // Get category name in Ukrainian
  const getCategoryName = (category: string) => {
    const categoryMap: Record<string, string> = {
      sedan: "Седани",
      suv: "Позашляховики",
      crossover: "Кросовери",
      pickup: "Пікапи",
      main: "Головна",
    };
    return categoryMap[category.toLowerCase()] || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <CarViewTracker 
        car={{
          id: car.id,
          photo: car.photo,
          title: car.title,
          priceUSD: car.priceUSD,
        }}
      />
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        {/* Image Carousel with Favorite and Share */}
        {photos.length > 0 && (
          <div className="relative mb-6">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <FavoriteButton carId={car.id} />
              <ShareButton carId={car.id} title={car.title} />
            </div>
            <ImageCarousel photos={photos} title={car.title} />
          </div>
        )}

        {/* Car Title */}
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
          {car.title}
        </h1>

        {/* Price and Order Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          <div>
            <p
              className={`text-3xl md:text-4xl font-black mb-1 ${
                !car.priceUSD ||
                car.priceUSD === "0" ||
                car.priceUSD === "0.00"
                  ? "text-gray-500"
                  : "text-gray-900"
              }`}
            >
              {formatPrice(car.priceUSD)}
            </p>
            {car.priceUSD &&
              car.priceUSD !== "0" &&
              car.priceUSD !== "0.00" && (
                <p className="text-sm text-gray-500">Ціна в Україні</p>
              )}
            {car.priceOld && car.priceOld > 0 && (
              <p className="text-lg text-gray-400 line-through mt-1">
                {car.priceOld.toLocaleString("uk-UA")}$
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-3">
            <Order 
              carInfo={{
                id: car.id,
                title: car.title,
                brand: car.brand,
                mark: car.mark,
                year: car.year,
                priceUSD: car.priceUSD,
              }}
            />
            <a
              href="https://t.me/MykhailoAmericanExpress"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-gray-700 font-medium rounded-xl hover:bg-gray-100 border border-gray-300 hover:border-gray-400 transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span>Написати менеджеру</span>
            </a>
          </div>
      </div>

        {/* Car Description */}
        {car.text && (
          <div className="mb-8">
            <div
              className="text-base text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: car.text,
              }}
            />
          </div>
        )}

      {/* Characteristics */}
        <div className="mb-12">
        <DropdownCar car={car} />
      </div>

      {/* View Other Cars Section */}
        {randomCars.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">
          Переглянути інші авто
        </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {randomCars.map((randomCar: { id: number; title: string; priceUSD: string; photo: string | null; category: string | null }) => (
                <CarCard 
                key={randomCar.id}
                  car={{
                    id: randomCar.id,
                    photo: randomCar.photo,
                    title: randomCar.title,
                    priceUSD: randomCar.priceUSD,
                  }} 
                />
              ))}
            </div>
              </div>
          )}
      </div>
    </div>
  );
}
