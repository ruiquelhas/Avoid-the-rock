var mongoose = require('mongoose');

function PlayerController(spec) {
  this.spec = spec;
}

PlayerController.prototype.saveScore = function (instance, callback) {
  instance.save(function (err, player) {
    if (err) return callback(err);
    return callback(null, player);
  });
};

PlayerController.prototype.ranking = function (callback) {
  this.spec
    .find()
    .sort({ score: 'desc', date: 'asc' })
    .exec(function (err, players) {
      if (err) return callback(err);
      return callback(null, players);
    });
};

module.exports.create = function (spec) {
  return new PlayerController(spec);
};