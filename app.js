
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

var scoreController, httpServer, primus;

function setUpWebServer(callback) {
  httpServer = http.createServer(app);
  httpServer.listen(app.get('port'), function(){
    if ('development' === app.get('env')) {
      console.log('Express server listening on port ' + app.get('port'));
    }
  });
  return callback(httpServer);
}

function setUpRealtimeMiddleware(server, callback) {
  primus = new Primus(server, { transformer: 'engine.io', parser: 'JSON' });
  primus.on('connection', function (spark) {
    spark.on('data', function (message) {
      if (message.type === 'score-update') {
        scoreController.saveScore(message.payload, function (err, score) {
          spark.write(score);
        });
      } else if (message.type === 'disconnect') {
        spark.end();
      }
    });
    scoreController.allScores(function (err, scores) {
      if (!err) {
        spark.write({
          type: 'ranking-full-update',
          payload: scores
        });
      } else {
        console.log(err);
      }
    });
  });
  return callback(server);
}

function loadApp(callback) {
  scoreController = ScoreController.create(Score, mongoose.connection);
  scoreController.init(function (err) {
    if (!err) {
      setUpWebServer(function (server) {
        setUpRealtimeMiddleware(server, callback);
      });
    }
  });
}

module.exports.loadApp = loadApp;