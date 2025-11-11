// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const newUser = await prisma.user.create({
      data: data, // Обов’язково має включати хоча б telegramId, firstName, languageCode, isBot
    });

    return NextResponse.json(newUser);
  } catch (err) {
    return NextResponse.json(
      { error: "Не вдалося створити користувача" },
      { status: 500 }
    );
  }
}
