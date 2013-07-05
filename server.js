/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	passport = require('passport'),
	path = require('path');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// load configurations
var env = process.env.NODE_ENV || 'development',
	config = require('./server/config')[env],
	mongoose = require('mongoose');

// db connection
mongoose.connect(config.db);

// *** here we should load our models
var User = require('./server/models/User.js');

// passport config
require('./server/passport')(passport, config, User);

var app = express();

// don't use logger for test env
if (process.env.NODE_ENV !== 'test')
	app.use(express.logger('dev'));

app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');
app.use(require('less-middleware')({ src: __dirname + '/client' }));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.favicon());

app.configure(function () {
	app.set('port', process.env.PORT || 5000);
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieSession({secret: process.env.COOKIE_SECRET || "o@:&MZNPF(s.T)3?*;^1~TDjNE}=3xy$>SpB7dE%dA-}fAn.b[RRU{cg+P#[):/"}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());
});

// development env config
app.configure('development', function () {
	app.locals.pretty = true
});

// socket.io
var server = require('http').createServer(app);

// routes
require('./server/routes.js')(app);

// start the app by listening on <port>
server.listen(app.get('port'), function(){
	console.log('Server listening on port %d in %s mode', app.get('port'), app.settings.env);
});

var io = require('socket.io').listen(server);

io.configure(function(){});
io.sockets.on('connection', function (socket) {});