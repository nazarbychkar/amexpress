import TelegramBot from "node-telegram-bot-api";
import { prisma } from "../lib/db";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL || "https://catalog.autopremium.store/";

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN is not set in environment variables");
  console.error("Please add TELEGRAM_BOT_TOKEN to your .env file");
  process.exit(1);
}

// Validate token format (should be like: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz)
if (!/^\d+:[A-Za-z0-9_-]+$/.test(BOT_TOKEN)) {
  console.error("❌ Invalid TELEGRAM_BOT_TOKEN format");
  console.error("Token should be in format: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz");
  process.exit(1);
}

// Create bot instance with polling
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Test bot connection
bot.getMe()
  .then((botInfo) => {
    console.log(`✅ Bot connected successfully!`);
    console.log(`   Bot username: @${botInfo.username}`);
    console.log(`   Bot name: ${botInfo.first_name}`);
    console.log(`🤖 Telegram bot started and polling for updates...`);
  })
  .catch((error) => {
    console.error("❌ Failed to connect to Telegram API:", error.message);
    if (error.response?.statusCode === 401) {
      console.error("   This usually means the bot token is invalid.");
      console.error("   Please check your TELEGRAM_BOT_TOKEN in .env file");
    }
    process.exit(1);
  });

// Handle /start command
bot.onText(/\/start(?:\s+car_(\d+))?/, async (msg, match) => {
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

    const isNewUser = !existingUser;

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
      console.log(`✅ New user registered: ${user.first_name} (${user.id})`);
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
      console.log(`🔄 User updated: ${user.first_name} (${user.id})`);
    }

    // Check if start command has a parameter (car_id)
    const carId = match && match[1] ? parseInt(match[1]) : null;

    if (carId) {
      // Handle shared car link
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
          console.log(`📤 Sent car share message for car ${car.id} to user ${user.id}`);
          return; // Exit early to prevent default welcome message
        } else {
          console.log(`⚠️ Car with ID ${carId} not found`);
        }
      } catch (error) {
        console.error("❌ Error fetching car:", error);
      }
    }

    // Default welcome message (if no car_id or car not found)
    const welcomeText = `👋 Привіт, ${user.first_name}!

Ласкаво просимо до AmeXpress! 🚗

Тут ви знайдете широкий вибір автомобілів з США за вигідними цінами.

Перегляньте наш каталог та оберіть ідеальний автомобіль для себе!`;

    // Ensure WEB_APP_URL is properly formatted
    const baseUrl = WEB_APP_URL.endsWith('/') ? WEB_APP_URL.slice(0, -1) : WEB_APP_URL;
    const catalogUrl = `${baseUrl}/`;

    const options: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🌐 Відкрити каталог",
              web_app: {
                url: catalogUrl,
              } as TelegramBot.WebAppInfo,
            },
          ],
        ],
      },
    };

    await bot.sendMessage(chatId, welcomeText, options);
  } catch (error) {
    console.error("❌ Error handling start command:", error);
    await bot.sendMessage(
      chatId,
      "Вибачте, сталася помилка. Спробуйте пізніше."
    );
  }
});

// Handle errors
bot.on("error", (error) => {
  console.error("❌ Bot error:", error);
});

bot.on("polling_error", (error) => {
  console.error("❌ Polling error:", error);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down bot...");
  bot.stopPolling();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down bot...");
  bot.stopPolling();
  process.exit(0);
});

