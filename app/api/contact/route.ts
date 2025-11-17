import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message, carInfo, formType } = body;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
      return NextResponse.json(
        { error: "Telegram configuration is missing" },
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

