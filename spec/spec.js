(function() {
  var el;

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

  el = $('#a');

  describe('jQuery.x18n', function() {
    return describe('t', function() {
      it('should the innerHTML to the translation', function() {
        el.t('language');
        return expect(el).to.have.html('Language');
      });
      it('should support numeric interpolation', function() {
        el.t('welcome', 'John');
        return expect(el).to.have.html('Welcome John');
      });
      it('should support explicit interpolation', function() {
        el.t('bye', {
          name: 'John'
        });
        return expect(el).to.have.html('Bye John');
      });
      return it('should add the data-#{config.key} attribute', function() {
        el.t('language');
        return expect(el).to.have.attr("data-" + $.x18n.config.key, 'language');
      });
    });
  });

}).call(this);
