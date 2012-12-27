(function() {
  var config, tEl, x18nEl;

  x18n.register('en', {
    language: 'Language',
    welcome: 'Welcome %1',
    bye: 'Bye %{name}'
  });

  x18n.register('de', {
    language: 'Sprache',
    welcome: 'Willkommen %1',
    bye: 'Tschüss %{name}'
  });

  x18n.set('en');

  tEl = $('#t');

  x18nEl = $('#x18n');

  config = $.x18n.config;

  describe('jQuery.x18n', function() {
    describe('t', function() {
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
      return it('should serialise the interpolation arguments', function() {
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
    });
    return describe('x18n', function() {
      it('should have updated the innerHTML of elements with data-#{config.key} attributes', function() {
        return expect(x18nEl).to.have.html('Language');
      });
      it('should update the innerHTML when the language changes', function() {
        x18n.set('de');
        return expect(x18nEl).to.have.html('Sprache');
      });
      return it('should read the serialised interpolation and pass it to t', function() {
        tEl.t('welcome', 'John');
        x18n.set('de');
        expect(tEl).to.have.html('Willkommen John');
        tEl.t('bye', {
          name: 'John'
        });
        x18n.set('en');
        return expect(tEl).to.have.html('Bye John');
      });
    });
  });

}).call(this);
