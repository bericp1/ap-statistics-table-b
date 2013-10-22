/**
 * Created by brandon on 10/22/13.
 */

angular.module('random-from-table-b').directive('onEnter', function() {
  return function(scope, elm, attrs) {
    elm.bind("keyup", function(ev) {
      if(ev.keyCode === 13){
        scope.$apply(attrs.onEnter);
      }
    });
    $(function(){
      elm.focus();
    });
  };
});