/**
 * Created by brandon on 10/22/13.
 */

angular.module('random-from-table-b').directive('onKeyup', function() {
  return function(scope, elm, attrs) {
    elm.bind("keyup", function(ev) {
      scope.$apply(attrs.onKeyup);
    });
  };
});
