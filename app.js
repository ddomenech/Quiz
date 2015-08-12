var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var method0verride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');
//var users = require('./routes/users');
var oldtime;
var app = express();

var sessionController = require('./controllers/session_controller');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz_2015_DDP'));
app.use(session());
app.use(method0verride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Helpers dinamicos:
app.use(function(req, res, next) {
  //guardar path en sesson.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }
  //Hacer vibisble req.session en las vistas
  res.locals.session = req.session;
  next();
});

app.use(function(req, res, next){
  var autoLogout = false;
  console.log("Comprueba Usuario esta Logeado");
  if (req.session.user) {
    console.log("Entra al autologAut");
    sessionController.autoLogout(req, res, next);
    if (typeof req.session.user == "undefined") { autoLogout = true;}
  }
  if (!autoLogout) { next() };
});

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors: []
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors: []
  });
});


module.exports = app;
