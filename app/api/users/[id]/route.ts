// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Користувача не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
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

    const updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: data, // Тут можна фільтрувати лише дозволені поля
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json(
      { error: "Не вдалося оновити користувача" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Користувача видалено" });
  } catch (err) {
    return NextResponse.json(
      { error: "Не вдалося видалити користувача" },
      { status: 500 }
    );
  }
}
