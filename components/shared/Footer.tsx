"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("38")) {
      return `+38${digits.slice(2, 12)}`;
    } else if (digits.startsWith("0")) {
      return `+38${digits.slice(1, 11)}`;
    } else if (digits.length > 0) {
      return `+38${digits.slice(0, 10)}`;
    }
    return "+38";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          message: message || null,
          formType: "contact",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Помилка відправки даних");
      }

      setSubmitted(true);
      setTimeout(() => {
        setName("");
        setPhone("");
        setMessage("");
        setSubmitted(false);
        setIsModalOpen(false);
      }, 2000);
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      const errorMessage = err instanceof Error ? err.message : "Помилка відправки даних. Спробуйте ще раз.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="relative bg-gray-50 text-gray-900 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* Ліва колонка - Логотипи та посилання */}
          <div className="space-y-6">
            {/* Логотипи */}
            <div className="space-y-4">
              {/* AMERICAN EXPRESS Logo */}
              <div className="flex items-center min-h-[60px]">
                <a
                  href="https://americanexpress.od.ua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo1199.svg"
                    alt="American Express"
                    width="200"
                    height="60"
                    className="max-w-[200px] h-auto"
                    style={{ display: 'block', maxWidth: '200px', height: 'auto' }}
                  />
                </a>
              </div>
              
              {/* Copart and IAA Logos in one row */}
              <div className="flex items-center gap-4">
                <Image
                  src="/copart-logo.webp"
                  alt="Copart"
                  width={158}
                  height={40}
                  className="h-auto w-auto max-w-[158px]"
                />
                <Image
                  src="/iaa-logo.webp"
                  alt="IAA"
                  width={122}
                  height={40}
                  className="h-auto w-auto max-w-[122px]"
                />
              </div>
            </div>
            
            {/* Посилання */}
            <div className="space-y-2 pt-4">
              <Link
                href="/terms"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm block"
              >
                Політика конфіденційності
              </Link>
              <Link
                href="/terms"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm block"
              >
                Публічна офферта
              </Link>
            </div>
          </div>

          {/* Центральна колонка - Навігація */}
          <div className="grid grid-cols-2 gap-6">
            {/* Верхня колонка */}
            <div className="space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm block"
              >
                Головна
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm block"
              >
                Запитання та відповіді
              </Link>
            </div>
            
            {/* Нижня колонка */}
            <div className="space-y-3">
              <Link
                href="/leasing"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm block"
              >
                Лізінг
              </Link>
              <Link
                href="/credit"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm block"
              >
                Авто в кредит
              </Link>
            </div>
          </div>

          {/* Права колонка - Контакти та соціальні мережі */}
          <div className="space-y-6">
            {/* Соціальні мережі */}
            <div className="flex gap-3">
              {/* Telegram */}
              <a
                href="https://t.me/+GU9D7fommmc4Nzgy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-blue-900 transition-colors"
                title="Telegram"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>

              {/* Viber */}
              <a
                href="viber://chat?number=+380732683634"
                className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors"
                title="Viber"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.5 0C5.8 0 .3 4.8.1 11.4c0 1.2.2 2.4.5 3.5L0 24l9.3-2.4c1 .3 2.1.4 3.2.4 6.7 0 12.2-4.8 12.4-11.4C25.2 4.8 19.7 0 12.5 0zm.1 19.6c-.8 0-1.6-.1-2.4-.3l-2.8-.7-2.9.8.8-3-.6-2.8c-.3-1-.4-2-.4-3 0-5.5 4.8-10 10.7-10s10.7 4.5 10.7 10-4.8 10-10.9 10zm5.8-7.4l-2.9-.8-1.5 1.5-3.2-1 5.5-5.1-2.9-.8-6.3 5.8 3.2 1 1.5-1.5 2.9.8 1.1 1.1.2 2.8 2.8-2.8z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@americanexpress_auto?si=s68UtpwhG5AxUQOH"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                title="YouTube"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/american_expressodessa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                title="Instagram"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@aamexpressod"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                title="TikTok"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.07 6.07 0 0 0-1-.08A6.1 6.1 0 0 0 5 20.1a6.1 6.1 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>

            {/* Контактна інформація */}
            <div className="space-y-2 text-sm">
              <a
                href="https://www.google.com/maps/place/AmercanExpress/@46.4454857,30.7402532,17.6z/data=!4m6!3m5!1s0x8fbf5be7ef069fc9:0x1696f203ce2dc300!8m2!3d46.4455232!4d30.7410758!16s%2Fg%2F11y3zwkkkr?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-950 transition-colors block"
              >
                м. Одеса, Фонтанська дорога 6, офіс 20
              </a>
              <a
                href="tel:+380732683534"
                className="text-gray-700 hover:text-gray-900 transition-colors block"
              >
                +380 (73) 268-35-34
              </a>
              <a
                href="mailto:americanexpress965@gmail.com"
                className="text-gray-700 hover:text-gray-900 transition-colors block"
              >
                americanexpress965@gmail.com
              </a>
            </div>

            {/* Кнопка зв'язку */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors uppercase text-sm"
            >
              Зв&apos;язатися з нами
            </button>
          </div>
        </div>

        {/* Нижня лінія */}
        <div className="border-t border-gray-200 pt-6 mt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} American Express. Всі права захищені.
          </p>
        </div>
      </div>

      {/* Модальне вікно контактів */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl relative animate-slide-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Зв&apos;язатися з нами
              </h2>

              {/* Telegram Link */}
              <a
                href="https://t.me/MykhailoAmericanExpress"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full mb-6 px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-xl hover:from-blue-900 hover:to-blue-950 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <span>Написати менеджеру в Telegram</span>
              </a>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">або</span>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
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
                  </div>
                  <p className="text-green-600 font-semibold text-lg">
                    Дані успішно надіслані!
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Ми зв&apos;яжемося з вами найближчим часом
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ім&apos;я
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Ваше ім&apos;я"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      placeholder="+38 (XXX) XXX-XX-XX"
                      maxLength={13}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Формат: +38XXXXXXXXX</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Повідомлення (необов&apos;язково)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ваше повідомлення"
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-950 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {loading ? "Відправка..." : "Надіслати"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
