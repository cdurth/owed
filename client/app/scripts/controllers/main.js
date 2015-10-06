'use strict';

angular.module('testApp')
.controller('MainCtrl', function ($rootScope, $scope, $state, AuthService, AUTH_EVENTS) {
    $rootScope.username = AuthService.username();
    
    console.log($scope.username);
    $scope.logout = function () {
      console.log('logout from MainCtrl');
      AuthService.logout();
      $state.go('home');
    };

    // $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
    //   var alertPopup = $ionicPopup.alert({
    //     title: 'Unauthorized!',
    //     template: 'You are not allowed to access this resource.'
    //   });
    // });

    // figure out how ionic handles auth states
    // $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
    //   AuthService.logout();
    //   $state.go('login');
    //   var alertPopup = $ionicPopup.alert({
    //     title: 'Session Lost!',
    //     template: 'Sorry, You have to login again.'
    //   });
    // });

    $scope.setCurrentUsername = function (name) {
      $scope.username = name;
    };

  })