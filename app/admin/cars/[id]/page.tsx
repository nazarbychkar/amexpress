"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load car data
  useEffect(() => {
    if (!id) {
      setError("ID не знайдено");
      setLoading(false);
      return;
    }

    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/cars/${id}`);
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Не вдалося завантажити дані");
        }
        
        const data = await res.json();
        
        if (!data || !data.id) {
          throw new Error("Дані автомобіля не знайдено");
        }

        setFormData(data);
        setLoading(false);
      } catch (err: unknown) {
        console.error("Error loading car:", err);
        const errorMessage = err instanceof Error ? err.message : "Помилка завантаження даних";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      alert("ID не знайдено");
      return;
    }

    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Автомобіль успішно оновлено!");
        router.push("/admin/cars");
      } else {
        const error = await response.json();
        alert("Помилка: " + (error.error || error.message || "Невідома помилка"));
      }
    } catch (err: unknown) {
      console.error("Error updating car:", err);
      const errorMessage = err instanceof Error ? err.message : "Не вдалося оновити автомобіль";
      alert("Помилка: " + errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-900">Завантаження...</p>
        </div>
      </div>
    );
  }

  if (error || !formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-gray-900 mb-2">Помилка</p>
          <p className="text-gray-600 mb-6">{error || "Дані не знайдено"}</p>
          <button
            onClick={() => router.push("/admin/cars")}
            className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
          >
            Повернутися до списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Редагувати автомобіль
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData)
          .filter((key) => {
            // Exclude technical fields and price (use priceUSD instead)
            return !["id", "createdAt", "updatedAt", "price"].includes(key);
          })
          .map((key) => (
            <div key={key} className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>

              {key === "description" || key === "text" ? (
                <textarea
                  name={key}
                  value={String(formData[key] ?? "")}
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
                    value={String(formData[key] ?? "")}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </>
              )}
            </div>
          ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
