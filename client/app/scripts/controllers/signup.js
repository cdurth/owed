'use strict';

angular.module('testApp')
  .controller('SignupCtrl', function ($scope, $state, $modal, $http, AuthService, API_SERVER) {

    $scope.register = function(form){
      console.log("called");
      $http.post(API_SERVER.url + '/user/add', {name: $scope.user.name, password: $scope.user.password, email: $scope.user.email}).
        then(function(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
        }, function(err) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(err);
        });
    };
    
  });