var expect = require('expect.js');

var imageRepository = require('../../public/javascripts/helpers/imageRepository');

module.exports.run = function () {
  describe('test the imageRepository class', function () {
    beforeEach(function () {
      this.imageRepository = imageRepository;
    });

    it('the class has a loadImages function', function () {
      expect(this.imageRepository.loadImages).not.to.be(undefined);
    });
  });
};