import * as XLSX from "xlsx";

type PrismaConnectorCars = {
  car: {
    create: (arg0: {
      data: {
        tildaUid: string;
        brand: string; // default якщо пусто
        sku: string;
        mark: string;
        category: string;
        title: string;
        description: any;
        text: any;
        photo: any;
        price: number; // якщо NaN → 0
        quantity: number;
        priceOld: number | null;
        editions: any;
        modifications: any;
        externalId: any;
        parentUid: any;
        engineType: any;
        engineVolume: number;
        transmission: any;
        driveType: any;
        year: number;
        enginePower: number;
        priceUSD: number;
        countryOfOrigin: any;
        mileage: number;
        weight: number;
        length: number;
        width: number;
        height: number;
      };
    }) => any;
  };
  $disconnect: () => any;
};

export async function upload_cars(prisma: PrismaConnectorCars) {
  // 1️⃣ Зчитуємо файл
  const workbook = XLSX.readFile("cars.xlsx");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // 2️⃣ Конвертуємо у масив об’єктів
  const carsData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

  console.log(`Знайдено ${carsData.length} рядків у Excel`);

  // 3️⃣ Додаємо кожен запис у базу
  for (const data of carsData) {
    try {
      // Переконайся, що всі потрібні поля є
      await prisma.car.create({
        data: {
          tildaUid: String(data.tildaUid || ""),
          brand: String(data.brand || "Unknown"), // default якщо пусто
          sku: String(data.sku || ""),
          mark: String(data.mark || ""),
          category: String(data.category || ""),
          title: String(data.title || "No title"),
          description: data.description ?? "",
          text: data.text ?? "",
          photo: data.photo ?? null,
          price: Number(data.price) || 0, // якщо NaN → 0
          quantity: Number(data.quantity ?? 0),
          priceOld: data.priceOld ? Number(data.priceOld) : null,
          editions: data.editions ?? null,
          modifications: data.modifications ?? null,
          externalId: data.externalId ?? null,
          parentUid: data.parentUid ?? null,
          engineType: data.engineType ?? "",
          engineVolume: Number(data.engineVolume) || 0,
          transmission: data.transmission ?? "",
          driveType: data.driveType ?? "",
          year: Number(data.year) || 0,
          enginePower: Number(data.enginePower) || 0,
          priceUSD: Number(data.priceUSD) || 0,
          countryOfOrigin: data.countryOfOrigin ?? "",
          mileage: Number(data.mileage) || 0,
          weight: Number(data.weight) || 0,
          length: Number(data.length) || 0,
          width: Number(data.width) || 0,
          height: Number(data.height) || 0,
        },
      });
    } catch (err) {
      console.error("Помилка при додаванні запису:", err);
    }
  }

  console.log("✅ Імпорт завершено!");
  await prisma.$disconnect();
}
