'use strict';

angular.module('testApp')
.controller('ModalCtrl', function ($rootScope, $scope, $state, $modalInstance, AuthService, items) {
  console.log('loaded ModalCtrl');
  $scope.login = function(data){
    AuthService.login(data.username, data.password).then(function (authenticated) {
        $modalInstance.dismiss('cancel');
        $rootScope.username = data.username;
        $state.go('dashboard', {}, { reload: true });
      }, function (err) {
        alert('login err'); 
      })
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});