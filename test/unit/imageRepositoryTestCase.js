var expect = require('expect.js');
var sinon = require('sinon');

var ImageRepository = require('../../public/javascripts/helpers/ImageRepository');

module.exports.run = function () {
  describe('test the ImageRepository class', function () {
    beforeEach(function () {
      this.imageRepository = ImageRepository.create({
        player: '/images/muzzley.png',
        rock: '/images/rock.png'
      });
    });

    it('returns a valid instance', function () {
      expect(this.imageRepository).not.to.be(undefined);
    });

    it('the instance has a loadImages function', function () {
      expect(this.imageRepository.load).not.to.be(undefined);
    });

    it('should load the provided assets into images', function (done) {
      this.imageRepository.load(function (images) {
        expect(images.player.src).to.be('/images/muzzley.png');
        expect(images.rock.src).to.be('/images/rock.png');
        done();
      });
    });
  });
};