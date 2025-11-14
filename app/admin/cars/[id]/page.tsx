"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCarPage() {
  const router = useRouter();
  const { id } = useParams(); // /cars/edit/[id]

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>(null);

  // Load car data
  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`);
        const data = await res.json();

        setFormData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading car:", err);
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

    const response = await fetch(`/api/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Car updated successfully!");
      router.push("/cars"); // redirect to list
    } else {
      const error = await response.json();
      alert("Error: " + error.message);
    }
  };

  if (loading || !formData)
    return (
      <div className="text-center py-10 text-xl font-semibold">Loading...</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Редагувати автомобіль
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
                value={formData[key]}
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
                  value={formData[key] ?? ""}
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
