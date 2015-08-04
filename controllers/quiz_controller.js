
//Get /quizes/question
var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz){
      if (quiz){
        req.quiz = quiz;
        next();
      } else {
        next(new Error('No existe quizId='+quizId));
      }
    }
  ).catch(function(error){next(error)});
}

exports.show = function(req, res, next) {
    res.render('quizes/show', {quiz: req.quiz, errors: []});
};

//GET /quizes/answer
exports.answer = function(req, res, next) {
  var respuesta = "Incorrecto";
    if (req.query.respuesta === req.quiz.respuesta) {
      respuesta = 'Correcto';
    }
     res.render(
       'quizes/answer',
       {
         quiz: req.quiz,
         respuesta: respuesta,
         errors: []
       }
     );
};

//GET /quizes
exports.index = function(req, res, next) {
  var search = "";
  search = (req.query.search == "" || typeof req.query.search == "undefined")? "": req.query.search ;
  search = "%" + search.replace(/\s+/g, '%')+ "%";
  models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes){
    res.render('quizes/index.ejs', {quizes: quizes, errors: []});
  });
};

//GET /author
exports.author = function(rq, res, next) {
  res.render('creditos/author', {author: 'David Domenech', foto: 'images/foto.png', errors: []});
};

exports.new = function(req, res, next) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: "otro"}
  );
  res.render('quizes/new', {quiz: quiz, errors: []});
};

exports.create = function(req, res, next) {
  var quiz = models.Quiz.build(req.body.quiz);
  quiz.validate().then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz
        .save({fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes')})
      }
    }
  );
};

exports.edit = function(req, res, next) {
  var quiz = req.quiz;
  res.render('quizes/edit', {quiz: quiz, errors:[]});
}

exports.update = function(req, res, next) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;
  req.quiz
  .validate()
  .then(
      function(err) {
        if (err) {
          res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
        } else {
          req.quiz
          .save({fields: ["pregunta", "respuesta", "tema"]})
          .then( function() { res.redirect('/quizes');});
        }
      }
  );
};

exports.destroy = function(req, res, next) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};
