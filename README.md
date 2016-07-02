# medium-node
Simple JS-based wrapper for Medium JSON user feeds

## Installation

     npm install medium-node

## Usage

The only function available is `getUser`. It accepts a medium.com username and returns a `Promise` for a user's most recent posts on Medium. You cannot paginate; only the latest posts are available.

    import medium from 'medium-node';
    
    let userFeed = medium.getUser('tashian');
    userFeed.then((user) =>
      console.log(user.posts[0]);
    )
