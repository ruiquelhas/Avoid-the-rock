var cheerio = require('cheerio');
var expect = require('expect.js');

module.exports.run = function () {
  var context, $;

  describe('test the availability of the driver page', function () {
    beforeEach(function (done) {
      context = this.client;
      context.visit('/driver', function () {
        $ = cheerio.load(context.html('#driver'));
        done();
      });
    });

    it('the client should be able to visit the page', function () {
      expect(context.statusCode).to.be(200);
    });

    it('the client should have a reference to the controller script', function () {
      expect(context.window.driverController).not.to.be(undefined);
    });
  });
};