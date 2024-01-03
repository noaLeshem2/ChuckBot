require('dotenv').config(); // Load environment variables from .env file
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('Please provide a valid Telegram bot token in the .env file.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Your bot logic here
  bot.sendMessage(chatId, `Received: ${messageText}`);
});
