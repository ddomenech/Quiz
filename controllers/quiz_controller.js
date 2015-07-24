
//Get /quizes/question
var models = require('../models/models.js');

exports.question = function(req, res, next) {
  models.Quiz.findAll().then(function(quiz){
    res.render('quizes/question', {pregunta: quiz[0].pregunta});
  });
};

//GET /quizes/answer
exports.answer = function(req, res, next) {
  models.Quiz.findAll().then(function(quiz) {
    if (req.query.respuesta === quiz[0].respuesta) {
     res.render('quizes/answer', {respuesta: 'Correcto'});
    } else {
     res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }
  });
};

//GET /author
exports.author = function(rq, res, next) {
  res.render('creditos/author', {author: 'David Domenech', foto: 'images/foto.png' });
};
