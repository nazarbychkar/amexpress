import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black text-gray-100 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Контакти */}
          <div>
            <h3 className="text-xl font-black text-white mb-6">Контакти</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+380679395702"
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    +38 067 939 57 02
                  </a>
                  <a
                    href="tel:+380630259621"
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    +38 063 025 96 21
                  </a>
                  <a
                    href="tel:+380668761383"
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    +38 066 876 13 83
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:americsnexpress965@hmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  americsnexpress965@hmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-300">Одеса, Фонтанська дор. 6а</span>
              </div>
            </div>
          </div>

          {/* Соціальні мережі */}
          <div>
            <h3 className="text-xl font-black text-white mb-6">Соціальні мережі</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.instagram.com/americanexpress_auto/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-xl hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                title="Instagram"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/channel/UCXHF5nmVSDXAj7wURGu81Hw"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                title="YouTube"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="https://t.me/americanexpressauto"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-xl hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                title="Telegram"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>

              <a
                href="https://invite.viber.com/?g2=AQAPAlXL9dlJeUtEg3abCSIEAnaPuxyJ2Q5dv5%2BWlipK32XuDWS1PI7bG8EXYdBD"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-xl hover:bg-purple-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                title="Viber"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.5 0C5.8 0 .3 4.8.1 11.4c0 1.2.2 2.4.5 3.5L0 24l9.3-2.4c1 .3 2.1.4 3.2.4 6.7 0 12.2-4.8 12.4-11.4C25.2 4.8 19.7 0 12.5 0zm.1 19.6c-.8 0-1.6-.1-2.4-.3l-2.8-.7-2.9.8.8-3-.6-2.8c-.3-1-.4-2-.4-3 0-5.5 4.8-10 10.7-10s10.7 4.5 10.7 10-4.8 10-10.9 10zm5.8-7.4l-2.9-.8-1.5 1.5-3.2-1 5.5-5.1-2.9-.8-6.3 5.8 3.2 1 1.5-1.5 2.9.8 1.1 1.1.2 2.8 2.8-2.8z" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/americanexpressauto"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                title="Facebook"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Інформація */}
          <div>
            <h3 className="text-xl font-black text-white mb-6">Інформація</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/info"
                  className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2 group"
                >
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Інформація
                </Link>
              </li>
              <li>
                <Link
                  href="/payment"
                  className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2 group"
                >
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Оплата
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2 group"
                >
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Доставка
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2 group"
                >
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Оферта
                </Link>
              </li>
            </ul>
          </div>

          {/* Про компанію */}
          <div>
            <h3 className="text-xl font-black text-white mb-6">Про нас</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Найбільша авто компанія в Україні. Працюємо з 2018 року. Більше 8000 відгуків від клієнтів.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-800 rounded-lg text-xs font-semibold text-gray-300">
                🏁 Тільки вигідні авто
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-lg text-xs font-semibold text-gray-300">
                💰 Авто за ціною нижче ринку
              </span>
            </div>
          </div>
        </div>

        {/* Нижня лінія */}
        <div className="border-t border-gray-900 mt-12 pt-6 text-center">
          <p className="text-sm text-gray-400">
          </p>
        </div>
      </div>
    </footer>
  );
}
