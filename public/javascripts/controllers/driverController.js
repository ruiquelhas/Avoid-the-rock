var $ = require('jquery-browserify');

self = window.driverController = window.driverController || {};

self.init = self.init || function () {
  var $statusParagraph = $('#status');

  var listensToOrientationEvents = function () {
    if (window.DeviceOrientationEvent) {
      return true;
    }
    return false;
  };

  if (listensToOrientationEvents()) {
    // do something cool
  } else {
    $statusParagraph.text('Your browser does not support orientation events.');
  }
};