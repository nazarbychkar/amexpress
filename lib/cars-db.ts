import * as XLSX from "xlsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaConnectorCars = {
  car: {
    upsert: (arg0: {
      where: { tildaUid: string };
      create: {
        tildaUid: string;
        brand: string;
        sku: string;
        mark: string;
        category: string;
        title: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        photo: any;
        price: number;
        quantity: number;
        priceOld: number | null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        editions: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        modifications: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        externalId: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parentUid: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        engineType: any;
        engineVolume: number;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transmission: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        driveType: any;
        year: number;
        enginePower: number;
        priceUSD: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        countryOfOrigin: any;
        mileage: number;
        weight: number;
        length: number;
        width: number;
        height: number;
      };
      update: {
        brand: string;
        sku: string;
        mark: string;
        category: string;
        title: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        photo: any;
        price: number;
        quantity: number;
        priceOld: number | null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        editions: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        modifications: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        externalId: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parentUid: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        engineType: any;
        engineVolume: number;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transmission: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        driveType: any;
        year: number;
        enginePower: number;
        priceUSD: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        countryOfOrigin: any;
        mileage: number;
        weight: number;
        length: number;
        width: number;
        height: number;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) => any;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $disconnect: () => any;
};

export async function upload_cars(
  workbook: XLSX.WorkBook,
  prisma: PrismaConnectorCars
) {
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Read with raw: false to preserve text format and handle different column name formats
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const carsData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
    raw: false, // Get values as strings to preserve precision for large numbers
    defval: "", // Default value for empty cells
  });

  console.log(`Знайдено ${carsData.length} рядків для імпорту`);

  let created = 0;
  let updated = 0;
  let errors = 0;

  // Helper function to get tildaUid from various possible column names
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTildaUid = (row: Record<string, any>): string => {
    // Try different possible column name formats
    const possibleKeys = [
      "Tilda UID",
      "TildaUID",
      "tildaUid",
      "tilda_uid",
      "TILDA_UID",
      "Tilda Uid",
    ];
    
    for (const key of possibleKeys) {
      if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
        const value = row[key];
        // Handle both string and number types (in case raw: false doesn't work as expected)
        if (typeof value === "number") {
          // For large numbers, use toFixed(0) to avoid scientific notation
          return value.toFixed(0);
        }
        // Remove any whitespace and ensure it's a string
        return String(value).trim();
      }
    }
    
    return "";
  };

  for (let i = 0; i < carsData.length; i++) {
    const data = carsData[i];
    let tildaUid = getTildaUid(data);
    
    // If still empty, try to get it from any key that might contain "tilda" or "uid"
    if (!tildaUid) {
      for (const key in data) {
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes("tilda") || lowerKey.includes("uid")) {
          const value = data[key];
          if (value !== undefined && value !== null && value !== "") {
            if (typeof value === "number") {
              tildaUid = value.toFixed(0);
            } else {
              tildaUid = String(value).trim();
            }
            if (tildaUid) break;
          }
        }
      }
    }

    // Skip rows without tildaUid
    if (!tildaUid || tildaUid === "undefined" || tildaUid === "null") {
      console.warn(`Рядок ${i + 1}: пропущено (немає tildaUid)`);
      errors++;
      continue;
    }

    // Helper function to get value by various possible column names
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getValue = (possibleKeys: string[], defaultValue: any = ""): any => {
      for (const key of possibleKeys) {
        if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
          return data[key];
        }
      }
      return defaultValue;
    };

    try {
      const carData = {
        tildaUid: tildaUid,
        brand: String(getValue(["Brand", "brand"], "Unknown")),
        sku: String(getValue(["SKU", "sku"], "")),
        mark: String(getValue(["Mark", "mark"], "")),
        category: String(getValue(["Category", "category", "Категорія", "категорія"], "")),
        title: String(getValue(["Title", "title"], "No title")),
        description: String(getValue(["Description", "description"], "")),
        text: String(getValue(["Text", "text"], "")),
        photo: (() => {
          const photo = getValue(["Photo", "photo"], "");
          return photo ? String(photo) : null;
        })(),
        price: (() => {
          const price = getValue(["Price", "price"], 0);
          return price ? Number(price) : 0;
        })(),
        quantity: (() => {
          const qty = getValue(["Quantity", "quantity"], 0);
          return qty ? Number(qty) : 0;
        })(),
        priceOld: (() => {
          const priceOld = getValue(["Price Old", "priceOld", "PriceOld"], null);
          return priceOld ? Number(priceOld) : null;
        })(),
        editions: (() => {
          const editions = getValue(["Editions", "editions"], "");
          return editions ? String(editions) : null;
        })(),
        modifications: (() => {
          const mods = getValue(["Modifications", "modifications"], "");
          return mods ? String(mods) : null;
        })(),
        externalId: (() => {
          const extId = getValue(["External ID", "externalId", "ExternalId"], "");
          return extId ? String(extId) : null;
        })(),
        parentUid: (() => {
          const parentUid = getValue(["Parent UID", "parentUid", "ParentUid"], "");
          return parentUid ? String(parentUid) : null;
        })(),
        engineType: String(getValue(["Engine Type", "engineType", "EngineType"], "")),
        engineVolume: (() => {
          const vol = getValue(["Engine Volume", "engineVolume", "EngineVolume"], 0);
          return vol ? Number(vol) : 0;
        })(),
        transmission: String(getValue(["Transmission", "transmission"], "")),
        driveType: String(getValue(["Drive Type", "driveType", "DriveType"], "")),
        year: (() => {
          const year = getValue(["Year", "year"], 0);
          return year ? Number(year) : 0;
        })(),
        enginePower: (() => {
          const power = getValue(["Engine Power", "enginePower", "EnginePower"], 0);
          return power ? Number(power) : 0;
        })(),
        priceUSD: String(getValue(["Price USD", "priceUSD", "PriceUSD"], "")),
        countryOfOrigin: String(getValue(["Country Of Origin", "countryOfOrigin", "CountryOfOrigin"], "")),
        mileage: (() => {
          const mileage = getValue(["Mileage", "mileage"], 0);
          return mileage ? Number(mileage) : 0;
        })(),
        weight: (() => {
          const weight = getValue(["Weight", "weight"], 0);
          return weight ? Number(weight) : 0;
        })(),
        length: (() => {
          const length = getValue(["Length", "length"], 0);
          return length ? Number(length) : 0;
        })(),
        width: (() => {
          const width = getValue(["Width", "width"], 0);
          return width ? Number(width) : 0;
        })(),
        height: (() => {
          const height = getValue(["Height", "height"], 0);
          return height ? Number(height) : 0;
        })(),
      };

      // Check if car exists
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existingCar = await (prisma as any).car.findUnique({
        where: { tildaUid: tildaUid },
      });

      if (existingCar) {
        // Update existing car
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (prisma as any).car.update({
          where: { tildaUid: tildaUid },
        data: {
            brand: carData.brand,
            sku: carData.sku,
            mark: carData.mark,
            category: carData.category,
            title: carData.title,
            description: carData.description,
            text: carData.text,
            photo: carData.photo,
            price: carData.price,
            quantity: carData.quantity,
            priceOld: carData.priceOld,
            editions: carData.editions,
            modifications: carData.modifications,
            externalId: carData.externalId,
            parentUid: carData.parentUid,
            engineType: carData.engineType,
            engineVolume: carData.engineVolume,
            transmission: carData.transmission,
            driveType: carData.driveType,
            year: carData.year,
            enginePower: carData.enginePower,
            priceUSD: carData.priceUSD,
            countryOfOrigin: carData.countryOfOrigin,
            mileage: carData.mileage,
            weight: carData.weight,
            length: carData.length,
            width: carData.width,
            height: carData.height,
        },
      });
        updated++;
      } else {
        // Create new car
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (prisma as any).car.create({
          data: carData,
        });
        created++;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Невідома помилка";
      console.error(`Помилка при обробці рядка ${i + 1} (tildaUid: ${tildaUid}):`, errorMessage);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (err && typeof err === "object" && "code" in err && (err as any).code === "P2002") {
        console.error(`  → Дублікат tildaUid: ${tildaUid}`);
      }
      errors++;
    }
  }

  console.log(`✅ Імпорт завершено!`);
  console.log(`📊 Статистика:`);
  console.log(`   - Створено: ${created}`);
  console.log(`   - Оновлено: ${updated}`);
  console.log(`   - Помилок: ${errors}`);
  console.log(`   - Всього оброблено: ${created + updated} з ${carsData.length}`);

  // Don't disconnect here - let the caller handle it
  return { created, updated, errors, total: carsData.length };
}
