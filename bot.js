require('dotenv').config(); // Load environment variables from .env file
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN; 


if (!token) {
  console.error('Please provide a valid Telegram bot token in the .env file.');
  process.exit(1);
}


const bot = new TelegramBot(token, { polling: true });
const usersLanguage = {}; // Users preferred language


// Message handler
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;


  // Check if the message is a number between 1-101
  const numberRegex = /^(\d+)$/;
  if (numberRegex.test(messageText)) {
    const number = parseInt(messageText, 10);
    if (number >= 1 && number <= 101) {
      // Handle the case when the message is a number between 1-101
      bot.sendMessage(chatId, `Received a number between 1 and 101: ${number}`);
      return;
    }
  }



  bot.sendMessage(chatId, `Received: ${messageText}`);
});



function translateText(text, targetLanguage) {
    // Implement your logic here to call Azure Translator API
    // For now, let's assume a simple translation based on targetLanguage
    switch (targetLanguage) {
      case 'es':
        return `¡Hola! ${text}`;
      case 'fr':
        return `Bonjour! ${text}`;
      default:
        return text;
    }
}  



function getUserLanguage(chatId) {
    return usersLanguage[chatId] || 'en';
}

function setUserLanguage(chatId, language) {
    usersLanguage[chatId] = language;
}


function loadJokes() {

}

function getJoke(jokeNumber) {
    // fetch joke
    // translate joke

}