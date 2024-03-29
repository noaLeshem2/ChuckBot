// fetchJokes.js

const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');
require("dotenv").config(); // Load environment variables

const JOKES_URL = 'https://parade.com/968666/parade/chuck-norris-jokes/';
const PROXY_API_KEY = process.env.PROXY_API_KEY;  

// Fetch Chuck Norris jokes from the specified URL
async function fetchChuckNorrisJokes() {
  try {
    const scrapeOpsUrl = getScrapeOpsUrl(JOKES_URL); // Fetch the HTML content
    const response = await axios.get(scrapeOpsUrl);
    const html = response.data;

    const $ = cheerio.load(html);
    const chuckNorrisJokes = [];

    // Extract Chuck Norris jokes from the HTML
    $('ol li').each((index, element) => {
      const jokeText = $(element).text().trim();
      chuckNorrisJokes.push(jokeText);
    });

    return chuckNorrisJokes;
  } catch (error) {
      console.error('Error fetching Chuck Norris jokes:', error.message);
      return [];
  }
}

// Generate the URL for proxying requests
function getScrapeOpsUrl(url) {
    const payload = {
      api_key: PROXY_API_KEY,
      url: url,
    };
    const proxyUrl = 'https://proxy.scrapeops.io/v1/?' + querystring.stringify(payload);
    return proxyUrl;
  }
  
module.exports = fetchChuckNorrisJokes;