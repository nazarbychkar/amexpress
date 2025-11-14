// app/api/cars/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: Promise<Request>) {
  const { searchParams } = new URL((await request).url);
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
      price: true,
      photo: true,
      category: true,
    },
  });

  return NextResponse.json(cars);
}

export async function POST(request: Promise<Request>) {
  try {
    const data = await (await request).json();

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
        priceUSD: parseFloat(data.priceUSD),
        countryOfOrigin: data.countryOfOrigin,
        mileage: parseInt(data.mileage),
        weight: parseFloat(data.weight),
        length: parseFloat(data.length),
        width: parseFloat(data.width),
        height: parseFloat(data.height),
      },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("Error creating car:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
