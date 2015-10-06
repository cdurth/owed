'use strict';

angular.module('testApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'modules/navbar/navbar.html',
      restrict: 'E',
      controller: 'NavbarCtrl'
    };
  });
