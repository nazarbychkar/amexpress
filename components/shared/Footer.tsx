import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-100 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Контакти */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Контакти</h3>
          <p>
            <span className="font-medium">Телефон:</span>
            <br />
            +380 ХХ ХХХ ХХ ХХ
          </p>
          <p className="mt-2">
            <span className="font-medium">Email:</span>
            <br />
            example@email.com
          </p>
          <p className="mt-2">
            <span className="font-medium">Адреса:</span>
            <br />
            Одеса, Фонтанська дор. 6а
          </p>
        </div>

        {/* Соціальні мережі */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Соціальні мережі</h3>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-gray-400 transition">
              Instagram
            </Link>
            <Link href="#" className="hover:text-gray-400 transition">
              Telegram
            </Link>
            <Link href="#" className="hover:text-gray-400 transition">
              Facebook
            </Link>
          </div>
        </div>

        {/* Посилання */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Інформація</h3>
          <ul className="flex gap-5">
            <li>
              <Link href="#" className="hover:text-gray-400 transition">
                Оплата
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400 transition">
                Доставка
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400 transition">
                Оферта
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Нижня лінія */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MyWebsite. Усі права захищені.
      </div>
    </footer>
  );
}
