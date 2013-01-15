(function() {
  var config, input, pluralEl, submit, tEl, x18nEl;

  x18n.register('en', {
    language: 'Language',
    welcome: 'Welcome %1',
    bye: 'Bye %{name}',
    users: {
      1: 'There is 1 user online',
      n: 'There are %1 users online'
    },
    login: 'Login',
    username: 'Username'
  });

  x18n.register('de', {
    language: 'Sprache',
    welcome: 'Willkommen %1',
    bye: 'Tschüss %{name}',
    users: {
      1: 'Es ist 1 Benutzer online',
      n: 'Es sind %1 Benutzer online'
    },
    login: 'Einloggen',
    username: 'Benutzername'
  });

  x18n.set('en');

  tEl = $('#t');

  x18nEl = $('#x18n');

  pluralEl = $('#plural');

  submit = $(':submit');

  input = $('#input');

  config = $.x18n.config;

  describe('jQuery', function() {
    afterEach(function() {
      tEl.html('');
      x18nEl.html('');
      pluralEl.html('');
      submit.val('');
      input.attr('placeholder', '');
      return x18n.set('en');
    });
    describe('t', function() {
      it('should return this', function() {
        return expect(tEl.t('language')).to.equal(tEl);
      });
      it('should set the innerHTML to the translation', function() {
        tEl.t('language');
        return expect(tEl).to.have.html('Language');
      });
      it('should support numeric interpolation', function() {
        tEl.t('welcome', 'John');
        return expect(tEl).to.have.html('Welcome John');
      });
      it('should support explicit interpolation', function() {
        tEl.t('bye', {
          name: 'John'
        });
        return expect(tEl).to.have.html('Bye John');
      });
      it('should add the data-#{config.key} attribute', function() {
        tEl.t('language');
        return expect(tEl).to.have.attr("data-" + config.key, 'language');
      });
      it('should serialise the interpolation arguments', function() {
        tEl.t('welcome', 'John');
        expect(tEl).to.have.attr("data-" + config.interpolation, JSON.stringify(['John']));
        tEl.t('bye', {
          name: 'John'
        });
        return expect(tEl).to.have.attr("data-" + config.interpolation, JSON.stringify([
          {
            name: 'John'
          }
        ]));
      });
      it('should return an object with a plural method when not asking for a string', function() {
        return expect(tEl.t('users')).to.be.an('object')["with"].property('plural').that.is.a('function');
      });
      return it('should return itself when no plural is available', function() {
        return expect(tEl.t('users').plural(5)).to.equal(tEl);
      });
    });
    describe('t(key).plural', function() {
      it('should return this', function() {
        return expect(pluralEl.t('users').plural(2)).to.equal(pluralEl);
      });
      it('should set the plural correctly', function() {
        pluralEl.t('users').plural(1);
        expect(pluralEl).to.have.html('There is 1 user online');
        pluralEl.t('users').plural(2);
        return expect(pluralEl).to.have.html('There are 2 users online');
      });
      it('should set data-#{config.plural}', function() {
        pluralEl.t('users').plural(3);
        return expect(pluralEl).to.have.attr("data-" + config.plural, '3');
      });
      it('should set the value of buttons', function() {
        submit.t('login');
        return expect(submit).to.have.value('Login');
      });
      it('should set the placeholder attr of inputs', function() {
        input.t('username');
        return expect(input).to.have.attr('placeholder', 'Username');
      });
      return it('should set the innerHTML of other elements', function() {
        tEl.t('language');
        return expect(tEl).to.have.html('Language');
      });
    });
    return describe('x18n', function() {
      it('should return this', function() {
        return expect(x18nEl.x18n()).to.equal(x18nEl);
      });
      it('should have updated the innerHTML of elements with data-#{config.key} attributes', function() {
        return expect(x18nEl).to.have.html('Language');
      });
      it('should update the innerHTML when the language changes', function() {
        x18n.set('de');
        return expect(x18nEl).to.have.html('Sprache');
      });
      it('should read the serialised interpolation and pass it to t method', function() {
        tEl.t('welcome', 'John');
        x18n.set('de');
        expect(tEl).to.have.html('Willkommen John');
        tEl.t('bye', {
          name: 'John'
        });
        return expect(tEl).to.have.html('Tschüss John');
      });
      return it('should read the serialised plural and pass it to the plural method', function() {
        pluralEl.t('users').plural(1);
        x18n.set('de');
        expect(pluralEl).to.have.html('Es ist 1 Benutzer online');
        x18n.set('en');
        expect(pluralEl).to.have.html('There is 1 user online');
        pluralEl.t('users').plural(3);
        x18n.set('de');
        return expect(pluralEl).to.have.html('Es sind 3 Benutzer online');
      });
    });
  });

}).call(this);
