var expect = require('expect.js');

module.exports.run = function () {
  var context;

  beforeEach(function (done) {
    context = this.client;
    context.visit('/screen', done);
  });

  describe('test the availability of the screen page', function () {
    it('the client should be able to visit the page', function () {
      expect(context.statusCode).to.be(200);
    });
  });
};