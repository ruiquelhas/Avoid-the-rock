var expect = require('expect.js');
var sinon = require('sinon');

var Player = require('../../public/javascripts/models/player.js');

module.exports.run = function () {
  var imageMock = { width: 46, height: 46 }, x = 0, y = 0;

  describe('test the player class', function () {
    beforeEach(function () {
      this.player = Player.create(imageMock, x, y);
    });

    it('returns a valid player instance', function () {
      expect(this.player).not.to.be(undefined);
    });

    it('has the provided dimensions', function () {
      expect(this.player.width).to.be(imageMock.width);
      expect(this.player.height).to.be(imageMock.height);
    });

    it('is positioned as required', function () {
      expect(this.player.x).to.be(x);
      expect(this.player.y).to.be(y);
    });

    it('has a move method available', function () {
      expect(this.player.move).not.to.be(undefined);
    });

    it('the move method should increment x with a value of delta', function () {
      var delta = 10, diff = this.player.x + delta;
      this.player.move(delta);
      expect(this.player.x).to.be(diff);
    });
  });
};