angular.module('robdodson.poly-grip', []).
  directive('polyGrip', ['$parse', function($parse) {
    return {
      restrict: 'A',
      scope: false,
      compile: function polyGripCompile($element, $attrs) {
        var attrMap = {};

        for (var prop in $attrs) {
          if (angular.isString($attrs[prop])) {
            var _match = $attrs[prop].match(/\{\{\s*([\.\w]+)\s*\}\}/);
            if (_match) {
              attrMap[prop] = $parse(_match[1]);
            }
          }
        }

        return function polyGripLink(scope, elements, attrs) {

          function applyChange(event) {
            var attributeName, newValue, oldValue, getter;
            // Figure out what changed by the event type
            // Convert the event from dash-case to camelCase with $normalize
            // So we can get it out of the attrMap
            attributeName = attrs.$normalize(
              event.type.substring(0, event.type.indexOf('-changed'))
            );

            if (attributeName in attrMap) {
              newValue = event.detail.value;
              getter = attrMap[attributeName];
              oldValue = getter(scope);

              if (oldValue !== newValue && angular.isFunction(getter.assign)) {
                scope.$evalAsync(function(scope) {
                  getter.assign(scope, newValue);
                });
              }
            }
          }

          // Convert Angular camelCase property to dash-case
          function denormalize(str) {
            return str.replace(/[A-Z]/g, function(c) {
              return '-' + c.toLowerCase();
            });
          }

          // TODO: Will this always apply to just the one element?
          for (var prop in attrMap) {
            elements[0].addEventListener(denormalize(prop) + '-changed', applyChange);
          }

          // TODO: Verify this removes event listeners from all elements
          scope.$on('$destroy', function() {
            for (var prop in attrMap) {
              elements[0].removeEventListener(denormalize(prop) + '-changed', applyChange);
            }
          });
        }
      }
    };
  }]);
