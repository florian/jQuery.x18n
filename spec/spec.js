(function() {
  var tEl, x18nEl;

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
      return it('should add the data-#{config.key} attribute', function() {
        tEl.t('language');
        return expect(tEl).to.have.attr("data-" + $.x18n.config.key, 'language');
      });
    });
    return describe('x18n', function() {
      it('should have updated the innerHTML of elements with data-#{config.key} attributes', function() {
        return expect(x18nEl).to.have.html('Language');
      });
      return it('should update the innerHTML when the language changes', function() {
        x18n.set('de');
        return expect(x18nEl).to.have.html('Sprache');
      });
    });
  });

}).call(this);
