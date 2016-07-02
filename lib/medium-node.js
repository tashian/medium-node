import request from 'request';

export default function getUser(username) {
  return new Promise(function(resolve, reject) {
    if (username.charAt(0) == '@') {
      username = username.substr(1);
    }

    if (username.match(/[\/\\@&?]/)) {
      return reject(new Error("Invalid characters in username " + username));
    }

    request('https://www.medium.com/' + username + '/latest?format=json', function(err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
      
  });
}
