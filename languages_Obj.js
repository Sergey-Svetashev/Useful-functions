const languages = {

  data: {
    select: document.getElementById('language'),
    currentLanguage: document.querySelector('[data-current]'),
    languagesCase: document.querySelector('.language__case'),
    languageOpt: document.querySelectorAll('[data-value]')
  },

  init: function (targets) {

    var request = new XMLHttpRequest();
    request.open('GET', '../data/languages.json');
    request.withCredentials = true;
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      if (request.status !== 200) {
        console.log('Error! Status is not 200');
      } else {
        this.run(request.response, targets)
      }
    }.bind(this)
    request.onerror = function () {
      console.log('Some error is detected!');
    }

  },

  run: function (languages, targets) {
    var self = this;

    this.data.select.addEventListener('click', function () {
      self.toggleSelect();
    });

    for (var l = 0; l < this.data.languageOpt.length; l++) {
      this.data.languageOpt[l].addEventListener('click', function () {
        self.changeLanguage(this.getAttribute('data-value'), languages, targets)
      });
    }
  },

  toggleSelect: function () {

    var targetHeight = document.querySelector('.language__inner').offsetHeight,
      languagesCase = this.data.languagesCase,
      currentLanguage = this.data.currentLanguage;

    languagesCase.hasAttribute('style') ?
      languagesCase.removeAttribute('style')
      : languagesCase.style.height = targetHeight + 'px';

    currentLanguage.hasAttribute('data-on') ?
      currentLanguage.removeAttribute('data-on')
      : currentLanguage.setAttribute('data-on', '');

  },

  changeLanguage: function (val, langs, targets) {

    var currentLanguage = this.data.currentLanguage;

    if (val in langs) {
      var language = langs[val];

      currentLanguage.setAttribute('data-current', val);
      currentLanguage.innerText = val;
      document.body.setAttribute('data-lang', val);

      for (var i = 0; i < targets.length; i++) {
        var stringNum = targets[i].getAttribute('data-string');

        targets[i].hasAttribute('placeholder') ?
          targets[i].setAttribute('placeholder', language[stringNum])
          : targets[i].innerHTML = language[stringNum];
      }
    } else {
      alert('Language is not found.')
    }

  },

}

languages.init(document.querySelectorAll('[data-string]'));