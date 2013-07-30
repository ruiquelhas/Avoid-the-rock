var expect = require('expect.js');
var sinon = require('sinon');

var Player = require('../../public/javascripts/models/player.js');

module.exports.run = function () {
  var imageMock = { width: 46, height: 46 };
  var canvasMock = { width: 500, height: 500 };
  var x = canvasMock.width / 2 - imageMock.width / 2;
  var y = canvasMock.height - imageMock.height;
  var leftMargin = 1, rightMargin = canvasMock.width - 1;

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

    it('should move delta pixels left and right when delta does not exceed margin', function () {
      var delta = 10, diff = this.player.x - delta;
      this.player.move(-delta, leftMargin, canvasMock);
      expect(this.player.x).to.be(diff);
      this.player.move(delta, rightMargin, canvasMock);
      expect(this.player.x).to.be(x);
    });

    it('should move to the margin when the delta exceeds it', function () {
      var delta = canvasMock.width + 1, diff = rightMargin - this.player.width;
      this.player.move(-delta, leftMargin, canvasMock);
      expect(this.player.x).to.be(leftMargin);
      this.player.move(delta, rightMargin, canvasMock);
      expect(this.player.x).to.be(diff);
    });

    it('should increment the score with the update value', function () {
      var expected = this.player.score + 1;
      this.player.update(1);
      expect(this.player.score).to.be(expected);
    });

  });
};