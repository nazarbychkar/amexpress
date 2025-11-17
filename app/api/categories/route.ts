import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const CATEGORIES_FILE = path.join(process.cwd(), "data", "categories.json");

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
  try {
    await ensureDataDir();
    
    const formData = await request.formData();
    const categoryKey = formData.get("categoryKey") as string;
    const file = formData.get("image") as File;

    if (!categoryKey) {
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

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { message: "Файл повинен бути зображенням" },
          { status: 400 }
        );
      }

      // Ensure public/categories directory exists
      const publicDir = path.join(process.cwd(), "public", "categories");
      if (!existsSync(publicDir)) {
        await mkdir(publicDir, { recursive: true });
      }

      // Save file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileExtension = file.name.split(".").pop() || "png";
      const fileName = `${categoryKey}.${fileExtension}`;
      const filePath = path.join(publicDir, fileName);
      
      await writeFile(filePath, buffer);

      // Update category image (category should already exist from initialization above)
      if (categories[categoryKey]) {
        categories[categoryKey].image = `/categories/${fileName}`;
      } else {
        // Fallback: create category if somehow it doesn't exist
        categories[categoryKey] = {
          name: defaultNames[categoryKey] || categoryKey,
          image: `/categories/${fileName}`,
          description: null,
        };
      }
    }

    // Handle description update
    const description = formData.get("description") as string | null;
    if (description !== null && categories[categoryKey]) {
      categories[categoryKey].description = description.trim() || null;
    }

    // Save updated categories
    await writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));

    return NextResponse.json({
      message: "Категорію успішно оновлено",
      categories,
    });
  } catch (err: any) {
    console.error("Error updating category:", err);
    return NextResponse.json(
      { message: err.message || "Помилка при оновленні категорії" },
      { status: 500 }
    );
  }
}

