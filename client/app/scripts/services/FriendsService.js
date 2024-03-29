'use strict';

angular.module('testApp')
.factory('FriendsService', function($http, $q, Options) {
	return {
		create: function(friend) {
			var deferred = $q.defer();
			console.log(friend);
			$http.post(Options.baseUrl + '/friends', friend).success(function(data) {
				deferred.resolve(data);
			}).error(function(data, status) {
				deferred.reject(data);
			});

			return deferred.promise;
		},

		readAllFromSheet: function(sheet_id) {
			var deferred = $q.defer();

			$http.get(Options.baseUrl + '/friends/' + sheet_id).success(function(data) {
				deferred.resolve(data);
			}).error(function(data, status) {
				deferred.reject(data);
			});

			return deferred.promise;
		},

		read: function(sheet_id, id) {
			var deferred = $q.defer();

			$http.get(Options.baseUrl + '/friends/' + sheet_id + '/' + id).success(function(data) {
				deferred.resolve(data);
			}).error(function(data, status) {
				deferred.reject(data);
			});

			return deferred.promise;
		},

		update: function(friend) {
			var deferred = $q.defer();

			$http.put(Options.baseUrl + '/friends', friend).success(function(data) {
				deferred.resolve(data);
			}).error(function(data, status) {
				deferred.reject(data);
			});

			return deferred.promise;
		},

		delete: function(sheet_id, id) {
			var deferred = $q.defer();

			$http.delete(Options.baseUrl + '/friends/' + sheet_id + '/' + id).success(function(data) {
				deferred.resolve(data);
			}).error(function(data, status) {
				deferred.reject(data);
			});

			return deferred.promise;
		}
	}
});