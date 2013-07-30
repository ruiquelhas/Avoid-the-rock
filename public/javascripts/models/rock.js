var Rock = function (image) {
  this.alive = false;

  this.image = image;

  this.x = 0;
  this.y = 0;
  this.speed = 0;

  this.height = image.height;
  this.width = image.width;
};

Rock.prototype.draw = function (canvas) {
  this.erase(canvas);
  this.y += this.speed;
  if (this.y > canvas.height) return true;
  canvas.getContext('2d').drawImage(this.image, this.x, this.y, this.width, this.height);
};

Rock.prototype.erase = function (canvas) {
  canvas.getContext('2d').clearRect(this.x, this.y,
    this.width, this.height);
};

Rock.prototype.spawn = function (x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;

  this.alive = true;
};

Rock.prototype.clear = function () {
  this.x = 0;
  this.y = 0;
  this.speed = 0;

  this.alive = false;
};

module.exports.create = function (image) {
  return new Rock(image);
};