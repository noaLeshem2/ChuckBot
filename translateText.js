// const axios = require('axios').default;
// const { v4: uuidv4 } = require('uuid');

// let key = process.env.AZURE_TRANSLATOR_API_KEY;
// let endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;

// // location, also known as region.
// // required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
// let location = "westus";

// axios({
//     baseURL: endpoint,
//     url: '/translate',
//     method: 'post',
//     headers: {
//         'Ocp-Apim-Subscription-Key': key,
//             // location required if you're using a multi-service or regional (not global) resource.
//         'Ocp-Apim-Subscription-Region': location,
//         'Content-type': 'application/json',
//         'X-ClientTraceId': uuidv4().toString()
//     },
//     params: {
//         'api-version': '3.0',
//         'from': 'en',
//         'to': ['fr', 'zu']
//     },
//     data: [{
//         'text': 'I would really like to drive your car around the block a few times!'
//     }],
//     responseType: 'json'
// }).then(function(response){
//     console.log(JSON.stringify(response.data, null, 4));
// })




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