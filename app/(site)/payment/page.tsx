export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
          Оплата
        </h1>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Способи оплати</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-gray-900">
                <h3 className="text-xl font-bold text-gray-900 mb-2">💳 Банківський переказ</h3>
                <p className="text-gray-700">
                  Оплата через банківський переказ на рахунок компанії. Реквізити надаються після 
                  оформлення замовлення.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-gray-900">
                <h3 className="text-xl font-bold text-gray-900 mb-2">💵 Готівка</h3>
                <p className="text-gray-700">
                  Оплата готівкою при отриманні автомобіля або в офісі компанії.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-gray-900">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🏦 Кредит/Розстрочка</h3>
                <p className="text-gray-700">
                  Можливість оформлення кредиту або розстрочки через банківських партнерів. 
                  Деталі уточнюйте у наших менеджерів.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Умови оплати</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold">•</span>
                <span>Передоплата залежить від обраного автомобіля та умов доставки</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold">•</span>
                <span>Остаточна оплата здійснюється після перевірки автомобіля</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold">•</span>
                <span>Всі платежі безпечні та захищені</span>
              </li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6">
            <p className="text-gray-700">
              <strong>Увага:</strong> Для отримання детальної інформації про оплату та реквізити, 
              зв'яжіться з нашими менеджерами за телефонами: 
              <a href="tel:+380679395702" className="text-gray-900 font-semibold hover:underline ml-1">
                +38 067 939 57 02
              </a>
              , 
              <a href="tel:+380630259621" className="text-gray-900 font-semibold hover:underline">
                +38 063 025 96 21
              </a>
              , 
              <a href="tel:+380668761383" className="text-gray-900 font-semibold hover:underline">
                +38 066 876 13 83
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

