$ = jQuery

$.x18n =
	config:
		key: 't'
		plural: 'plural'
		interpolation: 'interpolation'

config = $.x18n.config

$.fn.x18n = ->

x18n.on ['lang:change', 'dict:change'], ->
	$('body').x18n()