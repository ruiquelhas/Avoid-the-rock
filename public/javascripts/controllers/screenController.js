var $ = require('jquery-browserify');

var ImageRepository = require('../helpers/imageRepository');

self = window.screenController = window.screenController || {};

self.init = self.init || function () {
  var $statusParagraph = $('#status');
  // should always have access to ranking updates
  self.primus = self.primus || new Primus(window.location.href);

  var hasCanvasSupport = function () {
    if ($('<canvas></canvas>').get(0).getContext) {
      return true;
    }
    return false;
  };

  if (hasCanvasSupport()) {
    // do beautiful things
    var imageRepository = ImageRepository.create({
      player: '/images/muzzley.png',
      rock: '/images/rock.png'
    });
    imageRepository.load(function (images) {
      console.log(images);
    });
  } else {
    $statusParagraph.text('Your browser does not have canvas support.');
  }
};