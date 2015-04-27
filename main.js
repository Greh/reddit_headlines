"use strict";
let http = require('http');

let get = function (subreddit, params, callback) {
	let url = `http://www.reddit.com/r/${subreddit}/hot.json`;
	if (params) {
		url += `?after=${params.after}&limit=${params.limit}`;
	}
	http.get(url, function (res) {
		let body = '';
		
		res.on('data', function (chunk) {
			body += chunk;
		});
		res.on('end', function () {
			callback (JSON.parse(body));
		});
	});
};

module.exports.get = get;

if (!module.parent) { // if not loaded as a module
	let counter = process.argv[3],
		subreddit = process.argv[2];

	let log = function (body) {
		// console.log(subreddit);
		let after = body.data.after;
		// console.log(after);
		for (let post of body.data.children) {
			console.log(post.data.title);
		}
		if (counter) {
			counter--;
			get(subreddit, { after: after, limit: 100 }, log);
		}
	}

	get(subreddit, { limit: 100 },  log);
}