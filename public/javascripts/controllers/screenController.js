self = window.screenController = window.screenController || {};

self.init = self.init || function () {
  var address = window.location.href;
  self.primus = self.primus || new Primus(address);
};