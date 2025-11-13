"use client"

import Image from "next/image";
import { useState } from "react";

// Simple image carousel for mobile
export default function ImageCarousel({ photos, title }: { photos: string[], title: string }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="relative w-full h-64 mb-4">
      <Image
        src={photos[index].trim()}
        alt={`${title} photo ${index + 1}`}
        fill
        className="object-cover rounded-lg"
      />
      {photos.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-2 py-1 rounded"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-2 py-1 rounded"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
