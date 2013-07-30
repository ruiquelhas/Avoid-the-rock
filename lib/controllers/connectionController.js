function ConnectionController(connection) {
  this.connection = connection;
}

ConnectionController.prototype.init = function (callback) {
  this.connection.on('error', function (err) { return callback(err); });
  this.connection.on('open', function () { return callback(); });
};

module.exports.create = function (connection) {
  return new ConnectionController(connection)
};