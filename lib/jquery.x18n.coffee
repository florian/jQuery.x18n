$ = jQuery

$.x18n =
	config:
		key: 't'
		plural: 'plural'
		interpolation: 'interpolation'

config = $.x18n.config

$.fn.t = (key, interpolation...) ->
	this.each ->
		$this = $(this)
		tr = t(key, interpolation...)

		if $.isPlainObject tr
			# plural
		else
			$this.html(tr).attr("data-#{config.key}", key)
			# serialize interpolation


$.fn.x18n = ->

x18n.on ['lang:change', 'dict:change'], ->
	$('body').x18n()