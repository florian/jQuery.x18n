$ = jQuery

$.x18n =
	config:
		key: 't'
		interpolation: 'interpolation'
		plural: 'plural'
	plural: (n) ->
		tr = @.x18n.tr.plural(n)
		@html(tr).attr("data-#{config.plural}", n)

config = $.x18n.config

$.fn.t = (key, interpolation...) ->
	tr = x18n.t(key, interpolation...)
	@attr("data-#{config.key}", key)

	if $.isPlainObject tr
		@x18n.tr = tr
		@plural = $.x18n.plural
	else
		@html(tr).attr("data-#{config.interpolation}", JSON.stringify(interpolation))

	@


$.fn.x18n = ->
	$("[data-#{config.key}]").each ->
		$this = $(@)
		key = $this.attr("data-#{config.key}")
		interpolation = $this.attr("data-#{config.interpolation}") || '[]'
		plural = $this.attr("data-#{config.plural}")

		tr = x18n.t(key, JSON.parse(interpolation)...)

		$this.html(tr)
	@

x18n.on ['lang:change', 'dict:change'], ->
	$('body').x18n()