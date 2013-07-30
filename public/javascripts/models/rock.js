var Rock = function (image) {
  this.alive = false;

  this.image = image;

  this.x = 0;
  this.y = 0;
  this.speed = 0;

  this.height = image.height;
  this.width = image.width;
};

function objectsCollide(fst, snd) {
  if (fst.y + fst.height >= snd.y) {
    if (
      fst.x + fst.width >= snd.x &&
      fst.x + fst.width <= snd.x + snd.width ||
      snd.x + snd.width >= fst.x &&
      snd.x + snd.width <= fst.x + fst.width
    )
      return true;
  }
  return false;
}

Rock.prototype.draw = function (canvas, player) {
  var status = { over: false, collision: false };
  this.erase(canvas);
  this.y += this.speed;
  if (this.y > canvas.height) {
    status.over = true;
  } else if (objectsCollide(this, player)) {
    status.collision = true;
  } else {
    canvas.getContext('2d').drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  return status;
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