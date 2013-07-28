var ImageRepository = function (assets) {
  this.assets = assets;
};

ImageRepository.prototype.load = function (callback) {
  var context = this;
  var numberOfImagesLoaded = 0;
  var images = {};

  function numberOfAssets() {
    var counter = 0;
    for (var asset in context.assets) {
      counter += 1;
    }
    return counter;
  }

  function loadImage() {
    numberOfImagesLoaded += 1;
    if (numberOfImagesLoaded === numberOfAssets()) {
      return callback(images);
    }
  }

  for (var asset in context.assets) {
    if (typeof Image !== 'undefined') {
      images[asset] = new Image();
      images[asset].onload = loadImage;
      images[asset].src = context.assets[asset];
    } else {
      images[asset] = {};
      images[asset].src = context.assets[asset];
      loadImage();
    }
  }
};

module.exports.create = function (assets) {
  return new ImageRepository(assets);
};