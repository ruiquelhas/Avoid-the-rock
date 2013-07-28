var $ = require('jquery-browserify');

var ImageRepository = require('../helpers/imageRepository');
var Player = require('../models/player');
var PlayerCanvasController = require('./playerCanvasController');

self = window.screenController = window.screenController || {};

self.init = self.init || function () {
  var $statusParagraph = $('#status');
  var $playerCanvas = $('#player');
  // should always have access to ranking updates
  self.primus = self.primus || new Primus(window.location.href);

  var hasCanvasSupport = function () {
    if ($('<canvas></canvas>').get(0).getContext) {
      return true;
    }
    return false;
  };

  if (hasCanvasSupport()) {
    // temporary
    $('canvas').show();
    // do beautiful things
    var imageRepository = ImageRepository.create({
      player: '/images/muzzley.png',
      rock: '/images/rock.png'
    });
    imageRepository.load(function (images) {
      var playerX = $playerCanvas.get(0).width / 2 - images.player.width / 2;
      var playerY = $playerCanvas.get(0).height - images.player.height;
      var player = Player.create(images.player, playerX, playerY);
      var playerCanvasController = PlayerCanvasController.create(player, $playerCanvas);

      playerCanvasController.drawPlayer();
      var counter = 0;
      setInterval(function () {
        if (counter < 10) {
          playerCanvasController.movePlayerLeft(5);
        }
        counter += 1;
      }, 200);
    });
  } else {
    $statusParagraph.text('Your browser does not have canvas support.');
  }
};