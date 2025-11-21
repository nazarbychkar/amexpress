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

    // Prepare update data with proper type conversions
    const updateData: any = { ...data };

    // Remove price field (not used, we use priceUSD instead)
    delete updateData.price;

    // Convert numeric fields
    if (updateData.priceOld !== undefined && updateData.priceOld !== null && updateData.priceOld !== "") {
      updateData.priceOld = parseFloat(updateData.priceOld);
    } else if (updateData.priceOld === "" || updateData.priceOld === null) {
      updateData.priceOld = null;
    }
    if (updateData.quantity !== undefined) {
      updateData.quantity = parseInt(updateData.quantity);
    }
    if (updateData.year !== undefined) {
      updateData.year = parseInt(updateData.year);
    }
    if (updateData.mileage !== undefined) {
      updateData.mileage = parseInt(updateData.mileage);
    }
    if (updateData.engineVolume !== undefined) {
      updateData.engineVolume = parseFloat(updateData.engineVolume);
    }
    if (updateData.enginePower !== undefined) {
      updateData.enginePower = parseFloat(updateData.enginePower);
    }
    if (updateData.weight !== undefined) {
      updateData.weight = parseFloat(updateData.weight);
    }
    if (updateData.length !== undefined) {
      updateData.length = parseFloat(updateData.length);
    }
    if (updateData.width !== undefined) {
      updateData.width = parseFloat(updateData.width);
    }
    if (updateData.height !== undefined) {
      updateData.height = parseFloat(updateData.height);
    }

    // Handle optional fields
    if (updateData.photo !== undefined && (updateData.photo === "" || updateData.photo === null)) {
      updateData.photo = null;
    }
    if (updateData.editions !== undefined && (updateData.editions === "" || updateData.editions === null)) {
      updateData.editions = null;
    }
    if (updateData.modifications !== undefined && (updateData.modifications === "" || updateData.modifications === null)) {
      updateData.modifications = null;
    }
    if (updateData.externalId !== undefined && (updateData.externalId === "" || updateData.externalId === null)) {
      updateData.externalId = null;
    }
    if (updateData.parentUid !== undefined && (updateData.parentUid === "" || updateData.parentUid === null)) {
      updateData.parentUid = null;
    }

    // Remove id, createdAt, updatedAt, price from update data (these shouldn't be updated)
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.price; // Use priceUSD instead

    const updatedCar = await prisma.car.update({
      where: { id: carId },
      data: updateData,
    });

    return NextResponse.json(updatedCar);
  } catch (err: any) {
    console.error("UPDATE car error:", err);
    return NextResponse.json(
      { 
        error: "Не вдалося оновити машину",
        details: err.message || "Невідома помилка"
      },
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
