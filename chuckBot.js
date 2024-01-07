const TelegramBot = require('node-telegram-bot-api');
const fetchChuckNorrisJokes = require('./fetchJokes');
const translateText = require('./translateText');
const iso6391 = require('iso-639-1');

class ChuckBot {
  constructor(telegramToken) {
    this.bot = new TelegramBot(telegramToken, { polling: true });
    this.usersLanguage = {};
    this.jokes;
  }

  async loadJokes() {
    return await fetchChuckNorrisJokes();
  }

  async startBot() {
    // Message handler
    this.jokes = await this.loadJokes();
    this.bot.on('message', this.handleMessage.bind(this));
  }

  async handleMessage(msg) {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    
    if(messageText === '/start'){
        this.bot.sendMessage(chatId, 'Welcome to ChuckBot! 🤖\nDo you like Chuck Norris jokes? Just send me a number between 1 and 101, and I\'ll share a hilarious Chuck Norris fact with you. If you want to switch the language, type "set language [your language]" (e.g., set language French).');
        return;
    }
    
    // Check if the message is a number between 1-101
    const numberRegex = /^(\d+)$/;
    if (numberRegex.test(messageText)) {
        const number = parseInt(messageText, 10);
        if (number >= 1 && number <= 101) { // Number inside the range
        let joke = this.getJoke(number); // Fetch joke
        this.bot.sendMessage(chatId, await translateText(joke,this.getUserLanguage(chatId)));
        return;
        }
        this.bot.sendMessage(chatId,`The number ${number} is outside the valid range. \nPlease enter a number between 1 and 101.`);
        return;
    }
    

    // Check if the message is to set the language
    const setLanguageRegex = /^set\s+language\s+(\w+)$/i;
    const matchLangPattern = setLanguageRegex.exec(messageText);
    if (matchLangPattern) {

        const language = matchLangPattern[1]; // Extract the language
        const languageCode = this.getLanguageCode(language);            
        if (!languageCode) {
            this.bot.sendMessage(chatId, `The Language set to: ${language} is not vaild. \nPlease choose a supported language.`);
            return;
        }
        this.setUserLanguage(chatId,languageCode);
        // Translate and send.
        const translatedText = await translateText("No problem", languageCode).catch((err) => {
            console.error(err);
            return;
        });
        this.bot.sendMessage(chatId, translatedText);
        return;
    }
    
    this.bot.sendMessage(chatId, `Sorry, I didn't recognize that instruction. \nPlease check the available commands and try again.`);
    
  }

  // Get language ISO 639-1 code for later translator
  getLanguageCode(language) {
    const lowercasedLanguage = language.toLowerCase();
    const languageCode = iso6391.getCode(lowercasedLanguage); // Get the ISO 639-1 code
    if (languageCode) {
        return languageCode;
    } else {
        console.error(`Language code not found for ${language}`);
        return null;
    }
  }

  getUserLanguage(chatId) {
    return this.usersLanguage[chatId] || 'en';
  }

  setUserLanguage(chatId, language) {
    this.usersLanguage[chatId] = language;
  }
  
  getJoke(jokeNumber) {
    // Fetch joke and send at the right format
    return jokeNumber.toString() + '. ' + this.jokes[jokeNumber-1];
  }

}

// Usage
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
if (!telegramToken) {
  console.error('Please provide a valid Telegram bot token.');
  process.exit(1);
}

const chuckBot = new ChuckBot(telegramToken);
chuckBot.startBot();
