angular.module('random-from-table-b').controller('MainCtrl', function($scope){
  'use strict';
  $scope.unumbers = [];
  $scope.min = 1;
  $scope.max = 99;
  $scope.n   = 10;
  $scope.digits = 2;
  $scope.entry = '';
  $scope.parse = function(onlyIfDigits){
    onlyIfDigits = !!onlyIfDigits;
    if(onlyIfDigits && !($scope.entry.length >= $scope.digits)){
      return;
    }
    if($scope.entry >= $scope.min && $scope.entry <= $scope.max && $.inArray(parseFloat($scope.entry), $scope.unumbers) === -1){
      $scope.unumbers.push(parseFloat($scope.entry));
      $scope.unumbers.sort();
      $scope.entry = '';
      $scope.n--;
      //TODO Show red flash or something to indicate not unique in range
      //TODO Show green flash or something to indicate unique and in range
    }else{
      $scope.entry = '';
    }
  };
});