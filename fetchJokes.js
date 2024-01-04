const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://parade.com/968666/parade/chuck-norris-jokes/';

async function fetchChuckNorrisJokes() {
  try {
    // Fetch the HTML content from the URL
    //const response = await axios.get(url);
    const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        },
      });
    const html = response.data;

    // Use cheerio to load the HTML content
    const $ = cheerio.load(html);

    // Extract Chuck Norris jokes from the HTML
    const chuckNorrisJokes = [];

    $('.listicle-item p').each((index, element) => {
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

module.exports = fetchChuckNorrisJokes;