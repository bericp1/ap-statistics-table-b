describe('Basic controller test', function() {

  beforeEach(module('app-name-here'));

  describe('TestCtrl', function(){

    it('should have a message', function() {
    	inject(function($rootScope, $controller) {
      	var scope = $rootScope.$new(),
            ctrl = $controller("TestCtrl", {$scope: scope });

        expect(scope.test).toBe('Hey, Test!');
      });
    });

  });

});
