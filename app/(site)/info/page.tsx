export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
          Інформація
        </h1>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Про компанію</h2>
            <p className="text-gray-700 leading-relaxed">
              American Express Auto — найбільша авто компанія в Україні, яка працює з 2018 року. 
              Ми спеціалізуємося на імпорті та продажу автомобілів з США, пропонуючи нашим клієнтам 
              тільки вигідні авто за ціною нижче ринку.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Наші переваги</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏁</span>
                <span>Тільки вигідні авто з перевіреною історією</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <span>Авто за ціною нижче ринку</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⭐</span>
                <span>Більше 8000 відгуків від задоволених клієнтів</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🚗</span>
                <span>Широкий вибір автомобілів різних марок та моделей</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔧</span>
                <span>Повна підтримка та консультації на всіх етапах</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Контакти</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Телефон:</strong> +38 067 939 57 02, +38 063 025 96 21, +38 066 876 13 83
              </p>
              <p>
                <strong>Email:</strong> americsnexpress965@hmail.com
              </p>
              <p>
                <strong>Адреса:</strong> Одеса, Фонтанська дор. 6а
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

