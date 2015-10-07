var SheetsModel = require('../../models/sheets');
var ExpensesModel = require('../../models/expenses');
var FriendsModel = require('../../models/friends');
var Async = require('async');

exports.read = function(req, res) {

	Async.parallel([
		function (callback) {
			SheetsModel.count({}, function (err, count) {
				if (err) {
					callback(err);
				}

				callback(null, count);
			});
		},

		function (callback) {
			FriendsModel.count({}, function (err, count) {
				if (err) {
					callback(err);
				}

				callback(null, count);
			});
		},

		function (callback) {
			ExpensesModel.count({}, function (err, count) {
				if (err) {
					callback(err);
				}

				callback(null, count);
			});
		}
	],

	function(err, results) {
		if (err) {
			return res.send(400);
		}
		//results = [countSheets, countFriends, countExpenses];
		return res.send(200, {sheets: results[0], friends: results[1], expenses: results[2]});
	});
};