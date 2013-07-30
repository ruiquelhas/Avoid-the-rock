function PlayerCanvasController(player, selector) {
  this.player = player;
  this.selector = selector;
}

PlayerCanvasController.prototype.drawPlayer = function () {
  this.player.draw(this.selector.get(0));
};

PlayerCanvasController.prototype.erasePlayer = function () {
  this.player.erase(this.selector.get(0));
};

PlayerCanvasController.prototype.movePlayerLeft = function (delta) {
  if (delta > 0) {
    this.erasePlayer();
    this.player.move(-delta, 1, this.selector.get(0));
    this.drawPlayer();
  }
};

PlayerCanvasController.prototype.movePlayerRight = function (delta) {
  if (delta > 0) {
    this.erasePlayer();
    this.player.move(delta, this.selector.width(), this.selector.get(0));
    this.drawPlayer();
  }
};

PlayerCanvasController.prototype.saveScore = function (socket) {
  socket.write({
    type: 'score-update',
    payload: {
      'date': new Date(),
      'points': this.player.score
    }
  });
};

PlayerCanvasController.prototype.showCanvas = function () {
  this.selector.parent().show();
  this.selector.show();
};

PlayerCanvasController.prototype.hideCanvas = function () {
  this.selector.hide();
  this.selector.parent().hide();
};

module.exports.create = function (player, selector) {
  return new PlayerCanvasController(player, selector);
};