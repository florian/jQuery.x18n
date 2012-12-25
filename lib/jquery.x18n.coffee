$ = jQuery

$.x18n =
	config:
		key: 't'
		plural: 'plural'
		interpolation: 'interpolation'
	plural: (n) ->

config = $.x18n.config

$.fn.t = (key, interpolation...) ->
	this.each ->
		$this = $(this)
		tr = t(key, interpolation...)

		if $.isPlainObject(tr)
			tr.plural = $.x18n.plural
		else
			$this.html(tr).attr("data-#{config.key}", key)
			interpolation = interpolation[0] if $.isPlainObject(interpolation[0])
			$this.attr("data-interpolation-#{k}", v) for k, v of interpolation

x18n.register 'en',
	messages: 'You have %{n} messages.'

x18n.register 'de',
	messages: 'Du hast %{n} Nachrichten'

$.fn.x18n = ->
	$elements = $('[data-t]', @)

	$elements.each ->
		$this = ($this)

		interpolation = {}
		attributes = this.attributes

		interpolation = $.grep $.makeArray(attributes), (v) ->
			v.nodeName.indexOf('data-interpolation-') is 0
		interpolation = $.map interpolation, ->

		console.log(interpolation)

		$(this).html(t($(this).data(config.key)), interpolation)

x18n.on ['lang:change', 'dict:change'], ->
	$('body').x18n()