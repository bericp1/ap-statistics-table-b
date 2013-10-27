/**
 * Created by brandon on 10/27/13.
 */

angular.module('random-from-table-b').directive('numberCard', function() {

  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var opts = scope.$eval(attrs.numberCard);
      elem.addClass('number-card').addClass('btn-primary');
      elem.text(opts.num);
      elem.click(function(ev) {
        opts.remove(opts.num);
        scope.$apply();
      });
    }
  };

});
