// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Instantiates a client
const language = Language();


module.exports = (text) => {
  // The text to analyze
  const document = {
    'content': text,
    type: 'PLAIN_TEXT'
  };
  
  // Detects the sentiment of the text
  return language.analyzeSentiment({'document': document})
    .then((results) => {
      const sentiment = results[0].documentSentiment;
  
      console.log(`Text: ${text}`);
      console.log(`Sentiment score: ${sentiment.score}`);
      console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
      return sentiment;
    })
    .catch((err) => {
      console.error('ERROR:', err);
      res.send('failed');
    });
};
