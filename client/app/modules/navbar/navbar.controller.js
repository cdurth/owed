'use strict';

angular.module('testApp')
  .controller('NavbarCtrl', function ($scope, $modal, AuthService) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'home'
    },
    {
      'title': 'About',
      'state': 'about',
    },
    {
      'title': 'Blog',
      'state': 'blog',
    },
    {
      'title': 'Contact',
      'state': 'contact',
    },];

    $scope.isCollapsed = true;
    
    $scope.collapse = function(){
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    $scope.isLoggedIn = AuthService.isAuthenticated;
    $scope.isAdmin = AuthService.isAdmin;
    $scope.getCurrentUser = AuthService.getCurrentUser;
    
    $scope.loginModal = function () {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'loginModal.html',
        controller: 'ModalCtrl',
        size: 'md',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };
  });
