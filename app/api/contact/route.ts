import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json");

// Get Telegram Chat ID from settings or env
async function getTelegramChatId(): Promise<string | null> {
  try {
    // Try to read from settings file first
    if (existsSync(SETTINGS_FILE)) {
      console.log("[getTelegramChatId] Reading from settings file:", SETTINGS_FILE);
      const fileContent = await readFile(SETTINGS_FILE, "utf-8");
      const settings = JSON.parse(fileContent);
      console.log("[getTelegramChatId] Settings from file:", settings);
      
      if (settings.telegramChatId && settings.telegramChatId.trim() !== "") {
        console.log("[getTelegramChatId] Using Chat ID from settings:", settings.telegramChatId);
        return settings.telegramChatId.trim();
      } else {
        console.log("[getTelegramChatId] Chat ID not found in settings file or is empty");
      }
    } else {
      console.log("[getTelegramChatId] Settings file does not exist:", SETTINGS_FILE);
    }
    
    // Fallback to env variable
    const envChatId = process.env.TELEGRAM_CHAT_ID;
    if (envChatId) {
      console.log("[getTelegramChatId] Using Chat ID from env variable");
      return envChatId;
    }
    
    console.log("[getTelegramChatId] Chat ID not found in settings or env");
    return null;
  } catch (error: any) {
    console.error("[getTelegramChatId] Error reading settings:", error);
    console.error("[getTelegramChatId] Error stack:", error.stack);
    // Fallback to env variable
    const envChatId = process.env.TELEGRAM_CHAT_ID;
    if (envChatId) {
      console.log("[getTelegramChatId] Using Chat ID from env variable (fallback)");
      return envChatId;
    }
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message, carInfo, formType } = body;

    const TELEGRAM_CHAT_ID = await getTelegramChatId();

    if (!TELEGRAM_BOT_TOKEN) {
      console.error("TELEGRAM_BOT_TOKEN is not set in environment variables");
      return NextResponse.json(
        { error: "Telegram bot token is not configured. Please set TELEGRAM_BOT_TOKEN in .env file." },
        { status: 500 }
      );
    }

    if (!TELEGRAM_CHAT_ID) {
      console.error("TELEGRAM_CHAT_ID is not set. Check settings or .env file.");
      return NextResponse.json(
        { error: "Telegram chat ID is not configured. Please set it in admin settings or TELEGRAM_CHAT_ID in .env file." },
        { status: 500 }
      );
    }

    // Build message text
    let messageText = `🔔 *Новий запит з сайту*\n\n`;
    messageText += `📋 *Тип форми:* ${formType === "order" ? "Замовлення" : "Зв'язок"}\n\n`;
    messageText += `👤 *Ім'я:* ${name}\n`;
    messageText += `📞 *Телефон:* ${phone}\n`;

    if (message) {
      messageText += `💬 *Повідомлення:* ${message}\n`;
    }

    if (carInfo) {
      messageText += `\n🚗 *Інформація про авто:*\n`;
      messageText += `   • *Назва:* ${carInfo.title || "Не вказано"}\n`;
      messageText += `   • *Марка:* ${carInfo.brand || "Не вказано"}\n`;
      messageText += `   • *Модель:* ${carInfo.mark || "Не вказано"}\n`;
      messageText += `   • *Рік:* ${carInfo.year || "Не вказано"}\n`;
      messageText += `   • *Ціна:* ${carInfo.priceUSD ? `$${carInfo.priceUSD}` : "Ціну потрібно уточнити"}\n`;
      if (carInfo.id) {
        messageText += `   • *ID:* ${carInfo.id}\n`;
        messageText += `   • *Посилання:* https://catalog.autopremium.store/car/${carInfo.id}\n`;
      }
    }

    messageText += `\n⏰ *Час:* ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" })}`;

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send message to Telegram" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending contact form:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

