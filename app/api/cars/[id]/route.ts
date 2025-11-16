// app/api/cars/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const carId = Number((await params).id);
    console.log("carId", carId);

    const car = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return NextResponse.json(
        { error: "Машина не знайдена" },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (err) {
    console.log("GET car error:", err);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const carId = Number((await params).id);
    const data = await req.json();

    const updatedCar = await prisma.car.update({
      where: { id: carId },
      data,
    });

    return NextResponse.json(updatedCar);
  } catch (err) {
    console.error("UPDATE car error:", err);
    return NextResponse.json(
      { error: "Не вдалося оновити машину" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const carId = Number((await params).id);

    await prisma.car.delete({
      where: { id: carId },
    });

    return NextResponse.json({ message: "Машина видалена" });
  } catch (err) {
    console.error("DELETE car error:", err);
    return NextResponse.json(
      { error: "Не вдалося видалити машину" },
      { status: 500 }
    );
  }
}
