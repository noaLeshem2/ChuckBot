require('dotenv').config(); // Load environment variables from .env file
const TelegramBot = require('node-telegram-bot-api');
const fetchChuckNorrisJokes = require('./fetchJokes');
const translateText = require('./translateText');
const iso6391 = require('iso-639-1');


// Start of the code
const telegramToken = process.env.TELEGRAM_BOT_TOKEN; 
if ( !telegramToken) {
    console.error('Please provide a valid Telegram bot token.');
    process.exit(1);
}

// Initalize props
const bot = new TelegramBot(telegramToken, { polling: true });
const usersLanguage = {}; // In-memory store for user language
let jokes;

async function startBot() {
    // Wait for jokes to be loaded
    jokes = await loadJokes();

    // Message handler
    bot.on('message',handleMessage);

    async function handleMessage(msg) {
        const chatId = msg.chat.id;
        const messageText = msg.text;
        
        if(messageText === '/start'){
            bot.sendMessage(chatId, 'Welcome to ChuckBot! 🤖\nDo you like Chuck Norris jokes? Just send me a number between 1 and 101, and I\'ll share a hilarious Chuck Norris fact with you. If you want to switch the language, type "set language [your language]" (e.g., set language French).');
            return;
        }
        
        // Check if the message is a number between 1-101
        const numberRegex = /^(\d+)$/;
        if (numberRegex.test(messageText)) {
            const number = parseInt(messageText, 10);
            if (number >= 1 && number <= 101) { // Number inside the range
            let joke = getJoke(number); // Fetch joke
            bot.sendMessage(chatId, await translateText(joke,getUserLanguage(chatId)));
            return;
            }
            bot.sendMessage(chatId,`The number ${number} is outside the valid range. \nPlease enter a number between 1 and 101.`);
            return;
        }
        

        // Check if the message is to set the language
        const setLanguageRegex = /^set\s+language\s+(\w+)$/i;
        const matchLangPattern = setLanguageRegex.exec(messageText);
        if (matchLangPattern) {

            const language = matchLangPattern[1]; // Extract the language
            const languageCode = getLanguageCode(language);            
            if (!languageCode) {
            bot.sendMessage(chatId, `The Language set to: ${language} is not vaild. \nPlease choose a supported language.`);
            return;
            }
            setUserLanguage(chatId,languageCode);
            // Translate and send.
            const translatedText = await translateText("No problem", languageCode).catch((err) => {
                console.error(err);
                return;
            });
            bot.sendMessage(chatId, translatedText);
            return;
        }
        
        bot.sendMessage(chatId, `Sorry, I didn't recognize that instruction. \nPlease check the available commands and try again.`);
        
    }


}



function getLanguageCode(language) {
    const lowercasedLanguage = language.toLowerCase();
    const languageCode = iso6391.getCode(lowercasedLanguage); // Get the ISO 639-1 code
    if (languageCode) {
        return languageCode;
    } else {
        console.error(`Language code not found for ${language}`);
        return null;
    }
}



function getUserLanguage(chatId) {
    return usersLanguage[chatId] || 'en';
}

function setUserLanguage(chatId, language) {
    usersLanguage[chatId] = language;
}

async function loadJokes() {
    return await fetchChuckNorrisJokes();
}

function getJoke(jokeNumber) {
    // Fetch joke and send at the right format
    return jokeNumber.toString() + '. ' + jokes[jokeNumber-1];

}

  
startBot();