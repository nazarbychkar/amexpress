import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("banner") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Файл не завантажено" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Файл повинен бути зображенням" },
        { status: 400 }
      );
    }

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), "public");
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    // Save file as sale-banner.png
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(publicDir, "sale-banner.png");
    
    await writeFile(filePath, buffer);

    // Get file modification time for cache busting
    const stats = await stat(filePath);
    const timestamp = stats.mtime.getTime();

    return NextResponse.json({
      message: "Банер успішно завантажено",
      path: "/sale-banner.png",
      timestamp: timestamp,
    });
  } catch (err: unknown) {
    console.error("Banner upload error:", err);
    const errorMessage = err instanceof Error ? err.message : "Помилка при завантаженні банера";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, "sale-banner.png");
    
    // Get file modification time for cache busting
    let timestamp = Date.now();
    if (existsSync(filePath)) {
      try {
        const stats = await stat(filePath);
        timestamp = stats.mtime.getTime();
      } catch {
        // If stat fails, use current time
        // Error already logged above
      }
    }

    return NextResponse.json({
      path: "/sale-banner.png",
      timestamp: timestamp,
    });
  } catch {
    return NextResponse.json({
      path: "/sale-banner.png",
      timestamp: Date.now(),
    });
  }
}

