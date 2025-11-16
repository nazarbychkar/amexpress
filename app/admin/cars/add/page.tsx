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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear error when user starts typing
  };

  const handleGenerateNewUid = () => {
    setFormData({ ...formData, tildaUid: generateTildaUID() });
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Validate tildaUid
    if (!formData.tildaUid || formData.tildaUid.trim() === "") {
      setErrorMessage("Будь ласка, згенеруйте tildaUid");
      setIsSubmitting(false);
      return;
    }

    try {
    const response = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

      const result = await response.json();

    if (response.ok) {
        alert("Автомобіль успішно додано!");
        // Reset form and generate new tildaUid
      setFormData({
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
    } else {
        // If it's a duplicate tildaUid error, suggest regenerating
        if (result.code === "P2002" || response.status === 409) {
          setErrorMessage(result.message || "Такий tildaUid вже існує. Будь ласка, згенеруйте новий.");
        } else {
          setErrorMessage(result.message || "Помилка при додаванні автомобіля");
        }
      }
    } catch (error) {
      setErrorMessage("Помилка підключення до сервера");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Додати новий автомобіль
      </h1>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
              {key === "tildaUid" && (
                <button
                  type="button"
                  onClick={handleGenerateNewUid}
                  className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded transition-colors"
                >
                  Згенерувати новий
                </button>
              )}
            </div>
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
                  <span className="text-xs text-gray-400 mb-1">
                    декілька фото-посиланнь додавайте через пробіл
                  </span>
                )}
                <input
                  type="text"
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Додавання..." : "Додати автомобіль"}
        </button>
      </form>
    </div>
  );
}
