/**
 * Created by brandon on 10/22/13.
 */

angular.module('random-from-table-b').directive('onChange', function() {
  return function(scope, elem, attrs) {
    elem.data('oldVal', elem.val());
    elem.bind("propertychange keyup input paste", function(ev) {
      if (elem.data('oldVal') != elem.val()) {
        elem.data('oldVal', elem.val());
        scope.$apply(attrs.onChange);
      }
    });
  };
});
