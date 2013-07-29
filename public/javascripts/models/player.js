var Player = function (image, x, y) {
  this.alive = true;
  this.score = 0;

  this.image = image;

  this.x = x;
  this.y = y;

  this.height = image.height;
  this.width = image.width;
};

Player.prototype.move = function (delta) {
  this.x += delta;
};

Player.prototype.updateScore = function () {
  this.score += 1;
};

Player.prototype.kill = function () {
  this.alive = false;
};

module.exports.create = function (image, x, y) {
  return new Player(image, x, y);
};