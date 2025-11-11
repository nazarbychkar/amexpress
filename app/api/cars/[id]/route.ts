// app/api/cars/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const car = await prisma.car.findUnique({
      where: { id: Number(params.id) }, // або { id: params.id } якщо у Prisma id string
    });

    if (!car) {
      return NextResponse.json(
        { error: "Машина не знайдена" },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (err) {
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const updatedCar = await prisma.car.update({
      where: { id: Number(params.id) },
      data: data, // Тут можна фільтрувати тільки дозволені поля
    });

    return NextResponse.json(updatedCar);
  } catch (err) {
    return NextResponse.json(
      { error: "Не вдалося оновити машину" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.car.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Машина видалена" });
  } catch (err) {
    return NextResponse.json(
      { error: "Не вдалося видалити машину" },
      { status: 500 }
    );
  }
}
