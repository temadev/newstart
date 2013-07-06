var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('underscore'),
	check = require('validator').check,
	userRoles = require('../../client/js/routingConfig').userRoles;

/**
 * User Schema
 */

var UserSchema = new Schema({
	username: { type: String, default: ''},
	email: { type: String, default: '' },
	role: {},
	password: { type: String, default: '' },
	salt: { type: String, default: '' },
	provider: { type: String, default: '' },
	facebook: {},
	twitter: {},
	google: {},
	github: {},
	updatedAt: { type: Date, default: Date.now },
	lastConnected: { type: Date, default: '' }
});


/**
 * Virtual
 */

UserSchema
	.virtual('doubleName')
	.get(function () {
		return this.username + ' ' + this.username;
	});


/**
 * Virtual
 */

//UserSchema
//	.path('email')
//	.validate(function (value) {
//		var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//		return re.test(value)
//	}, 'Invalid email');


/**
 * Methods
 */

UserSchema.methods = {

	findOrCreateOauthUser: function (provider) {
		this.find({provider: provider}, function(err) {
			if(err) {
				user = {
					username: provider + '_user', // Should keep Oauth users anonymous on demo site
					role: userRoles.user,
					provider: provider
				};
				user[provider] = providerId;
				users.push(user);
			}
		});

	},

	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */

	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password
	},

	/**
	 * Make salt
	 *
	 * @return {String}
	 * @api public
	 */

	makeSalt: function () {
		return Math.round((new Date().valueOf() * Math.random())) + ''
	},

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */

	encryptPassword: function (password) {
		if (!password) return '';
		var encrypred;
		try {
			encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex');
			return encrypred
		} catch (err) {
			return ''
		}
	}
};

module.exports = mongoose.model('User', UserSchema);