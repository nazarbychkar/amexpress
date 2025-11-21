import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const CATEGORIES_FILE = path.join(process.cwd(), "data", "categories.json");

// Disable body parsing limit for file uploads
export const runtime = "nodejs";
export const maxDuration = 30;

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

// Get categories
export async function GET() {
  try {
    await ensureDataDir();
    
    // Default category names
    const defaultNames: Record<string, string> = {
      sedan: "Седани",
      hatchback: "Хетчбеки",
      pickup: "Пікапи",
      crosovers: "Кросовери",
      suv: "Позашляховики",
      main: "Головна",
    };

    let categories: Record<string, { name: string; image: string | null; description: string | null }> = {};
    
    if (existsSync(CATEGORIES_FILE)) {
      const fileContent = await readFile(CATEGORIES_FILE, "utf-8");
      categories = JSON.parse(fileContent);
    }

    // Ensure all default categories exist
    Object.keys(defaultNames).forEach((key) => {
      if (!categories[key]) {
        categories[key] = {
          name: defaultNames[key],
          image: null,
          description: null,
        };
      } else {
        if (!categories[key].name) {
          categories[key].name = defaultNames[key];
        }
        if (!categories[key].hasOwnProperty("description")) {
          categories[key].description = null;
        }
      }
    });

    // Save updated categories if any were added
    if (Object.keys(categories).length > 0) {
      await writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
    }

    return NextResponse.json(categories);
  } catch (err: any) {
    console.error("Error reading categories:", err);
    return NextResponse.json(
      { message: err.message || "Помилка при читанні категорій" },
      { status: 500 }
    );
  }
}

// Update category image
export async function POST(request: NextRequest) {
  console.log("[POST /api/categories] Request received");
  try {
    console.log("[POST /api/categories] Ensuring data directory");
    await ensureDataDir();
    
    console.log("[POST /api/categories] Parsing form data");
    const formData = await request.formData();
    console.log("[POST /api/categories] Form data parsed successfully");
    
    const categoryKey = formData.get("categoryKey") as string;
    const file = formData.get("image") as File | null;
    
    console.log("[POST /api/categories] Category key:", categoryKey);
    console.log("[POST /api/categories] File:", file ? `Present (${file.size} bytes, ${file.type})` : "Not provided");

    if (!categoryKey) {
      console.error("[POST /api/categories] Category key is missing");
      return NextResponse.json(
        { message: "Категорія не вказана" },
        { status: 400 }
      );
    }

    // Default category names
    const defaultNames: Record<string, string> = {
      sedan: "Седани",
      hatchback: "Хетчбеки",
      pickup: "Пікапи",
      crosovers: "Кросовери",
      suv: "Позашляховики",
      main: "Головна",
    };

    // Read existing categories
    let categories: Record<string, { name: string; image: string | null; description: string | null }> = {};
    if (existsSync(CATEGORIES_FILE)) {
      const fileContent = await readFile(CATEGORIES_FILE, "utf-8");
      categories = JSON.parse(fileContent);
    }

    // Ensure all default categories exist
    Object.keys(defaultNames).forEach((key) => {
      if (!categories[key]) {
        categories[key] = {
          name: defaultNames[key],
          image: null,
          description: null,
        };
      } else {
        if (!categories[key].name) {
          categories[key].name = defaultNames[key];
        }
        if (!categories[key].hasOwnProperty("description")) {
          categories[key].description = null;
        }
      }
    });

    if (file && file.size > 0) {
      console.log("[POST /api/categories] Processing file upload");
      
      // Validate file type
      if (!file.type.startsWith("image/")) {
        console.error("[POST /api/categories] Invalid file type:", file.type);
        return NextResponse.json(
          { message: "Файл повинен бути зображенням" },
          { status: 400 }
        );
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        console.error("[POST /api/categories] File too large:", file.size);
        return NextResponse.json(
          { message: "Розмір файлу не повинен перевищувати 10MB" },
          { status: 400 }
        );
      }

      try {
        console.log("[POST /api/categories] Ensuring public/categories directory");
        // Ensure public/categories directory exists
        const publicDir = path.join(process.cwd(), "public", "categories");
        if (!existsSync(publicDir)) {
          console.log("[POST /api/categories] Creating directory:", publicDir);
          await mkdir(publicDir, { recursive: true });
        }

        console.log("[POST /api/categories] Reading file bytes");
        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExtension = file.name.split(".").pop() || "png";
        const fileName = `${categoryKey}.${fileExtension}`;
        const filePath = path.join(publicDir, fileName);
        
        console.log("[POST /api/categories] Writing file to:", filePath);
        await writeFile(filePath, buffer);
        
        // Verify file was saved
        if (!existsSync(filePath)) {
          throw new Error(`File was not saved to ${filePath}`);
        }
        
        const fileStats = await import("fs/promises").then(m => m.stat(filePath));
        console.log("[POST /api/categories] File saved successfully. Size:", fileStats.size, "bytes");
        
        // Update category image (category should already exist from initialization above)
        // Use API endpoint for better compatibility in production - it reads files dynamically
        const imagePath = `/api/categories/image/${fileName}`;
        console.log("[POST /api/categories] File will be accessible at:", imagePath);
        
        if (categories[categoryKey]) {
          categories[categoryKey].image = imagePath;
        } else {
          // Fallback: create category if somehow it doesn't exist
          categories[categoryKey] = {
            name: defaultNames[categoryKey] || categoryKey,
            image: imagePath,
            description: null,
          };
        }
        
        console.log("[POST /api/categories] Category image path set to:", imagePath);
      } catch (fileError: any) {
        console.error("[POST /api/categories] Error saving file:", fileError);
        return NextResponse.json(
          { message: `Помилка збереження файлу: ${fileError.message}` },
          { status: 500 }
        );
      }
    } else {
      console.log("[POST /api/categories] No file provided or file is empty");
    }

    // Handle description update
    const description = formData.get("description") as string | null;
    if (description !== null && categories[categoryKey]) {
      categories[categoryKey].description = description.trim() || null;
    }

    // Save updated categories
    try {
      console.log("[POST /api/categories] Saving categories to file");
      await writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
      console.log("[POST /api/categories] Categories saved successfully");
    } catch (writeError: any) {
      console.error("[POST /api/categories] Error writing categories file:", writeError);
      return NextResponse.json(
        { message: `Помилка збереження даних: ${writeError.message}` },
        { status: 500 }
      );
    }

    console.log("[POST /api/categories] Request completed successfully");
    return NextResponse.json({
      message: "Категорію успішно оновлено",
      categories,
    });
  } catch (err: any) {
    console.error("[POST /api/categories] Error updating category:", err);
    console.error("[POST /api/categories] Error stack:", err.stack);
    return NextResponse.json(
      { 
        message: err.message || "Помилка при оновленні категорії",
        error: process.env.NODE_ENV === "development" ? err.stack : undefined
      },
      { status: 500 }
    );
  }
}

