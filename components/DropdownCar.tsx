"use client";

// Function to infer car type based on certain characteristics
const inferCarType = (car: any) => {
  if (car.category?.toLowerCase().includes("suv")) {
    return "SUV";
  } else if (car.engineType?.toLowerCase().includes("electric")) {
    return "Electric";
  } else if (car.engineType?.toLowerCase().includes("v8") || car.enginePower > 300) {
    return "Sports";
  }
  return "Sedan"; // Default fallback
};

export default function DropdownCar({ car }: { car: any }) {
  // Infer car type based on some logic
  const carType = inferCarType(car);

  const characteristics = [
              { label: "Тип авто", value: carType },
              { label: "Бренд", value: car.brand },
              { label: "Марка", value: car.mark },
              { label: "Категорія", value: car.category },
              { label: "SKU", value: car.sku },
              { label: "Тип двигуна", value: car.engineType },
    { label: "Об'єм двигуна", value: car.engineVolume ? `${car.engineVolume} Л` : null },
              { label: "Трансмісія", value: car.transmission },
              { label: "Тип приводу", value: car.driveType },
              { label: "Рік", value: car.year },
    { label: "Потужність двигуна", value: car.enginePower ? `${car.enginePower} к.с.` : null },
    { label: "Пробіг", value: car.mileage ? `${car.mileage.toLocaleString()} км` : null },
    { label: "Вага", value: car.weight ? `${car.weight} кг` : null },
              {
                label: "Розміри",
      value: car.length && car.width && car.height 
        ? `${car.length}×${car.width}×${car.height} м` 
        : null,
              },
              { label: "Країна виробник", value: car.countryOfOrigin },
              car.editions && { label: "Видання", value: car.editions },
              car.modifications && { label: "Модифікації", value: car.modifications },
  ].filter((field) => field && field.value);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">Характеристики</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {characteristics.map((field, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-100 last:border-0"
            >
              <span className="text-sm font-semibold text-gray-600">{field.label}:</span>
              <span className="text-base font-medium text-gray-900">{field.value}</span>
                </div>
              ))}
          </div>
        </div>
    </div>
  );
}
