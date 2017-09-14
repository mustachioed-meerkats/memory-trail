const config = require('config');
const mailgun_config = config['mailgun'];
var mailgun = require('mailgun-js')({apiKey: mailgun_config.api_key, domain: mailgun_config.DOMAIN});

module.exports = (req, res) => {

  var emails = [
    'kevinzhuang10@gmail.com',
    'heyitsdylan@gmail.com',
    'davisss64@gmail.com',
    // 'lazdinst@gmail.com'
  ];

  var toProp = emails.join(', ');

  var htmlProp = '<html><a href="http://localhost:3000/">Visit our site!</a> %recipient.id%</html>';

  var rv = emails.reduce((obj, email) => {
    obj[email] = {id: email.split('@')[0]};
    return obj;
  }, {});

  var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: toProp,
    subject: 'What up katz',
    text: 'Boats N Holes',
    html: htmlProp,
    'recipient-variables': JSON.stringify(rv)
  };
  
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    res.send(body);
  });
};