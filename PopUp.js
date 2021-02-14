function PopUp(data) {

  var self = this;

  this.data = {
    openButtons: document.querySelectorAll(data.openButton),
    closeButton: document.querySelector(data.closeButton),
    wrap: document.querySelector(data.wrap),
    unClickedCase: document.querySelector(data.unClickedCase),
    body: document.body,
  }

  PopUp.prototype.openPop = function () {

    self.data.body.setAttribute('data-fix', '');
    self.data.wrap.setAttribute('data-open', '');

    setTimeout(function () {
      if (self.data.body.hasAttribute('data-fix')) {
        self.data.body.addEventListener('click', self.closePop);
      }
    }.bind(self), 0)
  }

  PopUp.prototype.closePop = function () {
    self.data.body.removeAttribute('data-fix');
    self.data.wrap.removeAttribute('data-open');
    self.data.body.removeEventListener('click', self.closePop);
  }

  this.init = function () {

    self.data.unClickedCase.addEventListener('click', function (event) {
      event.stopPropagation();
    });

    for (var b = 0, bMax = self.data.openButtons.length; b < bMax; b++) {
      self.data.openButtons[b].addEventListener('click', this.openPop);
    }

  }

}

let pop = new PopUp({
  openButton: '.open-pop',
  closeButton: '.pop__close',
  wrap: '.pop',
  unClickedCase: '.pop__content'
})
pop.init();