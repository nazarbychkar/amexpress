"use client";

import { useState } from "react";

function generateTildaUID(length = 20) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    uid += chars[randomIndex];
  }
  return uid;
}

console.log(generateTildaUID()); // Example: "6f55a7FarLjGes2N60yh"

export default function AddCarPage() {
  const [formData, setFormData] = useState({
    tildaUid: generateTildaUID(),
    brand: "",
    sku: "",
    mark: "",
    category: "",
    title: "",
    description: "",
    text: "",
    photo: "",
    price: "",
    quantity: "",
    priceOld: "",
    editions: "",
    modifications: "",
    externalId: "",
    parentUid: "",
    engineType: "",
    engineVolume: "",
    transmission: "",
    driveType: "",
    year: "",
    enginePower: "",
    priceUSD: "",
    countryOfOrigin: "",
    mileage: "",
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Car added successfully!");
      setFormData({
        tildaUid: "",
        brand: "",
        sku: "",
        mark: "",
        category: "",
        title: "",
        description: "",
        text: "",
        photo: "",
        price: "",
        quantity: "",
        priceOld: "",
        editions: "",
        modifications: "",
        externalId: "",
        parentUid: "",
        engineType: "",
        engineVolume: "",
        transmission: "",
        driveType: "",
        year: "",
        enginePower: "",
        priceUSD: "",
        countryOfOrigin: "",
        mileage: "",
        weight: "",
        length: "",
        width: "",
        height: "",
      });
    } else {
      const error = await response.json();
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Додати новий автомобіль{" "}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            {key === "description" || key === "text" ? (
              <textarea
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                rows={3}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <>
                {key === "photo" && (
                  <span className="text-xs text-gray-400">
                    декілька фото-посиланнь додавайте через пробіл
                  </span>
                )}
                <input
                  type="text"
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Car
        </button>
      </form>
    </div>
  );
}
