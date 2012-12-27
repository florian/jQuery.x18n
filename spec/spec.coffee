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
config = $.x18n.config

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
			expect(tEl).to.have.attr("data-#{config.key}", 'language')

		it 'should serialise the interpolation arguments', ->
			tEl.t('welcome', 'John')
			expect(tEl).to.have.attr("data-#{config.interpolation}", JSON.stringify(['John']))

			tEl.t('bye', name: 'John')
			expect(tEl).to.have.attr("data-#{config.interpolation}", JSON.stringify([name: 'John']))

	describe 'x18n', ->
		it 'should have updated the innerHTML of elements with data-#{config.key} attributes', ->
			expect(x18nEl).to.have.html('Language')

		it 'should update the innerHTML when the language changes', ->
			x18n.set('de')
			expect(x18nEl).to.have.html('Sprache')

		it 'should read the serialised interpolation and pass it to t', ->
			tEl.t('welcome', 'John')
			x18n.set('de')
			expect(tEl).to.have.html('Willkommen John')

			tEl.t('bye', name: 'John')
			x18n.set('en')
			expect(tEl).to.have.html('Bye John')