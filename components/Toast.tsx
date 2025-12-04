"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "info";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div
        className={`px-6 py-4 rounded-2xl shadow-strong backdrop-blur-md ${
          type === "success"
            ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
            : "bg-gradient-to-r from-blue-800 to-blue-900 text-white"
        } flex items-center gap-3 animate-slide-up`}
      >
        {type === "success" ? (
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span className="font-semibold text-sm sm:text-base">{message}</span>
      </div>
    </div>
  );
}

