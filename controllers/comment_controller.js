//Get /quizes/comments
var models = require('../models/models.js');

exports.load = function(req, res, next, commentId) {
  models.Comment.find({
      where: {id: Number(commentId)}
  }).then(function(comment){
    if (comment) {
      req.comment = comment;
      next();
    } else { next(new Error('No existe commentId='+commentId))}
  }).catch(function(error){next(error)});
};

//Get quizes/comment/new
exports.new = function(req, res, next) {
  res.render('comments/new.ejs', {quizid: req.params.quizId, errors:[]});
};

//post quizes/cooments

exports.create = function(req, res, next) {
  var comment = models.Comment.build(
    {
      texto: req.body.comment.texto,
      QuizId: req.params.quizId
    }
  );

  comment
  .validate()
  .then(
    function(err) {
      if (err) {
        res.render('comments/new.ejs',
        {comment: comment, quizid: req.params.quizId, errors: err.errors});
      } else {
        comment
        .save()
        .then(
          function() { res.redirect('/quizes/'+req.params.quizId)}
        )
      }
    }
  ).catch(function(error) {next(error)});
};


exports.publish = function(req, res, next) {
  req.comment.publicado = true;

  req.comment.save({fields: ["publicado"]})
    .then( function(){ res.redirect('/quizes/'+req.params.quizId);})
    .catch(function(error){next(error)});
};
