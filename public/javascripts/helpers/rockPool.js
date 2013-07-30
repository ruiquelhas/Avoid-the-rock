var Rock = require('../models/rock.js');

function RockPool(size) {
  this.size = size;
  this.elements = [];
}

RockPool.prototype.init = function (image) {
  for (var i = 0; i < this.size; i++) {
    this.elements[i] = Rock.create(image);
  }
};

RockPool.prototype.get = function (x, y, speed) {
  if(!this.elements[this.size - 1].alive) {
    this.elements[this.size - 1].spawn(x, y, speed);
    this.elements.unshift(this.elements.pop());
  }
};

RockPool.prototype.animate = function (canvas, player) {
  var status = { over: false, points: 0 };

  for (var i = 0; i < this.size; i++) {
    if (this.elements[i].alive) {
      var internalStatus = this.elements[i].draw(canvas, player);
      if (internalStatus.over) {
        this.elements[i].clear();
        this.elements.push((this.elements.splice(i, 1))[0]);
        status.points += 1;
      } else if (internalStatus.collision) {
        status.over = true;
      }
    }
    else break;
  }

  return status;
};

RockPool.prototype.clear = function (canvas) {
  for (var i = 0; i < this.size; i++) {
    if (this.elements[i].alive) {
      this.elements[i].erase(canvas)
    }
  }
};

module.exports.create = function (size) {
  return new RockPool(size);
}