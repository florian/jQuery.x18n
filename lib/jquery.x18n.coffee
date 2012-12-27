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
		tr = x18n.t(key, interpolation...)

		if $.isPlainObject tr
			# plural
		else
			$this.html(tr).attr("data-#{config.key}", key)
			$this.attr("data-#{config.interpolation}", JSON.stringify(interpolation))


$.fn.x18n = ->
	$("[data-#{config.key}]").each ->
		$this = $(this)
		key = $this.attr("data-#{config.key}")
		interpolation = $this.attr("data-#{config.interpolation}") || '[]'
		plural = $this.attr("data-#{config.plural}")

		tr = x18n.t(key, JSON.parse(interpolation)...)

		$this.html(tr)

x18n.on ['lang:change', 'dict:change'], ->
	$('body').x18n()