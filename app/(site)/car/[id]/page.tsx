import ImageCarousel from "@/components/ImageCarousel";
import { prisma } from "@/lib/db";
import Link from "next/link";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: { id: parseInt(id) },
  });

  if (!car) {
    return <div className="p-4 text-center text-red-500">Car not found</div>;
  }

  // If multiple photos, split by comma
  const photos = car.photo?.split(" ");

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Image Carousel */}
      {photos.length > 0 && <ImageCarousel photos={photos} title={car.title} />}

      {/* Car Info */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{car.title}</h1>
        <p className="text-lg text-gray-600">{car.description}</p>
        <p className="mt-2 text-xl text-green-600 font-semibold">
          ${car.price.toLocaleString()}
          {car.priceOld && (
            <span className="line-through text-gray-400 ml-2">
              ${car.priceOld.toLocaleString()}
            </span>
          )}
        </p>
      </div>

      {/* Characteristics */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Characteristics
        </h2>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Brand:</span> {car.brand}
          </div>
          <div>
            <span className="font-semibold">Mark:</span> {car.mark}
          </div>
          <div>
            <span className="font-semibold">Category:</span> {car.category}
          </div>
          <div>
            <span className="font-semibold">SKU:</span> {car.sku}
          </div>
          <div>
            <span className="font-semibold">Engine Type:</span> {car.engineType}
          </div>
          <div>
            <span className="font-semibold">Engine Volume:</span>{" "}
            {car.engineVolume} L
          </div>
          <div>
            <span className="font-semibold">Transmission:</span>{" "}
            {car.transmission}
          </div>
          <div>
            <span className="font-semibold">Drive Type:</span> {car.driveType}
          </div>
          <div>
            <span className="font-semibold">Year:</span> {car.year}
          </div>
          <div>
            <span className="font-semibold">Engine Power:</span>{" "}
            {car.enginePower} HP
          </div>
          <div>
            <span className="font-semibold">Mileage:</span>{" "}
            {car.mileage.toLocaleString()} km
          </div>
          <div>
            <span className="font-semibold">Weight:</span> {car.weight} kg
          </div>
          <div>
            <span className="font-semibold">Dimensions:</span> {car.length}×
            {car.width}×{car.height} m
          </div>
          <div>
            <span className="font-semibold">Country:</span>{" "}
            {car.countryOfOrigin}
          </div>
          {car.editions && (
            <div>
              <span className="font-semibold">Editions:</span> {car.editions}
            </div>
          )}
          {car.modifications && (
            <div>
              <span className="font-semibold">Modifications:</span>{" "}
              {car.modifications}
            </div>
          )}
          {/* {car.externalId && (
            <div>
              <span className="font-semibold">External ID:</span>{" "}
              {car.externalId}
            </div>
          )} */}
          {/* {car.parentUid && (
            <div>
              <span className="font-semibold">Parent UID:</span> {car.parentUid}
            </div>
          )} */}
          <div>
            <span className="font-semibold">Price USD:</span> $
            {car.priceUSD.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <div className="flex justify-center">
        <Link
          href="/order"
          className="px-20 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Замовити
        </Link>
      </div>
    </div>
  );
}
