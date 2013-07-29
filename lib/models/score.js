var mongoose = require('mongoose');

var scoreSchema = mongoose.Schema({ date: Date, points: Number });

var Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
module.exports.create = function (date, points) {
  return new Score({ date: date, points: points });
};