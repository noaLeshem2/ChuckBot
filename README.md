# ChuckBot - Telegram Bot for Chuck Norris Jokes

## Overview

ChuckBot is a Telegram bot that tells 101 different Chuck Norris jokes in any language set by the user using the command 'set language [your language]'. The bot scrapes Chuck Norris jokes in real-time and translates them into the user's preferred language.

## Features

- Fetch Chuck Norris jokes from [parade.com](https://parade.com/968666/parade/chuck-norris-jokes/).
- Translate jokes to the user's preferred language using the Azure Translator API.
- Interactive Telegram bot that responds to user commands.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Azure account for translation service.
- Telegram Bot Token.
- ScrapeOps Proxy API key for scraping data.
### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ChuckBot.git
   cd ChuckBot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env` file with the following content:
   ```env
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   AZURE_TRANSLATOR_API_KEY=your_azure_translator_api_key
   AZURE_TRANSLATOR_ENDPOINT=your_azure_translator_endpoint
   AZURE_REGION=your_azure_region
   PROXY_API_KEY=your_proxy_api_key
   ```

## Running the Bot

ChuckBot can be run either as a set of functions or as a class, providing flexibility for different preferences.

### Running as Functions

If you prefer running ChuckBot as a set of functions, follow these steps:

```bash
# Run the bot using functions
node bot.js
```

### Running as a Class

If you prefer an object-oriented approach and want to run ChuckBot as a class, follow these steps:

```bash
# Run the bot using the class
node chuckBot.js
```

Choose the method that best fits your programming style and enjoy Chuck Norris jokes in your preferred way!

## Deployment

ChuckBot can be deployed on a cloud platform. This way you can connect to the service at any time.

## Usage

Start a chat with ChuckBot on Telegram - https://t.me/AssignmentChuckBot

