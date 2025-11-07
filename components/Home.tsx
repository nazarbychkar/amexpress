// app/page.js
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* --- Акція / Знижки --- */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <Link href="/sales" className="block group">
          <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/sale-banner.jpg" // <-- replace with your actual image
              alt="Акція, Знижки"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-3xl font-semibold">
                Акція, Знижки
              </h2>
            </div>
          </div>
        </Link>
      </section>

      {/* --- Всі товари --- */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Всі товари
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Example placeholders */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow hover:shadow-md p-4 flex flex-col items-center"
            >
              <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
              <p className="text-gray-700 font-medium text-sm text-center">
                Товар {i + 1}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Топ товари --- */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Топ товари
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow hover:shadow-md p-4 flex flex-col items-center"
            >
              <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
              <p className="text-gray-700 font-medium text-sm text-center">
                Топ товар {i + 1}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
