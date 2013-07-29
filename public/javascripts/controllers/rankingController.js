var $ = require('jquery-browserify');

function RankingController(selector, socket) {
  this.selector = selector;
  this.socket = socket;
}

function createRankingEntryDOMString(entry) {
  return [
    '<li class="ranking-entry">',
    '<div class="ranking-entry-date">',
    entry.date,
    '</div>',
    '<div class="ranking-entry-points">',
    entry.points,
    '</div>',
    '</li>'
  ].join('');
}

RankingController.prototype.bind = function () {
  var self = this, entry;
  self.socket.on('data', function (data) {
    if (data.type === 'ranking-full-update') {
      for (var i = 0, len = data.payload.length; i < len; i++) {
        entry = createRankingEntryDOMString(data.payload[i]);
        self.selector.append(entry);
      }
    } else if (data.type === 'ranking-incremental-update') {
      entry = createRankingEntryDOMString(data.payload);
      self.selector.append(entry);
    }
  });
};

module.exports.create = function (selector, socket) {
  return new RankingController(selector, socket);
};