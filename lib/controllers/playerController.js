var mongoose = require('mongoose');

function PlayerController(spec, connection) {
  this.spec = spec;
  this.connection = connection;
}

PlayerController.prototype.init = function (callback) {
  this.connection.on('error', function (err) { return callback(err); });
  this.connection.on('open', function () { return callback(); });
};

PlayerController.prototype.saveScore = function (player, callback) {
  player.save(function (err, player) {
    if (err) return callback(err);
    return callback(null, player);
  });
};

PlayerController.prototype.ranking = function (callback) {
  this.spec.find(function (err, players) {
    if (err) return callback(err);
    return callback(null, players);
  }).sort({ score: 'desc', date: 'asc' });
};

module.exports.create = function (spec, connection) {
  return new PlayerController(spec, connection);
};