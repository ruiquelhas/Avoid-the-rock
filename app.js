
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var Primus = require('primus');
var device = require('express-device');
var mongoose = require('mongoose');

var dbAddress = 'mongodb://localhost/avoidtherock';

var Player = require('./lib/models/player');

var ConnectionController = require('./lib/controllers/connectionController');
var PlayerController = require('./lib/controllers/playerController');

var app = express();

var connectionController, playerController;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(device.capture());
app.enableDeviceHelpers();
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}

app.get('/', routes.index);
app.get('/screen', routes.screen);
app.get('/driver', routes.driver);

mongoose.connect(dbAddress);

function sendCurrentRanking(spark) {
  playerController.ranking(function (err, players) {
    if (err) console.log('[ERROR]', err);
    else spark.write({ type: 'ranking-update', payload: players });
  });
}

function savePlayerScore(info, spark) {
  var player = Player.create(info.date, info.score);
  playerController.saveScore(player, function (err) {
    if (err) console.log('[ERROR]', err);
    else sendCurrentRanking(spark);
  });
}

function setUpWebServer(callback) {
  var server = http.createServer(app);
  server.listen(app.get('port'), function () {
    if ('development' === app.get('env')) {
      console.log('[INFO] Express server listening on port ' + app.get('port'));
    }
  });
  return callback(server);
}

function setUpRealtimeMiddleware(server, callback) {
  var primus = new Primus(server, { transformer: 'engine.io', parser: 'JSON' });
  primus.on('connection', function (spark) {
    spark.on('data', function (message) {
      if (message.type === 'score-update') {
        savePlayerScore(message.payload, spark);
      } else if (message.type === 'disconnect') {
        spark.end();
      }
    });
    sendCurrentRanking(spark);
  });
  return callback(server);
}

function loadApp(callback) {
  connectionController = ConnectionController.create(mongoose.connection);
  connectionController.init(function (err) {
    if (err) console.log('[ERROR]', err);
    else setUpWebServer(function (server) {
      playerController = PlayerController.create(Player);
      setUpRealtimeMiddleware(server, callback);
    });
  });
}

module.exports.loadApp = loadApp;

if (!module.parent) {
  loadApp(function (server) {
    if (server) console.log('\n[INFO] All components have been installed');
  });
}