$ = jQuery

$.x18n =
	config:
		key: 't'
		plural: 'plural'
		interpolation: 'interpolation'
	plural: (n) ->

config = $.x18n.config

$.fn.t = (key, interpolation) ->
	$this = $(this)
	tr = t(key, interpolation)

	if $.isPlainObject(tr)
		tr.plural = $.x18n.plural
	else
		$this.html(tr).attr("data-#{config.key}", key)

		if $.isPlainObject(interpolation)
			$this.data("interpolation-#{k}", v) for k, v of interpolation
		else
			$this.data("interpolation-#{k}", v) for k, v of interpolation

x18n.register 'en',
	logout: 'Logout'

x18n.register 'de',
	logout: 'Ausloggen'


$.fn.x18n = ->
	$elements = $('[data-t]', @)

	$elements.each ->
		$this = $(this)
		$this.html(t($this.data(config.key)))

x18n.on ['lang:change', 'dict:change'], ->
	$('body').x18n()