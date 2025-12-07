"use client";

import { useEffect } from "react";

interface CarViewTrackerProps {
  car: {
    id: number;
    photo: string | null;
    title: string;
    priceUSD: string | null;
  };
}

export default function CarViewTracker({ car }: CarViewTrackerProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && car) {
      const stored = localStorage.getItem("recentViewedCars");
      let recentCars = stored ? JSON.parse(stored) : [];
      
      // Remove if already exists
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recentCars = recentCars.filter((c: any) => Number(c.id) !== Number(car.id));
      // Add to beginning
      recentCars.unshift({
        id: car.id,
        photo: car.photo || "",
        title: car.title,
        priceUSD: car.priceUSD || "0",
      });
      // Keep only last 10
      recentCars = recentCars.slice(0, 10);
      
      localStorage.setItem("recentViewedCars", JSON.stringify(recentCars));
    }
  }, [car]);

  return null;
}

