var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	_ = require('underscore'),
	userRoles = require('../../client/js/routingConfig').userRoles,
	authTypes = ['facebook', 'twitter', 'github'];

/**
 * User Schema
 */

var UserSchema = new Schema({
	username: { type: String, default: ''},
	email: { type: String, default: '' },
	role: {},
	hashed_password: { type: String, default: '' },
	salt: { type: String, default: '' },
	provider: { type: String, default: '' },
	facebook: {},
	twitter: {},
	github: {},
	updatedAt: { type: Date, default: Date.now },
	lastConnected: { type: Date, default: '' }
});


/**
 * Virtuals
 */

UserSchema
	.virtual('password')
	.set(function(password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password)
	})
	.get(function() { return this._password });


/**
 * Validations
 */

var validatePresenceOf = function (value) {
	return value && value.length
};

UserSchema
	.path('email')
	.validate(function (value) {
		if (authTypes.indexOf(this.provider) !== -1) return true;
		var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return re.test(value)
	}, 'Invalid email');

UserSchema.path('email').validate(function (email, fn) {
	var User = mongoose.model('User');

	// Check only when it is a new user or when email field is modified
	if (this.isNew || this.isModified('email')) {
		User.find({ email: email }).exec(function (err, users) {
			fn(err || users.length === 0)
		})
	} else fn(true)
}, 'Email already exists'); // todo: how to send an error to angular?

UserSchema.path('username').validate(function (username) {
	if (authTypes.indexOf(this.provider) !== -1) return true;
	return username.length
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
	if (authTypes.indexOf(this.provider) !== -1) return true;
	return hashed_password.length
}, 'Password cannot be blank');

/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
	if (!this.isNew) return next();

	if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
		next(new Error('Invalid password'));
	else
		next()
});


/**
 * Methods
 */

UserSchema.methods = {

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