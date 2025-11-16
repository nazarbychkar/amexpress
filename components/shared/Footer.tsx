import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-800 to-gray-700 text-gray-100 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Контакти */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gradient">Контакти</h3>
          <p className="text-white">
            <span className="font-medium text-gray-300">Телефон:</span>
            <br />
            <a href="tel:+380732683634" className="hover:text-pink-500 transition-colors">
              +380732683634
            </a>
          </p>
          <p className="mt-3 text-white">
            <span className="font-medium text-gray-300">Email:</span>
            <br />
            <a href="mailto:americsnexpress965@hmail.com" className="hover:text-pink-500 transition-colors">
              americsnexpress965@hmail.com
            </a>
          </p>
          <p className="mt-3 text-white">
            <span className="font-medium text-gray-300">Адреса:</span>
            <br />
            Одеса, Фонтанська дор. 6а
          </p>
        </div>

        {/* Соціальні мережі */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gradient">Соціальні мережі</h3>
          <div className="flex space-x-6">
            <Link href="#" className="text-lg text-gray-300 hover:text-pink-500 transition-colors flex items-center">
              <span className="icon-instagram"></span> Instagram
            </Link>
            <Link href="#" className="text-lg text-gray-300 hover:text-pink-500 transition-colors flex items-center">
              <span className="icon-telegram"></span> Telegram
            </Link>
            <Link href="#" className="text-lg text-gray-300 hover:text-pink-500 transition-colors flex items-center">
              <span className="icon-facebook"></span> Facebook
            </Link>
          </div>
        </div>

        {/* Посилання */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gradient">Інформація</h3>
          <ul className="flex flex-wrap gap-5">
            <li>
              <Link href="#" className="text-lg text-gray-300 hover:text-pink-500 transition-colors">
                Оплата
              </Link>
            </li>
            <li>
              <Link href="#" className="text-lg text-gray-300 hover:text-pink-500 transition-colors">
                Доставка
              </Link>
            </li>
            <li>
              <Link href="#" className="text-lg text-gray-300 hover:text-pink-500 transition-colors">
                Оферта
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Нижня лінія */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MyWebsite. Усі права захищені.
      </div>
    </footer>
  );
}
