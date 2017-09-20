// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Instantiates a client
// const language = Language();


var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  var language = Language();
} else {
  var language = Language({
    credentials: {
      "type": process.env.type || null,
      "project_id": process.env.project_id || null,
      "private_key_id": process.env.private_key_id || null,
      "private_key": process.env.private_key.replace(/\\n/g, '\n') || null,
      "client_email": process.env.client_email || null,
      "client_id": process.env.client_id || null,
      "auth_uri": process.env.auth_uri || null,
      "token_uri": process.env.token_uri || null,
      "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url || null,
      "client_x509_cert_url": process.env.client_x509_cert_url || null
    }
  });
}


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
