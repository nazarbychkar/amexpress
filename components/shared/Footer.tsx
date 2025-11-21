import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-gray-900 via-gray-900 to-black text-gray-100 py-16 mt-20 overflow-hidden">
      {/* Декоративні елементи */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Контакти */}
          <div className="group">
            <h3 className="text-2xl font-black text-white mb-6 relative inline-block">
              <span className="relative z-10">Телефони для зв'язку</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-transparent rounded-full"></span>
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4 group/item">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 group-hover/item:from-white/20 group-hover/item:to-white/10 transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+380732683534"
                    className="text-gray-300 hover:text-white transition-all duration-300 font-semibold text-lg hover:translate-x-1 inline-block"
                  >
                    +380 (73) 268-35-34
                  </a>
                  <span className="text-gray-400 text-sm">Одеса</span>
                </div>
              </div>
              <div className="flex items-start gap-4 group/item">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 group-hover/item:from-white/20 group-hover/item:to-white/10 transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
                <span className="text-gray-300 text-sm leading-relaxed">Одеса, Фонтанська дор. 6а</span>
              </div>
            </div>
          </div>

          {/* Соціальні мережі */}
          <div>
            <h3 className="text-2xl font-black text-white mb-6 relative inline-block">
              <span className="relative z-10">Офіційні ресурси</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-transparent rounded-full"></span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {/* Telegram */}
              <a
                href="https://t.me/+GU9D7fommmc4Nzgy"
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex items-center justify-center w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:from-blue-500/90 hover:to-blue-600/90 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                title="Telegram"
              >
                <svg
                  className="w-7 h-7 text-white group-hover/social:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/american_expressodessa/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex items-center justify-center w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:from-purple-600/90 hover:via-pink-600/90 hover:to-orange-500/90 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl hover:shadow-pink-500/20"
                title="Instagram"
              >
                <svg
                  className="w-7 h-7 text-white group-hover/social:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@americanexpress_auto?si=s68UtpwhG5AxUQOH"
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex items-center justify-center w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:from-red-600/90 hover:to-red-700/90 hover:border-red-400/50 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl hover:shadow-red-500/20"
                title="YouTube"
              >
                <svg
                  className="w-7 h-7 text-white group-hover/social:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@aamexpressod"
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex items-center justify-center w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:from-black/90 hover:to-gray-800/90 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl hover:shadow-gray-500/20"
                title="TikTok"
              >
                <svg
                  className="w-7 h-7 text-white group-hover/social:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.07 6.07 0 0 0-1-.08A6.1 6.1 0 0 0 5 20.1a6.1 6.1 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>

              {/* Сайт */}
              <a
                href="https://americanexpress.od.ua/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex items-center justify-center w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:from-white/20 hover:to-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl hover:shadow-white/10"
                title="Сайт"
              >
                <svg
                  className="w-7 h-7 text-white group-hover/social:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </a>

              {/* Viber (placeholder) */}
              <div
                className="group/social flex items-center justify-center w-14 h-14 bg-gradient-to-br from-white/5 to-white/5 rounded-2xl border border-white/5 opacity-50 cursor-not-allowed"
                title="Viber (скоро)"
              >
                <svg
                  className="w-7 h-7 text-white/50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.5 0C5.8 0 .3 4.8.1 11.4c0 1.2.2 2.4.5 3.5L0 24l9.3-2.4c1 .3 2.1.4 3.2.4 6.7 0 12.2-4.8 12.4-11.4C25.2 4.8 19.7 0 12.5 0zm.1 19.6c-.8 0-1.6-.1-2.4-.3l-2.8-.7-2.9.8.8-3-.6-2.8c-.3-1-.4-2-.4-3 0-5.5 4.8-10 10.7-10s10.7 4.5 10.7 10-4.8 10-10.9 10zm5.8-7.4l-2.9-.8-1.5 1.5-3.2-1 5.5-5.1-2.9-.8-6.3 5.8 3.2 1 1.5-1.5 2.9.8 1.1 1.1.2 2.8 2.8-2.8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Інформація */}
          <div>
            <h3 className="text-2xl font-black text-white mb-6 relative inline-block">
              <span className="relative z-10">Інформація</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-transparent rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/info"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-3 group/link"
                >
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover/link:bg-white/60 transition-all duration-300 group-hover/link:scale-150"></div>
                  <span className="group-hover/link:translate-x-2 transition-transform duration-300">Інформація</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/payment"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-3 group/link"
                >
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover/link:bg-white/60 transition-all duration-300 group-hover/link:scale-150"></div>
                  <span className="group-hover/link:translate-x-2 transition-transform duration-300">Оплата</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-3 group/link"
                >
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover/link:bg-white/60 transition-all duration-300 group-hover/link:scale-150"></div>
                  <span className="group-hover/link:translate-x-2 transition-transform duration-300">Оферта</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Про компанію */}
          <div>
            <h3 className="text-2xl font-black text-white mb-6 relative inline-block">
              <span className="relative z-10">Про нас</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-transparent rounded-full"></span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Найбільша авто компанія в Україні. Працюємо з 2018 року. Більше 8000 відгуків від клієнтів.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gradient-to-br from-white/10 to-white/5 rounded-xl text-xs font-semibold text-white border border-white/10 hover:from-white/20 hover:to-white/10 transition-all duration-300">
                🏁 Тільки вигідні авто
              </span>
              <span className="px-4 py-2 bg-gradient-to-br from-white/10 to-white/5 rounded-xl text-xs font-semibold text-white border border-white/10 hover:from-white/20 hover:to-white/10 transition-all duration-300">
                💰 Авто за ціною нижче ринку
              </span>
            </div>
          </div>
        </div>

        {/* Нижня лінія */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} American Express. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
