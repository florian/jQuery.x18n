# jQuery.[x18n](https://github.com/js-coder/x18n) [![Build Status](https://travis-ci.org/js-coder/jQuery.x18n.png)](https://travis-ci.org/js-coder/jQuery.x18n)

[X18n](https://github.com/js-coder/x18n) is a internationalisation library for JavaScript. jQuery.x18n is a x18n adapter that updates your HTML when the language changes or new translations are added.

## The concept

You:

- Register translations
- Optionally set the language
- Configure HTML data bindings

x18n:

- Figures out what language to use
- Handles interpolation and pluralisation

jQuery.x18n:

- Gives you jQuery methods to dynamically add translations
- Adds data bindings for dynamic translations
- Updates your HTML when the language changes or new translations are added

## Example

```js
x18n.register('en', {
  user: {
    logout: 'Logout',
    count: {
      1: 'There is 1 user online.',
      n: 'There are %1 users online.'
    }
  }
});

x18n.register('de', {
  user: {
    logout: 'Ausloggen',
    count: {
      1: 'Es ist 1 Benutzer online.',
      n: 'Es sind %1 Benutzer online.'
    }
  }
});
```

```html
<span data-t="user.logout">Logout</span> <!-- data-t for the key -->
<span data-t="user.count" data-plural="${users.length}">There is 1 user online</span>
<!-- data-plural for the plural. __ will evaluate the rest of data-plural globally -->
```

The elements will contain the translation of the detected language by default. Whenever you set the language (`x18n.set('de')`) the translations are directly updated.


- - -

# Documentation

In case you are not familiar with x18n, you should take a look at the [getting started guide](https://github.com/js-coder/x18n/wiki/Getting-started) for the general usage of x18n itself.

jQuery.x18n contains x18n and jQuery.x18n itself, so you don't need to include x18n by yourself.

## `$.fn.x18n`

Whenever new translations are added or the language changes `$('body').x18n()` will be called automatically. You can of course also call it yourself to just update specific elements when a new plural is needed or something similiar.

`$.fn.x18n` will look for `data-t`, `data-interpolation`  and `data-plural` attributes and update the HTML of the elements with the translation.

You can customise the used data attributes:

```js
// The default configuration:
$.x18n.config = {
  t: 't',
  interpolation: 'interpolation',
  plural: 'plural'
}
```

## `$.fn.t(key, interpolation)`

This method works just like x18n's `t` method but will also update the HTML of the selected elements. Furthermore it will also set the right data attributes, so the translation will be correctly updated with `$.fn.x18n`.

```js
$(element).t('user.logout');

// Plurals work fine too:

$(element).t('user.count').plural(5);
```

## Dynamic data bindings

*Dynamic data bindings are a feature of x18n itself, but they are incredibly useful for jQuery.x18n, so they are mentioned here.*

Surround a translation, interpolation value or plural value with `${}` will make x18n evaluate the value whenever the translation is looked up.

```js
$('#id').t('user.count').plural('${user.length}');
```

`user.length` will be globally evaluated everytime the translation needs to be updated.
