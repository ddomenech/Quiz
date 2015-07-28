
//Get /quizes/question
var models = require('../models/models.js');

exports.show = function(req, res, next) {
  models.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/show', {quiz: quiz});
  });
};

//GET /quizes/answer
exports.answer = function(req, res, next) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === quiz.respuesta) {
     res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
    } else {
     res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
    }
  });
};

//GET /quizes
exports.index = function(req, res, next) {
  var search = "";
  search = (req.query.search == "" || typeof req.query.search == "undefined")? "": req.query.search ;
  console.log(search);
  search = "%" + search.replace(/\s+/g, '%')+ "%";
  console.log("Search replace: "+ search);
  models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes){
    res.render('quizes/index.ejs', {quizes: quizes});
  });
};

//GET /author
exports.author = function(rq, res, next) {
  res.render('creditos/author', {author: 'David Domenech', foto: 'images/foto.png' });
};
