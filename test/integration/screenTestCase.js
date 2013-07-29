var cheerio = require('cheerio');
var expect = require('expect.js');
var Primus = require('primus');

module.exports.run = function () {
  var context, $;

  describe('test the availability of the screen page', function () {
    beforeEach(function (done) {
      context = this.client;
      context.visit('/screen', function () {
        $ = cheerio.load(context.html('#screen'));
        done();
      });
    });

    it('the client should be able to visit the page', function () {
      expect(context.statusCode).to.be(200);
    });

    it('the client should have a reference to the controller script', function () {
      expect(context.window.screenController).not.to.be(undefined);
    });

    describe('test the availability of a websocket connection', function () {
      it('the client should have a reference to the primus library', function () {
        expect(context.window.Primus).not.to.be(undefined);
      });

      it('the client should have a websocket available', function () {
        expect(context.window.screenController.primus).not.to.be(undefined);
      });
    });

    describe('test the essential page components', function () {
      it('the client should have a reference to the jQuery library', function () {
        expect(context.window.jQuery).not.to.be(undefined);
      });

      it('the client should have a reference to the Muzzley library', function () {
        expect(context.window.muzzley).not.to.be(undefined);
      });

      it('the page should have two different canvas', function () {
        expect($('canvas').length).to.be(2);
      });

      it('the canvases should have the same dimensions', function () {
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