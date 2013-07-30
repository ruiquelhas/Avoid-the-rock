var moment = require('moment');

function RankingController(selector, server) {
  this.selector = selector;
  this.server = server;
}

function createRankingEntryDOMString(entry) {
  return [
    '<li class="ranking-entry">',
    '<div class="ranking-entry-score">',
    entry.score,
    ' point(s)</div>',
    '<div class="ranking-entry-date">',
    moment(entry.date).fromNow(),
    '</div>',
    '</li>'
  ].join('');
}

RankingController.prototype.bind = function () {
  var self = this, entry;
  self.server.on('data', function (data) {
    if (data.type === 'ranking-update') {
      for (var i = 0, len = data.payload.length; i < len; i++) {
        entry = createRankingEntryDOMString(data.payload[i]);
        self.selector.append(entry);
      }
    }
  });
};

module.exports.create = function (selector, server) {
  return new RankingController(selector, server);
};