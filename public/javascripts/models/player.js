var Player = function (image, x, y) {
  this.image = image;

  this.x = x;
  this.y = y;

  this.height = image.height;
  this.width = image.width;
};

Player.prototype.move = function (delta) {
  this.x += delta;
};

module.exports.create = function (image, x, y) {
  return new Player(image, x, y);
};