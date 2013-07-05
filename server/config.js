var path = require('path'),
	rootPath = path.normalize(__dirname + '/..');

module.exports = {
	development: {
		db: 'mongodb://localhost/newstart_dev',
		root: rootPath,
		app: {
			name: 'newstart development'
		},
		facebook: {
			clientID: "184759381690874",
			clientSecret: "5960153d92fcd2abdf63f23c7b4a2ef9",
			callbackURL: "http://localhost:5000/auth/facebook/callback"
		},
		twitter: {
			clientID: "9rid8aXNUMTWIi5HC31Amw",
			clientSecret: "iFY6paYKtze9msXxJuU0EDoBISkAnRFKafbXYVbAk",
			callbackURL: "http://localhost:5000/auth/twitter/callback"
		},
		github: {
			clientID: '73ae4222ec5ccaef72df',
			clientSecret: '8fc88196c74f6ab9e7cbd0aef191be2ebe3dfb48',
			callbackURL: 'http://localhost:5000/auth/github/callback'
		},
		google: {
			clientID: "435868730292.apps.googleusercontent.com",
			clientSecret: "dMWZHfi9AyC2-1mVuiNU8KVL",
			callbackURL: "http://localhost:5000/auth/google/callback"
		},
		linkedin: {
			clientID: "9ae46969-9e5d-4afd-bc31-13a3c4cac0d1",
			clientSecret: "4cff707b-afa3-4205-b772-c5f8fb37c7fb",
			callbackURL: "http://localhost:5000/auth/linkedin/callback"
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
			clientSecret: "5960153d92fcd2abdf63f23c7b4a2ef9",
			callbackURL: "http://localhost:5000/auth/facebook/callback"
		},
		twitter: {
			clientID: "CONSUMER_KEY",
			clientSecret: "CONSUMER_SECRET",
			callbackURL: "http://localhost:5000/auth/twitter/callback"
		},
		github: {
			clientID: '73ae4222ec5ccaef72df',
			clientSecret: '8fc88196c74f6ab9e7cbd0aef191be2ebe3dfb48',
			callbackURL: 'http://localhost:5000/auth/github/callback'
		},
		google: {
			clientID: "73ae4222ec5ccaef72df",
			clientSecret: "dMWZHfi9AyC2-1mVuiNU8KVL",
			callbackURL: "http://localhost:5000/auth/google/callback"
		},
		linkedin: {
			clientID: "9ae46969-9e5d-4afd-bc31-13a3c4cac0d1",
			clientSecret: "4cff707b-afa3-4205-b772-c5f8fb37c7fb",
			callbackURL: "http://localhost:5000/auth/linkedin/callback"
		}
	},
	production: {

	}
};
