function PlayerCanvasController(player, selector) {
  this.player = player;
  this.selector = selector;
}

PlayerCanvasController.prototype.drawPlayer = function () {
  this.selector
    .get(0)
    .getContext('2d')
    .drawImage(this.player.image, this.player.x, this.player.y,
      this.player.width, this.player.height);
};

PlayerCanvasController.prototype.erasePlayer = function () {
  this.selector
    .get(0)
    .getContext('2d')
    .clearRect(this.player.x, this.player.y,
      this.player.width, this.player.height);
};

PlayerCanvasController.prototype.movePlayerLeft = function (delta) {
  if (delta > 0) {
    this.erasePlayer();
    if (this.player.x - delta >= this.selector.offset().left) {
      this.player.move(-delta);
    } else {
      this.player.move(-this.player.x);
    }
    this.drawPlayer();
  }
};

PlayerCanvasController.prototype.movePlayerRight = function (delta) {
  if (delta > 0) {
    this.erasePlayer();
    if (this.player.x + delta <= this.selector.offset().right) {
      this.player.move(delta);
    } else {
      this.player.move(this.player.x);
    }
    this.drawPlayer();
  }
};

module.exports.create = function (player, selector) {
  return new PlayerCanvasController(player, selector);
};