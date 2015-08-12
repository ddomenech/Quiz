//MW de autorización de acceso HTTP restringidos
var self = this;
exports.loginRequired = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

//GET /login  --Formulario de login
exports.new = function(req, res, next) {
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', {errors: errors});
};

//POST /login --Crear la session
exports.create = function(req, res, next) {
  var login = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user){

    if (error) {
        req.session.errors = [{"message": 'Se ha producido un error: '+error}];
        res.redirect("/login");
        return;
    }

    //Crear req.session.user y guardar campos id y username
    //La sesión se define por la existencia de: req.session.user
    req.session.user = {id:user.id, username:user.username};
    req.session.time = new Date();
    console.log("hora login: "+ req.session.time);
    res.redirect(req.session.redir.toString());
  });
};

//DELETE destroy
exports.destroy = function(req, res, next) {
  delete req.session.user;
  delete req.session.time;
  res.redirect(req.session.redir.toString());
};

exports.autoLogout = function (req, res, next) {
  var time = new Date();
  console.log("variable time: " + time);
  console.log("session time: " + req.session.time);
  console.log("tiempo trascurrido: "+ (time - new Date(req.session.time))/1000);
  if ((time - new Date(req.session.time))/1000 > 120) {
    delete req.session.user;
    delete req.session.time;
    res.redirect(req.session.redir.toString());
  } else {req.session.time = time;}
};
