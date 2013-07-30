var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({ date: Date, score: Number });

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
module.exports.create = function (date, score) {
  return new Player({ date: date, score: score });
};