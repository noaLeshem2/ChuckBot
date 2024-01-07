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

const bot = new TelegramBot(telegramToken, { polling: true });
const usersLanguage = {}; // In-memory store for user language
const jokes = loadJokes();

async function startBot() {
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
        
        bot.sendMessage(chatId, `Sorry, I didn't recognize that instruction. \n Please check the available commands and try again.`);
        
    }


}

startBot();




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

function loadJokes() {
    return [
        "Chuck Norris doesn't read books. He stares them down until he gets the information he wants.",
        'Time waits for no man. Unless that man is Chuck Norris.',
        'If you spell Chuck Norris in Scrabble, you win. Forever.',
        'Chuck Norris breathes air ... five times a day.',
        'In the Beginning there was nothing ... then Chuck Norris roundhouse kicked nothing and told it to get a job.',
        'When God said, “Let there be light!” Chuck Norris said, “Say Please.”',
        'Chuck Norris has a mug of nails instead of coffee in the morning.',
        'If Chuck Norris were to travel to an alternate dimension in which there was another Chuck Norris and they both fought, they would both win.',
        'The dinosaurs looked at Chuck Norris the wrong way once. You know what happened to them.',
        "Chuck Norris' tears cure cancer. Too bad he has never cried.",
        'Chuck Norris once roundhouse kicked someone so hard that his foot broke the speed of light',
        "If you ask Chuck Norris what time it is, he always says, 'Two seconds till.' After you ask, 'Two seconds to what?' he roundhouse kicks you in the face.",
        "Chuck Norris appeared in the 'Street Fighter II' video game, but was removed by Beta Testers because every button caused him to do a roundhouse kick. When asked bout this “glitch,” Chuck Norris replied, “That's no glitch.”",
        'Since 1940, the year Chuck Norris was born, roundhouse kick related deaths have increased 13,000 percent.',
        'Chuck Norris does not own a stove, oven or microwave, because revenge is a dish best served cold.',
        'Chuck Norris does not sleep. He waits.',
        "There is no chin behind Chuck Norris' beard. There is only another fist.",
        'The chief export of Chuck Norris is pain.',
        'Chuck Norris recently had the idea to sell his pee as a canned beverage. It’s now called Red Bull.',
        'If paper beats rock, rock beats scissors, and scissors beats paper, what beats all 3 at the same time? Chuck Norris.',
        'On the 7th day, God rested ... Chuck Norris took over.',
        'Chuck Norris can dribble a bowling ball.',
        'Chuck Norris drinks napalm to fight his heartburn.',
        "Chuck Norris' roundhouse kick is so powerful, it can be seen from outer space by the naked eye.",
        "If you want a list of Chuck Norris' enemies, just check the extinct species list.",
        'Chuck Norris has never blinked in his entire life. Never.',
        'Chuck Norris once shot an enemy plane down with his finger, by yelling, “Bang!”',
        'Chuck Norris does not use spell check. If he happens to misspell a word, Oxford will change the spelling.',
        'Some kids pee their name in the snow. Chuck Norris can pee his name into concrete.',
        "Chuck Norris' calendar goes straight from March 31st to April 2nd, because no one fools Chuck Norris.",
        'Chuck Norris counted to infinity... twice.',
        'Chuck Norris can speak Braille.',
        'Chuck Norris can have both feet on the ground and kick butt at the same time.',
        'Chuck Norris can do a wheelie on a unicycle.',
        'Chuck Norris stands faster than anyone can run.',
        "Once a cobra bit Chuck Norris' leg. After five days of excruciating pain, the cobra died.",
        'Chuck Norris once won a game of Connect Four in three moves.',
        'Champions are the breakfast of Chuck Norris.',
        'When the Boogeyman goes to sleep every night he checks his closet for Chuck Norris.',
        'Chuck Norris can slam revolving doors.',
        'Chuck Norris does not hunt because the word hunting implies the possibility of failure. Chuck Norris goes killing.',
        'The dark is afraid of Chuck Norris.',
        'Chuck Norris can kill two stones with one bird.',
        'Chuck Norris can play the violin with a piano.',
        'Chuck Norris makes onions cry.',
        'Death once had a near-Chuck-Norris experience.',
        'When Chuck Norris writes, he makes paper bleed.',
        'Chuck Norris can strangle you with a cordless phone.',
        'Chuck Norris never retreats; He just attacks in the opposite direction.',
        'Chuck Norris can build a snowman out of rain.',
        'Chuck Norris once punched a man in the soul.',
        'Chuck Norris can drown a fish.',
        'Chuck Norris once had a heart attack. His heart lost.',
        'When Chuck Norris looks in a mirror, the mirror shatters. Because not even glass is dumb enough to get in between Chuck Norris and Chuck Norris.',
        "When Chuck Norris enters a room, he doesn't turn the lights on, he turns the dark off.",
        'The only time Chuck Norris was ever wrong was when he thought he had made a mistake.',
        'Chuck Norris can tie his shoes with his feet.',
        "The quickest way to a man's heart is with Chuck Norris's fist.",
        'Chuck Norris is the only person that can punch a cyclops between the eye.',
        'Chuck Norris used to beat up his shadow because it was following to close. It now stands 15 feet behind him.',
        'There has never been a hurricane named Chuck because it would have destroyed everything.',
        "Outer space exists because it's afraid to be on the same planet with Chuck Norris.",
        "When Chuck Norris does a pushup, he's pushing the Earth down.",
        'Chuck Norris is the reason why Waldo is hiding.',
        "Chuck Norris doesn't wear a watch. He decides what time it is.",
        'Chuck Norris does not get frostbite. Chuck Norris bites frost.',
        'In Pamplona, Spain, the people may be running from the bulls, but the bulls are running from Chuck Norris.',
        'Chuck Norris spices up his steaks with pepper spray.',
        'The Great Wall of China was originally created to keep Chuck Norris out. It didn’t work.',
        'Chuck Norris can get in a bucket and lift it up with himself in it.',
        "Most people have 23 pairs of chromosomes. Chuck Norris has 72... and they're all lethal.",
        'Chuck Norris is the only man to ever defeat a brick wall in a game of tennis.',
        "Chuck Norris doesn't shower, he only takes blood baths.",
        'Chuck Norris can divide by zero.',
        'The show Survivor had the original premise of putting people on an island with Chuck Norris. There were no survivors.',
        'Chuck Norris destroyed the periodic table, because Chuck Norris only recognizes the element of surprise.',
        'Chuck Norris once kicked a horse in the chin. Its descendants are now known as giraffes.',
        'When Chuck Norris was born, the only person who cried was the doctor. Never slap Chuck Norris.',
        'When Chuck Norris does division, there are no remainders.',
        'It takes Chuck Norris 20 minutes to watch 60 Minutes.',
        "Chuck Norris proved that we are alone in the universe. We weren't before his first space expedition.",
        'Chuck Norris once went skydiving, but promised never to do it again. One Grand Canyon is enough.',
        'Chuck Norris once ordered a steak in a restaurant. The steak did what it was told.',
        'We live in an expanding universe. All of it is trying to get away from Chuck Norris.',
        'Chuck Norris had to stop washing his clothes in the ocean. Too many tsunamis.',
        'Chuck Norris can sneeze with his eyes open.',
        'Chuck Norris can cook minute rice in 30 seconds.',
        'Chuck Norris beat the sun in a staring contest.',
        'Superman owns a pair of Chuck Norris undies.',
        "Chuck Norris doesn't breathe, he holds air hostage.",
        'Chuck Norris can clap with one hand.',
        "Chuck Norris doesn't need to shave. His beard is scared to grow.",
        'Before he forgot a gift for Chuck Norris, Santa Claus was real.',
        'In an average living room there are a thousand objects Chuck Norris could use to kill you, including the room itself.',
        'Chuck Norris invented airplanes because he was tired of being the only person that could fly.',
        "Chuck Norris's belly button is actually a power outlet.",
        'Freddy Krueger has nightmares about Chuck Norris.',
        'Chuck Norris is the only man who can fight himself and win.',
        "Chuck Norris's cowboy boots are made from real cowboys.",
        'Chuck Norris can start a fire with an ice cube.',
        'The flu gets a Chuck Norris shot every year.'
    ];
    return fetchChuckNorrisJokes();
}

function getJoke(jokeNumber) {
    // Fetch joke and send at the right format
    return jokeNumber.toString() + '. ' + jokes[jokeNumber-1];

}

