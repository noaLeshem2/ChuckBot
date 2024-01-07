# ChuckBot

ChuckBot is a Telegram bot that shares Chuck Norris jokes and supports multilingual responses.

## Features

- Receive Chuck Norris jokes by sending a number between 1 and 101.
- Set the language of the bot by sending a command like "set language French."
- Automatic language detection for common phrases.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- Telegram Bot Token (get it from the [BotFather](https://t.me/BotFather))
- Azure Translator API key and endpoint
- ScrapeOps API key for scraping data


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/noaLeshem2/ChuckBot.git

2. Install dependencies:

   ```bash
   npm install

3. Create a .env file in the project root and add the following variables:

   ```dotenv
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   AZURE_TRANSLATOR_API_KEY=your-azure-translator-api-key
   AZURE_TRANSLATOR_ENDPOINT=your-azure-translator-endpoint
   AZURE_REGION=your-azure-region
   PROXY_API_KEY=your-scraper-proxy-api-key

## Running the Bot

ChuckBot can be run either as a set of functions or as a class, providing flexibility for different preferences.

### Running as Functions

If you prefer running ChuckBot as a set of functions, follow these steps:


#### Navigate to the project directory
```bash
cd ChuckBot

#### Run the bot using functions
node bot.js

### Running as a Class

If you prefer an object-oriented approach and want to run ChuckBot as a class, follow these steps:

```bash
# Navigate to the project directory
cd ChuckBot

# Run the bot using functions
node chuckBot.js


2ץ
