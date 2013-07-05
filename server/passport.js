var mongoose = require('mongoose'),
	LocalStrategy = require('passport-local').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
//	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	GoogleStrategy = require('passport-google').Strategy,
	GitHubStrategy = require('passport-github').Strategy,
	LinkedInStrategy = require('passport-linkedin').Strategy;
//	User = mongoose.model('User');

module.exports = function (passport, config, User) {

	passport.use(
		new LocalStrategy(
			function (username, password, done) {

				var user = User.findByUsername(username);

				if (!user) {
					done(null, false, { message: 'Incorrect username.' });
				}
				else if (user.password != password) {
					done(null, false, { message: 'Incorrect username.' });
				}
				else {
					return done(null, user);
				}
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
				var user = User.findOrCreateOauthUser(profile.provider, profile.id);
				done(null, user);
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
				var user = User.findOrCreateOauthUser(profile.provider, profile.id);
				done(null, user);
			}
		)
	);

//	passport.use(
//		new GoogleStrategy({
//				clientID: config.google.clientID,
//				clientSecret: config.google.clientSecret,
//				callbackURL: config.google.callbackURL
//			},
//			function (accessToken, refreshToken, profile, done) {
//				var user = User.findOrCreateOauthUser(profile.provider, profile.id);
//				done(null, user);
//			}
//		)
//	);

	passport.use(
		new GoogleStrategy({
				returnURL: "http://localhost:5000/auth/google/return",
				realm: "http://localhost:5000/"
			},
			function(identifier, profile, done) {
				var user = User.findOrCreateOauthUser('google', identifier);
				done(null, user);
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
				var user = User.findOrCreateOauthUser(profile.provider, profile.id);
				done(null, user);
			}
		)
	);

	passport.use(
		new LinkedInStrategy({
				consumerKey: config.facebook.clientID,
				consumerSecret: config.facebook.clientSecret,
				callbackURL: config.facebook.callbackURL
			},
			function (token, tokenSecret, profile, done) {
				var user = User.findOrCreateOauthUser('linkedin', profile.id);
				done(null, user);
			}
		)
	);

	// serialize sessions
	passport.serializeUser(function (user, done) {
		done(null, user.id)
	});

	passport.deserializeUser(function (id, done) {
		var user = User.findById(id);

		if (user) {
			done(null, user);
		}
		else {
			done(null, false);
		}
	});

};
