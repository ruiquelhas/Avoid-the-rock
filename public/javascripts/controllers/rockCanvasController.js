function RockCanvasController(rockPool, selector) {
  this.rockPool = rockPool;
  this.selector = selector;
}

function generateControlledRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

RockCanvasController.prototype.drawRock = function (image) {
  var x = generateControlledRandomValue(1, this.selector.width()), y = 1 - image.height;
  var speed = generateControlledRandomValue(1, 3);
  this.rockPool.get(x, y, speed);
};

RockCanvasController.prototype.eraseRocks = function () {
  this.rockPool.clear(this.selector.get(0));
};

RockCanvasController.prototype.showCanvas = function () {
  this.selector.parent().show();
  this.selector.show();
};

RockCanvasController.prototype.hideCanvas = function () {
  this.selector.hide();
  this.selector.parent().hide();
};

module.exports.create = function (rockPool, selector) {
  return new RockCanvasController(rockPool, selector);
};