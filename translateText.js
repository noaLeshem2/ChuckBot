
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { isUnexpected } = require("@azure-rest/ai-translation-text");

require("dotenv").config();


const apiKey = process.env.AZURE_TRANSLATOR_API_KEY;
const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;
const region = process.env.AZURE_REGION;

async function translateText(targetText, targetLanguage) {
  if(targetLanguage === 'en'){
    return targetText;
  }
  
    const translateCedential = {
      key: apiKey,
      region,
    };
    const translationClient = TextTranslationClient(endpoint, translateCedential);
  
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
      //   `Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`
      // );
    }
  }
  
translateText("This is a test", "cs").catch((err) => {
    console.error(err);
});
  

module.exports = translateText;