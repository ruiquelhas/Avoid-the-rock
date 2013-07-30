var $ = require('jquery-browserify');

var ImageRepository = require('../helpers/imageRepository');
var Player = require('../models/player');

var PlayerCanvasController = require('./playerCanvasController');
var StatusController = require('./statusController');
var RankingController = require('./rankingController');

self = window.screenController = window.screenController || {};

self.muzzleyAppToken = self.muzzleyAppToken || '7346780ed56a4033';
self.muzzleyActivityId = self.muzzleyActivityId || 'df7950';

self.playerCanvasController = self.playerCanvasController || {};
self.statusController = self.statusController || {};
self.rankingController = self.rankingController || {};

self.init = self.init || function () {
  var $statusParagraph = $('#status');
  self.statusController = StatusController.create($statusParagraph);

  // should always have access to ranking updates
  self.primus = self.primus || new Primus(window.location.href);

  var $rankingList = $('#ranking-list');
  self.rankingController = RankingController.create($rankingList, self.primus);
  self.rankingController.bind();

  var hasCanvasSupport = function () {
    if ($('<canvas></canvas>').get(0).getContext) {
      return true;
    }
    return false;
  };

  if (hasCanvasSupport()) {
    // first, connect to the muzzley platform
    self.connect(function (err) {
      if (err) {
        self.statusController.displayMessage('[MUZZLEY]', err);
      } else {
        self.statusController.hideMessage();
        self.playerCanvasController.showCanvas();
      }
    });
  } else {
    self.statusController.displayMessage('Your browser does not have canvas support.');
  }
};

self.connect = self.connect || function (callback) {
  muzzley.on('error', callback);
  muzzley.connectApp({
    token: self.muzzleyAppToken,
    activityId: self.muzzleyActivityId
  }, function (err, activity) {
    if (err) return callback(err);
    activity.on('participantQuit', function (participant) {
      self.playerCanvasController.saveScore();
      self.playerCanvasController.erasePlayer();
      self.playerCanvasController.hideCanvas();
      self.statusController.displayMessage();
    });
    activity.on('participantJoin', function (participant) {
      self.run(participant, callback);
    });
  });
};

self.run = self.run || function (user, callback) {
  var imageRepository = ImageRepository.create({
    player: '/images/muzzley.png',
    rock: '/images/rock.png'
  });

  imageRepository.load(function (images) {
    var $playerCanvas = $('#player');
    var playerX = $playerCanvas.get(0).width / 2 - images.player.width / 2;
    var playerY = $playerCanvas.get(0).height - images.player.height;

    var player = Player.create(images.player, playerX, playerY);

    self.playerCanvasController = PlayerCanvasController.create(player, $playerCanvas, self.primus);
    self.playerCanvasController.drawPlayer();

    self.manage(user);
    callback();
  });
};

self.manage = self.manage || function (user) {
  user.on('action', function (action) {
    if (action.c === 'right') {
      self.playerCanvasController.movePlayerRight(action.v);
    } else if (action.c === 'left') {
      self.playerCanvasController.movePlayerLeft(action.v);
    }
  });
};