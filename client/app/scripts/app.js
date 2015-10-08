'use strict';

/**
 * @ngdoc overview
 * @name testApp
 * @description
 * # testApp
 *
 * Main module of the application.
 */
angular
    .module('testApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'angular-jwt'
    ])
    .constant('Options', { baseUrl: 'https://localhost:3000/api/sheets' })
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                data: {
                    authorization: false
                }
            })
            .state('blog', {
                url: '/blog',
                templateUrl: 'views/blog.html',
                data: {
                    authorization: false
                }
            })
            .state('blog-item', {
                url: '/blog/:id',
                templateUrl: 'views/blog.item.html',
                data: {
                    authorization: false
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                data: {
                    authorization: false
                }
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html',
                data: {
                    authorization: false
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                data: {
                    authorization: false
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl',
                data: {
                    authorization: false
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                controller: 'DashboardCtrl',
                templateUrl: 'views/dashboard.html',
                data: {
                    authorization: true
                }
            })
            .state('user-settings', {
                url: '/settings/',
                templateUrl: 'views/user.settings.html',
                data: {
                    authorization: true
                }
            })
            .state('sheets', {
                abstract: true,
                url: '/sheets/:id',
                templateUrl: 'views/sheets/sheets.html',
                controller: 'SheetsCtrl',
                data: {
                    authorization: true
                }
            })
            .state('sheets.overview',  {
                url: '/',
                templateUrl: 'views/sheets/sheets.overview.html',
                data: {
                    authorization: true
                }
            })
            .state('sheets.edit',  {
                url: '/edit',
                templateUrl: 'views/sheets/sheets.edit.html',
                data: {
                    authorization: true
                }
            })
            .state('sheets.friends', {
                url: '/friends',
                templateUrl: 'views/sheets/sheets.friends.html',
                data: {
                    authorization: true
                }
            })
            .state('sheets.expenses', {
                url: '/expenses',
                templateUrl: 'views/sheets/sheets.expenses.html',
                data: {
                    authorization: true
                }
            })
            .state('sheets.expenses.create', {
                url: '/create',
                templateUrl: 'views/sheets/sheets.expenses.create.html',
                data: {
                    authorization: true
                }
            });
    })
  
    .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var authorization = toState.data.authorization;

            if (!AuthService.isAuthenticated() && authorization != false) {

                if (toState.name !== 'login') {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });
    });



    // if ('data' in next && 'authorizedRoles' in next.data) {
    //   var authorizedRoles = next.data.authorizedRoles;
    //   if (!AuthService.isAuthorized(authorizedRoles)) {
    //     event.preventDefault();
    //     $state.go($state.current, {}, {reload: true});
    //     $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
    //   }
    // }