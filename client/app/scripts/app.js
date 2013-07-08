'use strict';

angular.module('app-name-here', ['compiled-templates'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/template.html',
        controller: 'Ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });