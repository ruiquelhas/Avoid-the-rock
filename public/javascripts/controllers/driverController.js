var $ = require('jquery-browserify');

var StatusController = require('./statusController');

self = window.driverController = window.driverController || {};

self.muzzleyUserToken = self.muzzleyUserToken || 'guest';
self.muzzleyActivityId = self.muzzleyActivityId || 'df7950';
self.muzzleyWidgetType = self.muzzleyWidgetType || 'webview';
self.muzzleyWidgetEvent = self.muzzleyWidgetEvent || 'rotate';

self.responseThreshold = self.responseThreshold || 2;
self.responseRate = self.responseRate || 8;

self.statusController = self.statusController || {};

self.init = self.init || function () {
  self.statusController = StatusController.create($('#driver #status'));

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
    });
  } else {
    self.statusController.displayMessage('Your browser does not support orientation events.');
  }
};

self.connect = self.connect || function (callback) {
  muzzley.on('error', callback);
  muzzley.connectUser(self.muzzleyUserToken, self.muzzleyActivityId,
    function (err, participant) {
      if (err) return callback(err);
      self.manageDeviceOrientation(participant);
    }
  );
};

self.manageDeviceOrientation = self.manageDeviceOrientation || function (user) {
  var previousRecordedValue = 0;

  function sendAction(ev) {
    ev.preventDefault();
    var referenceValue = ev.alpha;

    var widgetData = {
      "w": self.muzzleyWidgetType,
      "e": self.muzzleyWidgetEvent,
      "v": self.responseRate
    };

    if (referenceValue > previousRecordedValue) {
      previousRecordedValue = referenceValue;
      widgetData.c = 'left';
      user.sendWidgetData(widgetData);
    } else if (referenceValue < previousRecordedValue) {
      previousRecordedValue = referenceValue;
      widgetData.c = 'right';
      user.sendWidgetData(widgetData);
    }
  }

  window.addEventListener('deviceorientation', sendAction, false);
};