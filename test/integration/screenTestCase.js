var expect = require('expect.js');
var Primus = require('primus');

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

    it('the client should have a reference to the controller script', function () {
      expect(context.window.screenController).not.to.be(undefined);
    });

    describe('test the availability of a websocket connection', function () {
      it('the client should have a reference to the primus library', function () {
        expect(context.window.Primus).not.to.be(undefined);
      });

      it('should have a websocket available', function () {
        expect(context.window.screenController.primus).not.to.be(undefined);
      });
    });
  });

  afterEach(function () {
    context.window.screenController.primus.write('disconnect');
  });
};