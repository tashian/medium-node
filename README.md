# medium-node
Simple JS-based wrapper for Medium JSON user feeds

## Installation

     npm install medium-node

## Usage

This class accepts a medium.com username in the constructor and offers one function, `fetch()`, which returns a `Promise` for that user's most recent posts on Medium. No pagination support yet; only the latest posts are available.

    var Medium = require('medium-node');
    var user = new Medium('username')

    var userFeed = user.fetch();
    userFeed.then(function(latest) {
      console.log(latest.references.Post);
    });

The response format is undocumented, but you can see an example [here](https://medium.com/@tashian/latest?format=json). This module only returns the "payload" section. Take a look at references.Post for the latest posts.
