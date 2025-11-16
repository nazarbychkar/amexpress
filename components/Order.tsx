"use client";

import { useState } from "react";

export default function Order() {
  // State for showing/hiding the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Name:", name, "Phone:", phone);
    setSubmitted(true);
    setName("");
    setPhone("");
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div
          className="px-32 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
          onClick={openModal}
        >
          Замовити
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ×
            </button>

            <h1 className="text-2xl font-semibold text-center mb-6">
              Форма для зв'язку
            </h1>

            {submitted && (
              <p className="text-green-600 text-center mb-4">
                Дані успішно надіслані!
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <label className="flex flex-col">
                Ім'я:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ваше ім'я"
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="flex flex-col">
                Телефон:
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Ваш телефон"
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Надіслати
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
