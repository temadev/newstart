var passport = require('passport'),
	User = require('../models/Mongo.js');

module.exports = {

	register: function (req, res, next) {

		var user = new User();

		user.username = req.body.username;
		user.email = req.body.email;
		user.password = req.body.password;
		user.role = req.body.role;


		user.save(function(err){
			if (err === 'UserAlreadyExists') return res.send(403, "User already exists");
			else if (err) return res.send(500);

			passport.authenticate('local', function(err, user) {
				if (err) return next(err);

				req.logIn(user, function(err) {
					if (err) return next(err);
					return res.json(200, {
						"role": user.role,
						"username": user.username
					});
				});
			})(req, res, next);
		});
	},

	login: function (req, res, next) {
		passport.authenticate('local', function (err, user) {
			if (err) return next(err);
			if (!user) {
				return res.send(400)
			}
			req.logIn(user, function (err) {
				if (err) return next(err);
				if (req.body.rememberme) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
				return res.json(200, {
					"role": user.role,
					"username": user.username
				});
			});
		})(req, res, next);
	},

	logout: function (req, res) {
		req.logout();
		res.send(200);
	}
};