var _ = require('underscore'),
	User = require('../models/User.js');

module.exports = {
	index: function (req, res) {
		User.find({},function(err, users) {
			if(err) console.log(err);
			users.forEach(function (user) {
				delete user.password;
				delete user.twitter;
				delete user.facebook;
				delete user.github;
			});

			res.json(users);
		});
	}
};