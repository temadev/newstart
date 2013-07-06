var mongoose = require('mongoose'),
	userRoles = require('../client/js/routingConfig').userRoles,
	LocalStrategy = require('passport-local').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	GitHubStrategy = require('passport-github').Strategy;

module.exports = function (passport, config, User) {

	// serialize sessions
	passport.serializeUser(function (user, done) {
		done(null, user.id)
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			if (user) {
				done(null, user);
			}
			else {
				done(null, false);
			}
		});
	});

	passport.use(
		new LocalStrategy({
				usernameField: 'email',
				passwordField: 'password'
			},
			function (email, password, done) {

				User.findOne({email: email}, function (err, user) {
					if (!user) {
						done(null, false, { message: 'Incorrect email.' });
					}
					if (!user.authenticate(password)) {
						done(null, false, { message: 'Invalid password' })
					}
					return done(null, user);
				});
			}
		)
	);

	passport.use(
		new TwitterStrategy({
				consumerKey: config.twitter.clientID,
				consumerSecret: config.twitter.clientSecret,
				callbackURL: config.twitter.callbackURL
			},
			function (token, tokenSecret, profile, done) {

				User.findOne({"twitter.id": profile.id}, function(err, user) {
					if (!err && user != null) {
						User.update({"_id": user["_id"]}, { $set: {lastConnected: new Date()} } ).exec();
						done(null, user)
					}
					else {
						var userData = new User({
							username: profile._json.name || profile._json.screen_name,
							role: userRoles.user,
							provider: profile.provider,
							twitter: profile._json,
							createdAt: Date.now()
						});

						userData.save(function(err) {
							if (err) console.log(err);
							else done(null, userData)
							}
						)
					}
				});
			}
		)
	);

	passport.use(
		new FacebookStrategy({
				clientID: config.facebook.clientID,
				clientSecret: config.facebook.clientSecret,
				callbackURL: config.facebook.callbackURL
			},
			function (accessToken, refreshToken, profile, done) {

				User.findOne({"facebook.id": profile.id}, function(err, user) {
					if (!err && user != null) {
						User.update({"_id": user["_id"]}, { $set: {lastConnected: new Date()} } ).exec();
						done(null, user)
					}
					else {
						var userData = new User({
							username: profile._json.name,
							role: userRoles.user,
							provider: profile.provider,
							facebook: profile._json,
							createdAt: Date.now()
						});

						userData.save(function(err) {
							if (err) console.log(err);
							else done(null, userData)
							}
						)
					}
				});
			}
		)
	);

	passport.use(
		new GitHubStrategy({
				clientID: config.github.clientID,
				clientSecret: config.github.clientSecret,
				callbackURL: config.github.callbackURL
			},
			function (accessToken, refreshToken, profile, done) {

				User.findOne({"github.id": profile.id}, function(err, user) {
					if (!err && user != null) {
						User.update({"_id": user["_id"]}, { $set: {lastConnected: new Date()} } ).exec();
						done(null, user)
					}
					else {
						var userData = new User({
							username: profile._json.login,
							role: userRoles.user,
							provider: profile.provider,
							github: profile._json,
							createdAt: Date.now()
						});

						userData.save(function(err) {
								if (err) console.log(err);
								else done(null, userData)
							}
						)
					}
				});
			}
		)
	);

};
