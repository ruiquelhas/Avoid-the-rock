
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var Primus = require('primus');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}

app.get('/', routes.index);
app.get('/screen', routes.screen);

var httpServer = http.createServer(app);
httpServer.listen(app.get('port'), function(){
  if ('development' === app.get('env')) {
    console.log('Express server listening on port ' + app.get('port'));
  }
});

var primus = new Primus(httpServer, { transformer: 'engine.io' });
primus.on('connection', function (spark) {
  spark.on('data', function (message) {
    if (message === 'disconnect') {
      spark.end();
    }
  });
  spark.write('ping');
});

module.exports.httpServer = httpServer;