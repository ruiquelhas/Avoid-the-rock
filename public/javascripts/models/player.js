var SERVER_MESSAGE = 'score-update';

var Player = function (image, x, y) {
  this.score = 0;

  this.image = image;

  this.x = x;
  this.y = y;

  this.height = image.height;
  this.width = image.width;
};

Player.prototype.draw = function (canvas) {
  // first clear the canvas area
  this.erase(canvas);
  // then draw
  canvas.getContext('2d').drawImage(this.image, this.x,
    this.y, this.width, this.height);
};

Player.prototype.erase = function (canvas) {
  canvas.getContext('2d').clearRect(this.x, this.y,
    this.width, this.height);
};

Player.prototype.move = function (delta, margin, canvas) {
  if (delta < 1) {
    this.x += (this.x + delta > margin) ? delta : -(this.x - margin);
  } else {
    this.x += (this.x + this.width + delta < margin) ? delta : margin - this.x - this.width;
  }
};

Player.prototype.save = function (server) {
  var playerScore = this.score;
  server.write({ type: SERVER_MESSAGE, payload: { date: new Date(), score: playerScore } });
};

module.exports.create = function (image, x, y) {
  return new Player(image, x, y);
};