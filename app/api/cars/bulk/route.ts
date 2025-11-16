import { NextRequest, NextResponse } from "next/server";
import { upload_cars } from "@/lib/cars-db"; // adjust path
import { prisma } from "@/lib/db";
import path from "path";
import * as XLSX from "xlsx";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process file with your function
    const workbook = XLSX.read(buffer, { type: "buffer" });
    await upload_cars(workbook, prisma);

    return NextResponse.json({ message: "Upload complete" });
  } catch (err) {
    console.error("Upload error:", err);

    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
