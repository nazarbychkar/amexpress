// app/api/cars/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const skip = Number(searchParams.get("skip") ?? 0);
    const take = Number(searchParams.get("take") ?? 10);

    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.car.count(),
    ]);

    return NextResponse.json({ cars, total });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Не вдалося отримати машини" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Обов'язкові поля
    if (!data.brand || !data.title || !data.price) {
      return NextResponse.json(
        { error: "Відсутні обов'язкові поля" },
        { status: 400 }
      );
    }

    const newCar = await prisma.car.create({
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

    return NextResponse.json(newCar, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Не вдалося додати машину" },
      { status: 500 }
    );
  }
}
