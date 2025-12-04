import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

// Перевірка автентифікації адміна
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return !!session;
}

export async function DELETE(request: NextRequest) {
  try {
    // Перевірити автентифікацію
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Видалити всі автомобілі
    const result = await prisma.car.deleteMany({});

    return NextResponse.json({
      success: true,
      message: `Видалено ${result.count} автомобілів`,
      deletedCount: result.count,
    });
  } catch (error: any) {
    console.error("Error deleting all cars:", error);
    return NextResponse.json(
      { error: "Failed to delete cars", details: error.message },
      { status: 500 }
    );
  }
}

