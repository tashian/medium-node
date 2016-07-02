# medium-node
Simple JS-based wrapper for Medium JSON user feeds

## Installation

     npm install medium-node

## Usage

The only function available is `getUser`. It accepts a medium.com username and returns a `Promise` for a user's most recent posts on Medium. No pagination support yet; only the latest posts are available.

    var medium = require('medium-node');

    var userFeed = medium.getUser('tashian');
    userFeed.then(function(latest) {
      console.log(latest.references.Post);
    });

The response format is undocumented, but you can see an example [here](https://medium.com/@tashian/latest?format=json). This module only returns the "payload" section. Take a look at references.Post for the latest posts.

