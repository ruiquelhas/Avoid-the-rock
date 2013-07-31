var cheerio = require('cheerio');
var expect = require('expect.js');

module.exports.run = function () {
  var context, $;

  describe('test the driver resource page', function () {
    beforeEach(function (done) {
      context = this.client;
      context.visit('/driver', function () {
        $ = cheerio.load(context.html('#driver'));
        done();
      });
    });

    it('should return an HTTP OK 200 status code', function () {
      expect(context.statusCode).to.be(200);
    });

    it('should have a reference to the controller script', function () {
      expect(context.window.driverController).not.to.be(undefined);
    });
  });
};