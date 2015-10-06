'use strict';

var User = require('../../models/user');

exports.createUser = function(req, res) {
	User.findOne({name: req.body.name}, function(err, user){
		if(err) throw err;
		if(!user){
			var newUser = new User({
				name: req.body.name,
				password: req.body.password,
				email: req.body.email,
				admin: false
			});
			newUser.save(function(err){
				if(!err){
					res.json({success: true, message: "Creation successful."});
					console.log("user created successfully");
				}else{
					res.json({success: false, message: "Creation failed, failed to write to database."});
				}
			});
		}else{
			res.json({success: false, message: "Creation failed, duplicate username."})
		}
	});
};