/* You'll need to have your Node server running for these tests to pass. 
 * 
 * Use this reference page for 'matcher' syntax
 * https://facebook.github.io/jest/docs/en/expect.html
*/

var axios = require('axios');
var request = require('request');

// Opens connection to lawa_db database. This won't work in travisCI

describe('/profile endpoint', () => {
  test('to respond to get requests with profile user names', () => {
    // using axios didn't work here, not sure why. Using request module with callbacks instead. 
    // return expect(Promise.resolve(axios.get('http://localhost:3000/profile'))).resolves.toBeDefined();
    request.get('http://localhost:3000/profile', function(err, response) {
      expect(response.body[0]).toHaveProperty('name');
    });
  });
});
