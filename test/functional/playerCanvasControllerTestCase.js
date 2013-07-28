var expect = require('expect.js');

var PlayerCanvasController = require('../../public/javascripts/controllers/playerCanvasController');
var Player = require('../../public/javascripts/models/player.js');

module.exports.run = function () {
  describe('test the player canvas controller', function () {
    beforeEach(function () {
      var player = Player.create();
      this.playerCanvasController = PlayerCanvasController.create();
    });

    it('the controller returns a valid instance', function () {
      expect(this.playerCanvasController).not.to.be(undefined);
    });

    // it('the controller should have player instance associated', function () {

    // });
    // it('the controller should have a canvas associated', function () {

    // });
    // it('the controller should be able to draw a player on the canvas', function () {

    // });
  });
};