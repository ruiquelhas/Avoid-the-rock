var expect = require('expect.js');

var Rock = require('../../public/javascripts/models/rock.js');
var Player = require('../../public/javascripts/models/player.js');

module.exports.run = function () {
  var imageMock = { width: 46, height: 46 };
  var canvasMock = { width: 500, height: 500 };

  describe('test the rock class', function () {
    beforeEach(function () {
      this.rock = Rock.create(imageMock);
    });

    it('should return a valid Rock instance', function () {
      expect(this.rock).not.to.be(undefined);
    });

    it('should have the required dimensions', function () {
      expect(this.rock.width).to.be(imageMock.width);
      expect(this.rock.height).to.be(imageMock.height);
    });

    it('should be initialized and get its position and speed', function () {
      var x = 10, y = 0, speed = 2;
      this.rock.spawn(x, y, speed);
      expect(this.rock.x).to.be(x);
      expect(this.rock.y).to.be(y);
      expect(this.rock.speed).to.be(speed);
      expect(this.rock.alive).to.be(true);
    });

    it('should see all instance variables cleared correctly', function () {
      this.rock.clear();
      expect(this.rock.x).to.be(0);
      expect(this.rock.y).to.be(0);
      expect(this.rock.speed).to.be(0);
      expect(this.rock.alive).to.be(false);
    });
  });
};