// translateText.js
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { isUnexpected } = require("@azure-rest/ai-translation-text");

require("dotenv").config();


const TRANSLATOR_API_KEY = process.env.AZURE_TRANSLATOR_API_KEY;
const TRANSLATOR_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
const TRANSLATOR_REGION = process.env.AZURE_REGION;


// Translate text from english to targetLanguage
async function translateText(targetText, targetLanguage) {

  if(targetLanguage === "en"){
    return targetText;
  }
  
  const translateCedential = {
    key: TRANSLATOR_API_KEY,
    region: TRANSLATOR_REGION,
  };
  const translationClient = TextTranslationClient(TRANSLATOR_ENDPOINT, translateCedential);

  const inputText = [{ text: targetText }];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: targetLanguage,
      from: "en",
    },
  });

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body.error;
  }

  const translations = translateResponse.body;
  for (const translation of translations) {
    return translation?.translations[0]?.text;
  }
}
  

module.exports = translateText;