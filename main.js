"use strict";
let http = require('http');

let get = function (subreddit, callback, params) {
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
	let counter = [1,2,3,4,5].entries();

	let log = function (body) {
		let after = body.data.after;
		// console.log(after);
		for (let post of body.data.children) {
			console.log(post.data.title);
		}
		if (counter.next().value) {
			get('bjj', log, { after: after, limit: 100 });
		}
	}

	get(process.argv[2], log, { limit: 100 });
}