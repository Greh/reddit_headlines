Reddit Headlines
===============

A node module and command line application for getting headlines from a subreddit. Requires ES6.

###Usage

Command line (piped to stdout):
```bash
iojs main.js <subreddit> <count> # count is the number of posts to get in 100s (1 = 100, 2 = 200...)
```

As a module:
```javascript
let reddHead = require('reddit_headlines');

reddHead.get('askreddit', { limit: 100 }, function (body) { // get the first 100 posts from /r/AskReddit
  for (let post of body.data.children) {
    console.log(post.data.title);
  }
}
