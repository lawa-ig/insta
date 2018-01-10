var expect = require('chai').expect;
var server = require('../server/index.js');


describe('server', function () {
  describe('GET /', function () {
    it('should return the content of index.html', function (done) {
      // just assume that if it contains an <input> tag its index.html
      request
        .get('/')
        .expect(200, /<input/, done);
    });
  });
});


