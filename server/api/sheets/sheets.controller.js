var SheetsModel = require('../../models/sheets');
var ExpensesModel = require('../../models/expenses');
var FriendsModel = require('../../models/friends');
var Async = require('async');

exports.create = function(req, res) {
	var sheetEntry = new SheetsModel();
	sheetEntry.name = 'My Shared Sheet';

	sheetEntry.save(function(err) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		return res.send(200, {sheet_id: sheetEntry._id});
	});
}

/* Read from sheets, friends and expenses */
exports.read = function(req, res) {
	var sheet_id = req.params.id;
	if (sheet_id == null) {
		return res.send(400);
	}

	Async.parallel([

		//Read sheets data from Sheets
		function(callback) {
			var query = SheetsModel.findOne({_id: sheet_id});
			query.exec(function(err, sheet) {
				if (err) {
		  			callback(err);
		  		}

		  		callback(null, sheet);
		  	});
		},

		//Read friends data from Friends
		function(callback) {
			var query = FriendsModel.find({sheet_id: sheet_id});
			query.exec(function(err, friends) {
				if (err) {
		  			callback(err);
		  		}

		  		callback(null, friends);
		  	});
		},

		//Read expenses data from Expenses
		function(callback) {
			var query = ExpensesModel.find({sheet_id: sheet_id});
			query.sort('-date');
			query.exec(function(err, expenses) {
				if (err) {
		  			callback(err);
		  		}

		  		callback(null, expenses);
		  	});
		}
	],

	//Compute all results
	function(err, results) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		//results contains [sheets, Friends, Expenses]
		var sheetData = {_id: results[0]._id, name: results[0].name};
		sheetData.friends = results[1] || [];
		sheetData.expenses = results[2] || [];

		return res.send(200, sheetData);
	});
}

exports.update = function(req, res) {
	var sheet = req.body;
	
	if (sheet == null || sheet._id == null || sheet.name == null
		|| sheet.name.trim().length == 0) {

		return res.send(400);
	}

	updateSheet = {name: sheet.name.trim()};

	SheetsModel.update({_id: sheet._id}, updateSheet, function(err, nbRows, raw) {
		if (err) {
			return res.send(400);
		}

		return res.send(200);
	});
}

exports.all = function(req,res) {
	SheetsModel.find(function(err, sheets){
		return res.json(sheets);
	})
}