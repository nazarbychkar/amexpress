export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
          Доставка
        </h1>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Варіанти доставки</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-gray-900">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🚢 Доставка з США</h3>
                <p className="text-gray-700 mb-3">
                  Автомобілі доставляються з США морським транспортом до портів України. 
                  Термін доставки залежить від обраного автомобіля та порту відправлення.
                </p>
                <p className="text-sm text-gray-600">
                  Середній термін: 30-60 днів
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-gray-900">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🚛 Доставка по Україні</h3>
                <p className="text-gray-700 mb-3">
                  Доставка автомобіля до вашого міста або найближчого відділення. 
                  Вартість та терміни доставки розраховуються індивідуально.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-gray-900">
                <h3 className="text-xl font-bold text-gray-900 mb-2">📍 Самовивіз</h3>
                <p className="text-gray-700">
                  Можливість забрати автомобіль самостійно з нашого офісу в Одесі 
                  (Фонтанська дор. 6а) після повної оплати та оформлення документів.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Етапи доставки</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Оформлення замовлення</h3>
                  <p className="text-gray-700">Ви обираєте автомобіль та оформлюєте замовлення</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Оплата</h3>
                  <p className="text-gray-700">Здійснюється передоплата згідно з умовами</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Доставка</h3>
                  <p className="text-gray-700">Автомобіль доставляється до вказаного місця</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Отримання</h3>
                  <p className="text-gray-700">Перевірка автомобіля та остаточна оплата</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6">
            <p className="text-gray-700">
              <strong>Увага:</strong> Для розрахунку точної вартості та термінів доставки, 
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

