x18n.register 'en',
	language: 'Language'
	welcome: 'Welcome %1'
	bye: 'Bye %{name}'

x18n.register 'de',
	language: 'Sprache'
	welcome: 'Willkommen %1'
	bye: 'Tschüss %{name}'

x18n.set('en')

el = $('#a')

describe 'jQuery.x18n', ->
	describe 't', ->
		it 'should the innerHTML to the translation', ->
			el.t('language')
			expect(el).to.have.html('Language')

		it 'should support numeric interpolation', ->
			el.t('welcome', 'John')
			expect(el).to.have.html('Welcome John')

		it 'should support explicit interpolation', ->
			el.t('bye', name: 'John')
			expect(el).to.have.html('Bye John')

		it 'should add the data-#{config.key} attribute', ->
			el.t('language')
			expect(el).to.have.attr("data-#{$.x18n.config.key}", 'language')