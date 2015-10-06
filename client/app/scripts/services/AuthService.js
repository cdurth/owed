'use strict';

angular.module('testApp')

.service('AuthService', function($q, $http, USER_ROLES, API_SERVER) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    var decoded = jwt_decode(token);
    username = decoded.name;
    isAuthenticated = true;
    authToken = token;

    if (decoded.admin === true) {
      role = USER_ROLES.admin;
    }
    if (username === 'user') {
      role = USER_ROLES.public;
    }

    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function(username, password) {
    return $q(function(resolve, reject) {
      $http.post(API_SERVER.url +'/authenticate', {name: username, password: password})
      .then(function(response) {
        if(response.data.success){
          storeUserCredentials(response.data.token);
          resolve('Login success.');
        } else {
          reject('Login Failed.');
        }
      }, function(err) {
        console.log(err);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        reject('Login Failed.');
      });
      
      
      
      // if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
      //   // Make a request and receive your auth token from your server
      //   storeUserCredentials(name + '.yourServerToken');
      //   resolve('Login success.');
      // } else {
      //   reject('Login Failed.');
      // }
    });
  };

  var logout = function() {
    console.log('logout');
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});