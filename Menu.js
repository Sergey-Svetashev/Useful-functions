import * as $ from "jquery";

function Menu(data) {

  data = {
    wrap: document.querySelector(data.wrap),
    toggle: document.querySelector(data.toggleButton),
    pointList: document.querySelectorAll(data.points),
    body: document.body,
  }

  Menu.prototype.open = function () {
    data.wrap.setAttribute('data-open', '');
    data.body.setAttribute('data-fix', '');
  };

  Menu.prototype.close = function () {
    data.wrap.removeAttribute('data-open');
    data.body.removeAttribute('data-fix');
    data.toggle.removeAttribute('data-active');
  };

  Menu.prototype.navigation = function (destination) {
    var destPoint = document.getElementById(destination);

    $('html, body').animate({scrollTop: $(destPoint).offset().top - 50}, 700)  /* --- jQuery --- */
    this.close();
  }

  Menu.prototype.isPointVisible = function () {

    for (var p = 0, pMax = data.pointList.length; p < pMax; p++) {

      var destinationValue = data.pointList[p].getAttribute('data-point'),
        destinationPoint = document.getElementById(destinationValue);

      if (destinationPoint.getBoundingClientRect().top < 100 && destinationPoint.getBoundingClientRect().bottom > 200) {
        data.pointList[p].setAttribute('data-visible', '')
      } else {
        data.pointList[p].removeAttribute('data-visible')
      }

    }

  }

  Menu.prototype.start = function () {
    var self = this;

    data.toggle.addEventListener('click', function () {
      if (this.hasAttribute('data-active')) {
        self.close();
        this.removeAttribute('data-active')
      } else {
        self.open();
        this.setAttribute('data-active', '')
      }
    })

    for (var p = 0, pMax = data.pointList.length; p < pMax; p++) {
      data.pointList[p].addEventListener('click', function () {
        self.navigation(this.getAttribute('data-point'))
      })
    }

    document.addEventListener('scroll', function () {
      self.isPointVisible()
    })

    this.isPointVisible()

  }

}

let menu = new Menu({
  toggleButton: '.menu__open',
  wrap: '.menu__case',
  points: '[data-point]'
})
menu.start()