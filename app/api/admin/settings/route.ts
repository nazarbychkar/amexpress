import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { cookies } from "next/headers";

const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json");

// Check if user is authenticated
async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    return !!session;
  } catch {
    return false;
  }
}

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

// Get settings
export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await ensureDataDir();

    let settings: { telegramChatId?: string } = {};
    if (existsSync(SETTINGS_FILE)) {
      const fileContent = await readFile(SETTINGS_FILE, "utf-8");
      settings = JSON.parse(fileContent);
    }

    // Default to env variable if not set in settings
    if (!settings.telegramChatId) {
      settings.telegramChatId = process.env.TELEGRAM_CHAT_ID || "";
    }

    return NextResponse.json(settings);
  } catch (error: unknown) {
    console.error("Error reading settings:", error);
    return NextResponse.json(
      { error: "Failed to read settings" },
      { status: 500 }
    );
  }
}

// Update settings
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { telegramChatId } = await request.json();

    if (!telegramChatId || typeof telegramChatId !== "string") {
      return NextResponse.json(
        { error: "telegramChatId is required" },
        { status: 400 }
      );
    }

    await ensureDataDir();

    const settings = {
      telegramChatId: telegramChatId.trim(),
    };

    await writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error: unknown) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

