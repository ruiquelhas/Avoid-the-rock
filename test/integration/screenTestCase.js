var cheerio = require('cheerio');
var expect = require('expect.js');
var Primus = require('primus');

module.exports.run = function () {
  var context, $;

  describe('test the screen resource page', function () {
    beforeEach(function (done) {
      context = this.client;
      context.visit('/screen', function () {
        $ = cheerio.load(context.html('#screen'));
        done();
      });
    });

    it('should return a HTTP 200 OK status code', function () {
      expect(context.statusCode).to.be(200);
    });

    it('should have a reference to the controller script', function () {
      expect(context.window.screenController).not.to.be(undefined);
    });

    describe('test the realtime server connection', function () {
      it('should have a reference to the primus library', function () {
        expect(context.window.Primus).not.to.be(undefined);
      });

      it('should have a Primus instance available', function () {
        expect(context.window.screenController.primus).not.to.be(undefined);
      });
    });

    describe('test the essential page components', function () {
      it('should have a reference to the jQuery library', function () {
        expect(context.window.jQuery).not.to.be(undefined);
      });

      it('should have a reference to the Muzzley library', function () {
        expect(context.window.muzzley).not.to.be(undefined);
      });

      it('should have two different canvas', function () {
        expect($('canvas').length).to.be(2);
      });

      it('should have two canvases with the same dimensions', function () {
        var $playerCanvas = $('#player'), $actionCanvas = $('#action');
        expect($playerCanvas.attr('width')).to.be($actionCanvas.attr('width'));
        expect($playerCanvas.attr('height')).to.be($actionCanvas.attr('height'));
      });
    });

    afterEach(function () {
      context.window.screenController.primus.write({ type: 'disconnect' });
    });
  });
};