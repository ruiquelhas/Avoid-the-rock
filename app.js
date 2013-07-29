
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

var Score = require('./lib/models/score');
var ScoreController = require('./lib/controllers/scoreController');

var app = express();

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

var scoreController;

function setUpWebServer(callback) {
  var server = http.createServer(app);
  server.listen(app.get('port'), function(){
    if ('development' === app.get('env')) {
      console.log('[INFO] Express server listening on port ' + app.get('port'));
    }
  });
  return callback(server);
}

function setUpRealtimeMiddleware(server, callback) {
  var primus = new Primus(server, { transformer: 'engine.io', parser: 'JSON' });
  primus.on('connection', function (spark) {
    function sendOrderedScoreList() {
      scoreController.allScores(function (err, scores) {
        if (err) console.log('[ERROR]', err);
        else spark.write({ type: 'ranking-update', payload: scores });
      });
    }

    spark.on('data', function (message) {
      if (message.type === 'score-update') {
        scoreController.saveScore(message.payload, function (err) {
          if (err) console.log('[ERROR]', err);
          else sendOrderedScoreList();
        });
      } else if (message.type === 'disconnect') {
        spark.end();
      }
    });

    sendOrderedScoreList();
  });
  return callback(server);
}

function loadApp(callback) {
  scoreController = ScoreController.create(Score, mongoose.connection);
  scoreController.init(function (err) {
    if (!err) setUpWebServer(function (server) {
      setUpRealtimeMiddleware(server, callback);
    });
  });
}

module.exports.loadApp = loadApp;

if (!module.parent) {
  loadApp(function (server) {
    if (server) console.log('[INFO] All components have been installed');
  });
}