/**
 * Created by brandon on 10/22/13.
 */

angular.module('random-from-table-b').directive('inText', function() {

  return {
    restrict: 'C',
    link: function(scope, elm) {
      elm.mouseup(function(ev) {
        elm.get(0).select();
      });
    }
  };

});
