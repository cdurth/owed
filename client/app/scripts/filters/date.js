'use strict';

angular.module('testApp')
  .filter('dateFilter', function ($filter) {
    return function (input) {
      if (input == null) { return ""; }

      var _date = $filter('date')(new Date(input), 'MM-dd-yyyy');

      return _date.toUpperCase();

    };
  });