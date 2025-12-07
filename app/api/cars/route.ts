// app/api/cars/route.ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  const cars = await prisma.car.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      photo: true,
      category: true,
      priceUSD: true,
    },
  });

  return NextResponse.json(cars);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.tildaUid || data.tildaUid.trim() === "") {
      return NextResponse.json(
        { message: "tildaUid є обов&apos;язковим полем" },
        { status: 400 }
      );
    }

    // Check if tildaUid already exists
    const existingCar = await prisma.car.findUnique({
      where: { tildaUid: data.tildaUid },
    });

    if (existingCar) {
      return NextResponse.json(
        { 
          message: "Автомобіль з таким tildaUid вже існує. Будь ласка, згенеруйте новий tildaUid.",
          code: "P2002"
        },
        { status: 409 }
      );
    }

    const car = await prisma.car.create({
      data: {
        tildaUid: data.tildaUid,
        brand: data.brand,
        sku: data.sku,
        mark: data.mark,
        category: data.category,
        title: data.title,
        description: data.description,
        text: data.text,
        photo: data.photo || null,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        priceOld: data.priceOld ? parseFloat(data.priceOld) : null,
        editions: data.editions || null,
        modifications: data.modifications || null,
        externalId: data.externalId || null,
        parentUid: data.parentUid || null,
        engineType: data.engineType,
        engineVolume: parseFloat(data.engineVolume),
        transmission: data.transmission,
        driveType: data.driveType,
        year: parseInt(data.year),
        enginePower: parseFloat(data.enginePower),
        priceUSD: String(data.priceUSD),
        countryOfOrigin: data.countryOfOrigin,
        mileage: parseInt(data.mileage),
        weight: parseFloat(data.weight),
        length: parseFloat(data.length),
        width: parseFloat(data.width),
        height: parseFloat(data.height),
      },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating car:", error);

    // Handle Prisma unique constraint violation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error && typeof error === "object" && "code" in error && (error as any).code === "P2002") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const field = (error as any).meta?.target?.[0] || "tildaUid";
      return NextResponse.json(
        { 
          message: `Автомобіль з таким ${field} вже існує. Будь ласка, згенеруйте новий ${field}.`,
          code: "P2002"
        },
        { status: 409 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
