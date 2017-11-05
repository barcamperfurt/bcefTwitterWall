(function() {
	if (window.dinding === null) window.dinding = {};

	dinding = {};

	var host = window.location.hostname;

	var lastTweet = '';
	var lastUser = '';

	dinding.socket = io.connect();
	dinding.showTweets = 20;

	dinding.tweetCount = 0;

	dinding.socket.on('connect', function() {
		console.log('K! Were connected now. Please start transmission!');
		dinding.socket.emit('beginTransmisson');
	});

	dinding.socket.on('hashtags', function(tags) {
		// Clear hashtag list
		$('.nav').empty();

		// Write new tags
		tags.forEach(function(tag) {
			$('<li><a>' + tag + '</a></li>').prependTo('.nav');
		});
	});

	dinding.socket.on('tweet', function(data) {
		//dinding.twCount();
		if (lastTweet == data.text && lastUser == data.user.screen_name) {
			console.log('double');
			$('<li></li>')
				.html(
					'<div class="tweet-content">' +
						data.text +
						'</div><div class="tweet-author"><img style="height: 48px; width: 48px;" src="' +
						data.user.profile_image_url +
						'" /><a target="_blank" href="http://twitter.com/' +
						data.user.screen_name +
						'">' +
						data.user.screen_name +
						'</a></div>'
				)
				.prependTo('#dinding')
				.css({ opacity: 0 })
				.slideDown('slow')
				.animate({ opacity: 1 }, 'slow');

			$($('#dinding li')[dinding.showTweets]).remove();
		}

		lastTweet = data.text;
		lastUser = data.user.screen_name;
	});

	dinding.socket.on('tweetSearch', function(data) {
		//dinding.twCount();

		$('<li></li>')
			.html(
				'<div class="tweet-author"><img style="height: 48px; width: 48px;" src="' +
					data.user.profile_image_url +
					'" /></div><div class="tweet-content"><div class="tweet-author-link"><a target="_blank" href="http://twitter.com/' +
					data.user.screen_name +
					'">@' +
					data.user.screen_name +
					'</a></div>' +
					data.text +
					'</div>'
			)
			.prependTo('#dinding')
			.css({ opacity: 0 })
			.slideDown('slow')
			.animate({ opacity: 1 }, 'slow');

		$($('#dinding li')[dinding.showTweets]).remove();
	});

	dinding.twCount = function() {
		++dinding.tweetCount;
		$('#twCount').html(dinding.tweetCount);
	};
}.call(this));
