$ = jQuery

$.x18n =
	config:
		key: 't'
		interpolation: 'interpolation'
		plural: 'plural'

config = $.x18n.config

setTranslation = (el, tr) ->
	if el.is('input:submit, input:reset, input[type=button]')
		el.val(tr)
	else if el.is('input')
		el.attr('placeholder', tr)
	else
		el.html(tr)

plural = (n) ->
	tr = @x18n.tr.plural(n)
	setTranslation(@, tr)
	@attr("data-#{config.plural}", n)

$.fn.t = (key, interpolation...) ->
	tr = x18n.t(key, interpolation...)
	@attr("data-#{config.key}", key)

	if $.isPlainObject tr
		@x18n.tr = tr
		@plural = plural
	else
		setTranslation(@, tr)
		@plural = -> @
		@attr("data-#{config.interpolation}", JSON.stringify(interpolation))
	@

$.fn.x18n = ->
	$("[data-#{config.key}]").each ->
		$this = $(@)
		key = $this.attr("data-#{config.key}")
		interpolation = JSON.parse($this.attr("data-#{config.interpolation}") || '[]')
		n = $this.attr("data-#{config.plural}")

		tr = x18n.t(key, interpolation...)
		tr = tr.plural(n) if $.isPlainObject(tr)

		setTranslation($this, tr)
	@

x18n.on ['lang:change', 'dict:change'], ->
	$('body').x18n()
