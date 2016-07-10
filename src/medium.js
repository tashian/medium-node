import request from 'request';

export default class Medium {
  constructor(username) {
    if (username.charAt(0) == '@') {
      username = username.substr(1);
    }

    if (username.match(/[\/\\@&?]/)) {
      return new Error("Invalid characters in username " + username);
    }

    this.username = username;
  }

  fetch() {
    var that = this;
    return new Promise((resolve, reject) => {
      request('https://medium.com/@' + this.username + '/latest?format=json',
        function(err, response) {
          if (!err && response.statusCode == 200) {
            resolve(
              JSON.parse(response.body.replace('])}while(1);</x>', '')).payload
            );
          } else {
            reject('Error: ' + response.statusCode)
          }
        });
    });
  }
}
