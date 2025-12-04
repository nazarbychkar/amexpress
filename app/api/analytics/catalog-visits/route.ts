import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

// Перевірка автентифікації адміна
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return !!session;
}

export async function GET(request: NextRequest) {
  try {
    // Перевірити автентифікацію
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Отримати параметри запиту
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = (page - 1) * limit;

    // Отримати відвідування з пагінацією
    const [visits, total] = await Promise.all([
      prisma.catalogVisit.findMany({
        skip,
        take: limit,
        orderBy: { visitedAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              telegramId: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      prisma.catalogVisit.count(),
    ]);

    return NextResponse.json({
      visits,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching catalog visits:", error);
    return NextResponse.json(
      { error: "Failed to fetch visits", details: error.message },
      { status: 500 }
    );
  }
}

