'use strict';

angular.module('testApp')
  .controller('HomeCtrl', function ($scope, $state, AuthService) {
    console.log('mainCtrl');
    $scope.logout = function () {
      AuthService.logout();
      $state.go('home');
    };
  });
