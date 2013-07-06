var mongoose = require('mongoose'),
	LocalStrategy = require('passport-local').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
//	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	GoogleStrategy = require('passport-google').Strategy,
	GitHubStrategy = require('passport-github').Strategy,
	LinkedInStrategy = require('passport-linkedin').Strategy,
	userRoles = require('../client/js/routingConfig').userRoles;

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
		new LocalStrategy(
			function (username, password, done) {

				User.findOne({username: username}, function (err, user) {
					if (!user) {
						done(null, false, { message: 'Incorrect username.' });
					}
					else if (user.password != password) {
						done(null, false, { message: 'Incorrect username.' });
					}
					else {
						return done(null, user);
					}
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
//				console.log(profile.id);

				User.findOne({"twitter.id": profile.id}, function(err, user) {
					if (!err && user != null) { // нет ошибки и пользователь найден
						console.log('найден юзер по твиттер ид');
						console.log(user);
						User.update({"_id": user["_id"]}, { $set: {lastConnected: new Date()} } ).exec();
						done(null, user)
					}
					else { // если совпадений не найдено
						console.log('если совпадений не найдено')
						var userData = new User({
							username: profile._json.screen_name,
							role: userRoles.user,
							provider: profile.provider,
							twitter: profile._json,
							createdAt: Date.now()
						});

						userData.save(function(err) {
							if (err) console.log(err);
							else {
								console.log('Saving user...');
								done(null, userData)
								}
							}
						)
					}
				});
//				var user = { "twitter.id": profile.id };
//				console.log(user);
//				done(null, user);
			}
		)
	);
//	passport.use(
//		new TwitterStrategy({
//				consumerKey: config.twitter.clientID,
//				consumerSecret: config.twitter.clientSecret,
//				callbackURL: config.twitter.callbackURL
//			},
//			function (token, tokenSecret, profile, done) {
//
//				User.findOne({providerId: profile.id},
//					function(err, user) {
//						if (!err && user != null) {
//							var ObjectId = mongoose.Types.ObjectId;
//							User.update({"_id": user["_id"]}, { $set: {lastConnected: new Date()} } ).exec();
//						} else {
//							var userData = new User({
//								provider: profile.provider,
//								providerUsername: profile.username,
//								providerId: profile.username + ":" + profile.id,
//								created: Date.now(),
//								oauthToken: token,
//								username: profile.displayName,
//								profilePicture: 'https://api.twitter.com/1/users/profile_image?screen_name=' + profile.username +'&size=bigger'
//							});
//							userData.save(function(err) {
//								if (err) console.log(err);
//								else console.log('Saving user...');
//							});
//						}
//					}
//				);
//				var user = { id: profile.id, name: profile.username });
//				done(null, user);
//			}
//		)
//	);

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

};
