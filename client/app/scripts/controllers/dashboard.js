'use strict';

angular.module('testApp')
	.controller('DashboardCtrl', function ($scope, $state, $http, $location, SheetsService, AuthService) {
		console.log('DashboardCtrl');
		$scope.creationInProgress = false;

		$scope.createSheet = function () {
			$scope.creationInProgress = true

			SheetsService.create().then(function (data) {
				return $state.go('sheets.overview', { id: data.sheet_id });
			});
		};
	});
