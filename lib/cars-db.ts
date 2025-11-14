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

export async function upload_cars(
  workbook: XLSX.WorkBook,
  prisma: PrismaConnectorCars
) {
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const carsData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

  console.log(`Found ${carsData.length} rows`);

  for (const data of carsData) {
    try {
      await prisma.car.create({
        data: {
          tildaUid: String(data.tildaUid || ""),
          brand: String(data.brand || "Unknown"),
          sku: String(data.sku || ""),
          mark: String(data.mark || ""),
          category: String(data.category || ""),
          title: String(data.title || "No title"),
          description: String(data.description) ?? "",
          text: String(data.text) ?? "",
          photo: String(data.photo) ?? null,
          price: Number(data.price) || 0,
          quantity: Number(data.quantity ?? 0),
          priceOld: data.priceOld ? Number(data.priceOld) : null,
          editions: String(data.editions) ?? null,
          modifications: String(data.modifications) ?? null,
          externalId: String(data.externalId) ?? null,
          parentUid: String(data.parentUid) ?? null,
          engineType: String(data.engineType) ?? "",
          engineVolume: Number(data.engineVolume) || 0,
          transmission: String(data.transmission) ?? "",
          driveType: String(data.driveType) ?? "",
          year: Number(data.year) || 0,
          enginePower: Number(data.enginePower) || 0,
          priceUSD: Number(data.priceUSD) || 0,
          countryOfOrigin: String(data.countryOfOrigin) ?? "",
          mileage: Number(data.mileage) || 0,
          weight: Number(data.weight) || 0,
          length: Number(data.length) || 0,
          width: Number(data.width) || 0,
          height: Number(data.height) || 0,
        },
      });
    } catch (err) {
      console.error("Row insert error:", err);
    }
  }

  console.log("✅ Імпорт завершено!");
  await prisma.$disconnect();
}
