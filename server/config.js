var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	development: {
		db: 'mongodb://localhost/newstart_dev',
		root: rootPath,
		app: {
			name: 'newstart development'
		},
		facebook: {
			clientID: "184759381690874",
			clientSecret: "1f5129b5993ec5c8157a854d8c2dc6b0",
			callbackURL: "http://localhost:5000/auth/facebook/callback"
		},
		twitter: {
			clientID: "CONSUMER_KEY",
			clientSecret: "CONSUMER_SECRET",
			callbackURL: "http://localhost:5000/auth/twitter/callback"
		},
		github: {
			clientID: '73ae4222ec5ccaef72df',
			clientSecret: 'cc6a8b1fbadde6ab26e4ecd5b40cc5aab1222ce3',
			callbackURL: 'http://localhost:5000/auth/github/callback'
		},
		google: {
			clientID: "APP_ID",
			clientSecret: "APP_SECRET",
			callbackURL: "http://localhost:5000/auth/google/callback"
		},
		linkedin: {
			clientID: "APP_ID",
			clientSecret: "APP_SECRET",
			callbackURL: "http://localhost:5000/auth/google/callback"
		}
	},
	test: {
		db: 'mongodb://localhost/newstart_test',
		root: rootPath,
		app: {
			name: 'newstart test'
		},
		facebook: {
			clientID: "184759381690874",
			clientSecret: "1f5129b5993ec5c8157a854d8c2dc6b0",
			callbackURL: "http://localhost:5000/auth/facebook/callback"
		},
		twitter: {
			clientID: "CONSUMER_KEY",
			clientSecret: "CONSUMER_SECRET",
			callbackURL: "http://localhost:5000/auth/twitter/callback"
		},
		github: {
			clientID: '73ae4222ec5ccaef72df',
			clientSecret: 'cc6a8b1fbadde6ab26e4ecd5b40cc5aab1222ce3',
			callbackURL: 'http://localhost:5000/auth/github/callback'
		},
		google: {
			clientID: "APP_ID",
			clientSecret: "APP_SECRET",
			callbackURL: "http://localhost:5000/auth/google/callback"
		},
		linkedin: {
			clientID: "APP_ID",
			clientSecret: "APP_SECRET",
			callbackURL: "http://localhost:5000/auth/google/callback"
		}
	},
	production: {

	}
};
