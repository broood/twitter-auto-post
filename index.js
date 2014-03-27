var OAuth = require("oauth").OAuth;

var twitter = (function() {

	var requestTokenUrl = "https://api.twitter.com/oauth/request_token",
		accessTokenUrl = "https://api.twitter.com/oauth/access_token",
		updateUrl = "https://api.twitter.com/1.1/statuses/update.json";

	return {

		post: function(obj) {

			obj = obj || {};
			var callback = obj.callback || function(){};
			var accessToken = obj.accessToken;
			var accessTokenSecret = obj.accessTokenSecret;
			var apiKey = obj.apiKey;
			var apiSecret = obj.apiSecret;
			var message = obj.message;

			if(message && accessToken && accessTokenSecret && apiKey && apiSecret) {

				var tweet = new OAuth(requestTokenUrl, accessTokenUrl, apiKey, apiSecret, "1.0", null, "HMAC-SHA1");

				tweet.post(
					updateUrl, 
					accessToken, 
					accessTokenSecret, 
					{"status":message}, 
					"application/json", 
					function(err, data, response) {
						if(err) {
							callback(err);
							return;
						}

						callback(null, response);
					}
				);
			} else {
				callback("message, accessToken, accessTokenSecret, apiKey, apiSecret are required.");
			}
		}
	};
})();

module.exports = twitter;
