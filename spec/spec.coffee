x18n.register 'en',
	language: 'Language'
	welcome: 'Welcome %1'
	bye: 'Bye %{name}'

x18n.register 'de',
	language: 'Sprache'
	welcome: 'Willkommen %1'
	bye: 'Tschüss %{name}'

x18n.set('en')

tEl = $('#t')
x18nEl = $('#x18n')

describe 'jQuery.x18n', ->
	describe 't', ->
		it 'should set the innerHTML to the translation', ->
			tEl.t('language')
			expect(tEl).to.have.html('Language')

		it 'should support numeric interpolation', ->
			tEl.t('welcome', 'John')
			expect(tEl).to.have.html('Welcome John')

		it 'should support explicit interpolation', ->
			tEl.t('bye', name: 'John')
			expect(tEl).to.have.html('Bye John')

		it 'should add the data-#{config.key} attribute', ->
			tEl.t('language')
			expect(tEl).to.have.attr("data-#{$.x18n.config.key}", 'language')

	describe 'x18n', ->
		it 'should have updated the innerHTML of elements with data-#{config.key} attributes', ->
			expect(x18nEl).to.have.html('Language')

		it 'should update the innerHTML when the language changes', ->
			x18n.set('de')
			expect(x18nEl).to.have.html('Sprache')