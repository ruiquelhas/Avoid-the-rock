var $ = require('jquery-browserify');

var StatusController = require('./statusController');

self = window.driverController = window.driverController || {};

self.muzzleyUserToken = self.muzzleyUserToken || 'guest';
self.muzzleyActivityId = self.muzzleyActivityId || 'df7950';

self.statusController = self.statusController || {};

self.init = self.init || function () {
  self.statusController = StatusController.create($('#status'));

  function listensToOrientationEvents() {
    if (window.DeviceOrientationEvent) {
      return true;
    }
    return false;
  }

  if (listensToOrientationEvents()) {
    // do something cool
    self.connect(function (err) {
      if (err) {
        self.statusController.displayMessage('[MUZZLEY]', err);
      }
    })
  } else {
    self.statusController.displayMessage('Your browser does not support orientation events.');
  }
};

self.connect = self.connect || function (callback) {
  muzzley.on('error', callback);
  muzzley.connectUser(self.muzzleyUserToken, self.muzzleyActivityId,
    function (err, participant) {
      if (err) return callback(err);
    }
  );
};