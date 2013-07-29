function StatusController(selector, message) {
  this.selector = selector;
  this.message = message || selector.text();
}

StatusController.prototype.displayMessage = function (message) {
  if (message) {
    this.message = message;
  }
  this.selector.text(this.message);
};

StatusController.prototype.hideMessage = function () {
  this.selector.hide();
};

module.exports.create = function (selector, message) {
  return new StatusController(selector, message);
};