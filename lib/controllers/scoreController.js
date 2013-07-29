var mongoose = require('mongoose');

function ScoreController(spec, connection) {
  this.spec = spec;
  this.connection = connection;
}

ScoreController.prototype.init = function (callback) {
  this.connection.on('error', function (err) { return callback(err); });
  this.connection.on('open', function () { return callback(); });
};

ScoreController.prototype.saveScore = function (score, callback) {
  score.save(function (err, score) {
    if (err) return callback(err);
    return callback(null, score);
  });
};

ScoreController.prototype.allScores = function (callback) {
  this.spec.find(function (err, scores) {
    if (err) return callback(err);
    return callback(null, scores);
  });
};

module.exports.create = function (spec, connection) {
  return new ScoreController(spec, connection);
};