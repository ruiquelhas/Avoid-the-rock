var moment = require('moment');

function RankingController(selector, socket) {
  this.selector = selector;
  this.socket = socket;
}

function createRankingEntryDOMString(entry) {
  return [
    '<li class="ranking-entry">',
    '<div class="ranking-entry-points">',
    entry.points,
    ' point(s)</div>',
    '<div class="ranking-entry-date">',
    moment(entry.date).fromNow(),
    '</div>',
    '</li>'
  ].join('');
}

RankingController.prototype.bind = function () {
  var self = this, entry;
  self.socket.on('data', function (data) {
    if (data.type === 'ranking-update') {
      for (var i = 0, len = data.payload.length; i < len; i++) {
        entry = createRankingEntryDOMString(data.payload[i]);
        self.selector.append(entry);
      }
    }
  });
};

module.exports.create = function (selector, socket) {
  return new RankingController(selector, socket);
};