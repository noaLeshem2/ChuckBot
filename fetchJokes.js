const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');
require("dotenv").config();

const jokesUrl = 'https://parade.com/968666/parade/chuck-norris-jokes/';
const proxyUrl = process.env.PROXY_URL;  // Replace with your actual proxy URL
const apiKey = process.env.PROXY_API_KEY;  // Replace with your actual API key

async function fetchChuckNorrisJokes() {
  try {
    // Fetch the HTML content from the URL
    const scrapeOpsUrl = getScrapeOpsUrl(jokesUrl);
    const response = await axios.get(scrapeOpsUrl);
    const html = response.data;

    // Use cheerio to load the HTML content
    const $ = cheerio.load(html);

    // Extract Chuck Norris jokes from the HTML
    const chuckNorrisJokes = [];

    $('ol li').each((index, element) => {
      const jokeText = $(element).text().trim();
      chuckNorrisJokes.push(jokeText);
    });

    // Display the extracted jokes
    console.log(chuckNorrisJokes);

    // Return the extracted jokes for later use
    return chuckNorrisJokes;
  } catch (error) {
    console.error('Error fetching Chuck Norris jokes:', error.message);
    return [];
  }
}


function getScrapeOpsUrl(url) {
    const payload = {
      api_key: apiKey,
      url: url,
    };
    const proxyUrl = 'https://proxy.scrapeops.io/v1/?' + querystring.stringify(payload);
    return proxyUrl;
  }
  

//let jokes = fetchChuckNorrisJokes();
module.exports = fetchChuckNorrisJokes;