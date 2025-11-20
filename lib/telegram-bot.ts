import TelegramBot from "node-telegram-bot-api";
import { prisma } from "./db";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL || "https://catalog.autopremium.store/";

if (!BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set in environment variables");
}

// Validate token format
if (!/^\d+:[A-Za-z0-9_-]+$/.test(BOT_TOKEN)) {
  throw new Error("Invalid TELEGRAM_BOT_TOKEN format. Token should be in format: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz");
}

// Create bot instance
export const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// Handle start command
export async function handleStartCommand(msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const user = msg.from;

  if (!user) return;

  try {
    // Convert Telegram IDs to BigInt
    const telegramIdBigInt = BigInt(user.id);
    const chatIdBigInt = BigInt(chatId);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { telegramId: telegramIdBigInt },
    });

    // If user doesn't exist, create new user
    if (!existingUser) {
      await prisma.user.create({
        data: {
          telegramId: telegramIdBigInt,
          username: user.username || null,
          firstName: user.first_name,
          lastName: user.last_name || null,
          languageCode: user.language_code || "uk",
          chatId: chatIdBigInt,
          isBot: user.is_bot || false,
        },
      });
    } else {
      // Update existing user info
      await prisma.user.update({
        where: { telegramId: telegramIdBigInt },
        data: {
          username: user.username || null,
          firstName: user.first_name,
          lastName: user.last_name || null,
          languageCode: user.language_code || "uk",
          chatId: chatIdBigInt,
        },
      });
    }

    // Check if start command has a parameter (car_id)
    const commandText = msg.text || "";
    const carIdMatch = commandText.match(/\/start\s+car_(\d+)/);
    
    if (carIdMatch) {
      // Handle shared car link
      const carId = parseInt(carIdMatch[1]);
      
      // Try to fetch car info
      try {
        const car = await prisma.car.findUnique({
          where: { id: carId },
          select: {
            id: true,
            title: true,
            photo: true,
          },
        });

        if (car) {
          const shareMessage = `👇🏻 З вами поділились товаром. Натисніть на кнопку для перегляду!`;
          // Ensure WEB_APP_URL ends with / and construct proper car URL
          const baseUrl = WEB_APP_URL.endsWith('/') ? WEB_APP_URL.slice(0, -1) : WEB_APP_URL;
          const carUrl = `${baseUrl}/car/${car.id}`;

          const options: TelegramBot.SendMessageOptions = {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🚗 Переглянути авто",
                    web_app: {
                      url: carUrl,
                    } as TelegramBot.WebAppInfo,
                  },
                ],
              ],
            },
          };

          await bot.sendMessage(chatId, shareMessage, options);
          return; // Exit early to prevent default welcome message
        }
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    }

    // Default welcome message
    const welcomeText = `👋 Привіт, ${user.first_name}!

Ласкаво просимо до AmeXpress! 🚗

Тут ви знайдете широкий вибір автомобілів з США за вигідними цінами.

Перегляньте наш каталог та оберіть ідеальний автомобіль для себе!`;

    const options: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🌐 Відкрити каталог",
              web_app: {
                url: WEB_APP_URL,
              } as TelegramBot.WebAppInfo,
            },
          ],
        ],
      },
    };

    await bot.sendMessage(chatId, welcomeText, options);
  } catch (error) {
    console.error("Error handling start command:", error);
    await bot.sendMessage(
      chatId,
      "Вибачте, сталася помилка. Спробуйте пізніше."
    );
  }
}

// Handle webhook updates
export async function handleWebhookUpdate(update: TelegramBot.Update) {
  if (update.message) {
    const message = update.message;

    // Handle /start command
    if (message.text === "/start" || message.text?.startsWith("/start")) {
      await handleStartCommand(message);
    }
  }
}

