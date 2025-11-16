"use client";

import { useState } from "react";

// Function to infer car type based on certain characteristics
const inferCarType = (car: any) => {
  if (car.category.toLowerCase().includes("suv")) {
    return "SUV";
  } else if (car.engineType.toLowerCase().includes("electric")) {
    return "Electric";
  } else if (car.engineType.toLowerCase().includes("v8") || car.enginePower > 300) {
    return "Sports";
  }
  return "Sedan"; // Default fallback
};

export default function DropdownCar({ car }: { car: any }) {
  // State for toggling the entire "Characteristics" section
  const [expanded, setExpanded] = useState(false);

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  // Infer car type based on some logic
  const carType = inferCarType(car);

  return (
    <div className="space-y-4">
      {/* Dropdown Toggle for Characteristics */}
      <div
        className="flex justify-between items-center cursor-pointer text-lg text-gray-700 p-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
        onClick={toggleDropdown}
      >
        <span className="font-semibold">Характеристики</span>
        <span className="text-blue-600">
          {expanded ? "Сховати" : "Показати"}
        </span>
      </div>

      {/* Collapsible Characteristics Content */}
      {expanded && (
        <div className="mt-2 px-4 py-4 text-gray-600 bg-gray-50 rounded-md shadow-inner">
          <div className="space-y-3">
            {[ 
              { label: "Тип авто", value: carType },
              { label: "Бренд", value: car.brand },
              { label: "Марка", value: car.mark },
              { label: "Категорія", value: car.category },
              { label: "SKU", value: car.sku },
              { label: "Тип двигуна", value: car.engineType },
              { label: "Об'єм двигуна", value: `${car.engineVolume} Л` },
              { label: "Трансмісія", value: car.transmission },
              { label: "Тип приводу", value: car.driveType },
              { label: "Рік", value: car.year },
              { label: "Потужність двигуна", value: `${car.enginePower} к.с.` },
              { label: "Пробіг", value: `${car.mileage.toLocaleString()} км` },
              { label: "Вага", value: `${car.weight} кг` },
              {
                label: "Розміри",
                value: `${car.length}×${car.width}×${car.height} м`,
              },
              { label: "Країна виробник", value: car.countryOfOrigin },
              car.editions && { label: "Видання", value: car.editions },
              car.modifications && { label: "Модифікації", value: car.modifications },
              { label: "Ціна (USD)", value: `$${car.priceUSD.toLocaleString()}` },
            ]
              .filter(Boolean)
              .map((field, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-semibold">{field.label}:</span>
                  <span className="text-gray-700">{field.value}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
