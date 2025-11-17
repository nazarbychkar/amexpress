"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Category {
  name: string;
  image: string | null;
  description: string | null;
}

interface Categories {
  [key: string]: Category;
}

const CATEGORY_KEYS = ["sedan", "hatchback", "pickup", "crosovers", "suv", "main"];
const CATEGORY_NAMES: Record<string, string> = {
  sedan: "Седани",
  hatchback: "Хетчбеки",
  pickup: "Пікапи",
  crosovers: "Кросовери",
  suv: "Позашляховики",
  main: "Головна",
};

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Categories>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
      // Initialize descriptions state
      const descs: Record<string, string> = {};
      Object.keys(data).forEach((key) => {
        descs[key] = data[key].description || "";
      });
      setDescriptions(descs);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Помилка при завантаженні категорій");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (
    categoryKey: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Файл повинен бути зображенням");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Розмір файлу не повинен перевищувати 5MB");
      return;
    }

    setUploading(categoryKey);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("categoryKey", categoryKey);
    formData.append("image", file);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setCategories(data.categories);
        setSuccess(`Фото для ${CATEGORY_NAMES[categoryKey]} успішно завантажено!`);
        setTimeout(() => setSuccess(null), 3000);
        
        // Reset file input
        if (fileInputRefs.current[categoryKey]) {
          fileInputRefs.current[categoryKey]!.value = "";
        }
      } else {
        setError(data.message || "Помилка при завантаженні");
      }
    } catch (err: any) {
      setError("Помилка підключення до сервера");
    } finally {
      setUploading(null);
    }
  };

  const handleDescriptionChange = (categoryKey: string, value: string) => {
    setDescriptions((prev) => ({
      ...prev,
      [categoryKey]: value,
    }));
  };

  const handleSaveDescription = async (categoryKey: string) => {
    setSaving(categoryKey);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("categoryKey", categoryKey);
    formData.append("description", descriptions[categoryKey] || "");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setCategories(data.categories);
        setSuccess(`Опис для ${CATEGORY_NAMES[categoryKey]} успішно збережено!`);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || "Помилка при збереженні");
      }
    } catch (err: any) {
      setError("Помилка підключення до сервера");
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Завантаження...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Управління категоріями
            </h1>
            <p className="text-gray-600 mt-1">Додайте фото та описи для категорій</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-green-700 font-medium">{success}</p>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORY_KEYS.map((categoryKey) => {
          const category = categories[categoryKey] || {
            name: CATEGORY_NAMES[categoryKey],
            image: null,
          };

          return (
            <div
              key={categoryKey}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {category.name}
                </h3>

                {/* Current Image Preview */}
                {category.image && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Поточне фото:
                    </label>
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* File Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {category.image ? "Замінити фото" : "Додати фото"}
                  </label>
                  <input
                    ref={(el) => {
                      fileInputRefs.current[categoryKey] = el;
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(categoryKey, e)}
                    disabled={uploading === categoryKey}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Підтримуються формати: JPG, PNG, WebP. Максимальний розмір: 5MB
                  </p>
                </div>

                {/* Uploading Indicator */}
                {uploading === categoryKey && (
                  <div className="mt-4 flex items-center gap-2 text-gray-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-800"></div>
                    <span className="text-sm">Завантаження...</span>
                  </div>
                )}

                {/* Description Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Опис категорії:
                  </label>
                  <textarea
                    value={descriptions[categoryKey] || ""}
                    onChange={(e) => handleDescriptionChange(categoryKey, e.target.value)}
                    placeholder="Введіть опис категорії (для SEO та інформативності)..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none text-sm"
                  />
                  <p className="mt-2 text-xs text-gray-500 mb-3">
                    Опишіть категорію для покращення SEO та інформативності для користувачів
                  </p>
                  <button
                    onClick={() => handleSaveDescription(categoryKey)}
                    disabled={saving === categoryKey}
                    className="w-full px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {saving === categoryKey ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Збереження...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Зберегти опис</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

