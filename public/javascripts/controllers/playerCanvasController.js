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
    // left margin = 1 (because it has 1px border)
    var marginLeft = 1;
    if (this.player.x - delta > marginLeft) {
      this.player.move(-delta);
    } else {
      this.player.move(-(this.player.x - marginLeft));
    }
    this.drawPlayer();
  }
};

PlayerCanvasController.prototype.movePlayerRight = function (delta) {
  if (delta > 0) {
    this.erasePlayer();
    // right margin = width - 1 (it has a 1px border)
    var marginRight = this.selector.width() - 1;
    if (this.player.x + this.player.width + delta < marginRight) {
      this.player.move(delta);
    } else {
      this.player.move(marginRight - this.player.x - this.player.width);
    }
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