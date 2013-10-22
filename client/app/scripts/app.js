(function(angular){

  'use strict';

  angular.module('random-from-table-b', ['compiled-templates'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

})(angular);
