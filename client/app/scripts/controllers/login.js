'use strict';

angular.module('testApp')
  .controller('LoginCtrl', function ($scope, $state, $modal, AuthService) {
    $scope.data = {};

    $scope.login = function (data) {
      AuthService.login(data.username, data.password).then(function (authenticated) {
        $state.go('dashboard', {}, { reload: true });
        $scope.setCurrentUsername(data.username);
      }, function (err) {
        // invalid login, pop modal
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'loginErrorModal.html',
          controller: 'ModalCtrl',
          size: 'md',
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });
      });
    };
    
    $scope.setCurrentUsername = function (name) {
      $scope.username = name;
    };
    
  });