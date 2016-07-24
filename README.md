# ![angular-custom-elements](media/header.png)

Angular 1.x directive to hold all yr Custom Element bindings together 😁

*note*: This is still experimental so use at your own risk

## Install

> bower install robdodson/angular-custom-elements

## Usage

1. Include the `ce-bindings.js` script provided by this component in your app.
2. Add `robdodson.ce-bindings` as a module dependency to your app.
3. *For two-way bindings*: Add the `ce-bind-two` directive to any Custom Element
    /Polymer Element, to keep its two-way bindings in sync.

```html
<div ng-controller="MainCtrl as main">
  {{main.greeting}}
  <fancy-input message="{{main.greeting}}" ce-bind-two></fancy-input>
</div>
```

## How does it work?

Polymer's two-way binding system is event based. Anytime a bindable property
changes it fires an event named: `[property]-changed`. For example, a two-way
bindable property named `foo` would fire a `foo-changed` event.

This means we can listen for the `*-changed` events coming off of an element,
and take the new value and pass it into our scope using `$evalAsync`.

This also means you could write your own Custom Elements that didn't use Polymer
and so long as they fired a `[property]-changed` event, and the
`event.detail.value` contained the new value, it would also work.

## How is this different from other Polymer + Angular adapters?

The two adapters I've found are [angular-bind-polymer](https://github.com/eee-c/angular-bind-polymer) and [ng-polymer-elements](https://gabiaxel.github.io/ng-polymer-elements/). Both are
very cool but they have limitations which `poly-grip` (hopefully) fixes.

**angular-bind-polymer** relies on Mutation Observers to notify the scope when an
element's attributes changes. This only works if the element chooses to serialize
its internal state back to strings and reflect them to attributes. Most Polymer
elements do not do this, meaning they can't be used with angular-bind-polymer.

**ng-polymer-elements** attempts to map specific attributes exposed by Polymer
elements but this becomes a bit of an arms race as every time an element creates
a new attribute/property then `ng-polymer-elements` needs to be updated.
It also relies on `Object.observe` which has been removed from the platform, so
an additional polyfill is required.

## Credits

Logo image created by [Jems Mayor from the Noun Project](https://thenounproject.com/search/?q=dentures&i=425039).
