require('dotenv').config(); // Load environment variables from .env file
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const cheerio = require('cheerio');
const fetchChuckNorrisJokes = require('./fetchJokes');
//const { TranslatorTextClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
const langdetect = require('langdetect');


const telegramToken = process.env.TELEGRAM_BOT_TOKEN; 


if (!telegramToken) {
  console.error('Please provide a valid Telegram bot token in the .env file.');
  process.exit(1);
}

const bot = new TelegramBot(telegramToken, { polling: true });

async function startBot() {

    //const jokes = await fetchChuckNorrisJokes();
    // Message handler
    bot.on('message',handleMessage);


    async function handleMessage(msg) {
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
      

        // Check if the message is to set the language
        const setLanguageRegex = /^set\s+language\s+(\w+)$/i;
        const match = setLanguageRegex.exec(messageText);

        if (match) {
            const language = match[1]; // Extract the language
            const detectedLanguage = await detectLanguage(messageText);
            if (detectedLanguage) {
                bot.sendMessage(chatId, `Language set to: ${detectedLanguage}`);
                return;
            }
            bot.sendMessage(chatId, `Language set to: ${language}`);
            return;
        }
      
      
      
        bot.sendMessage(chatId, `Received: ${messageText}`);
      
    }


}

startBot();

// function handleMessage(msg) {
//   const chatId = msg.chat.id;
//   const messageText = msg.text;


//   // Check if the message is a number between 1-101
//   const numberRegex = /^(\d+)$/;
//   if (numberRegex.test(messageText)) {
//     const number = parseInt(messageText, 10);
//     if (number >= 1 && number <= 101) {
//       // Handle the case when the message is a number between 1-101
//       bot.sendMessage(chatId, `Received a number between 1 and 101: ${number}`);
//       return;
//     }
//   }

//   bot.sendMessage(chatId,jokes[3]);



//   bot.sendMessage(chatId, `Received: ${messageText}`);

// }







// Message handler
// bot.on('message',handleMessage);


async function detectLanguage(language) {
    try {
      const result = langdetect.detect(language);
      return result[0].lang;
    } catch (error) {
      console.error('Error detecting language:', error.message);
      return null;
    }
  }

  
async function translateText(text, targetLanguage) {
    // Use Azure Translator API to translate text
    const result = await translatorClient.translate(text, targetLanguage);
    return result[0].translations[0].text;
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