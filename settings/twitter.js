module.exports = function(twitter, config) {
  twitter = new twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret
  });

  twitter.verifyCredentials(function (err, data) {
    if (err) {
      console.log('nTwitter credentials not valid!!');
      throw 'Credentials error || Abort program';
    } else {
      console.log('Valid nTwitter credentials!');
    }
  });

  return twitter;
};