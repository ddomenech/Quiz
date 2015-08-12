

var models = require('../models/models.js');
//Comprueba si el usuario esta registrado en users
//Si autenticación falla o hay errores se ejecuta callback(error).
exports.show = function(req, res, next) {
  var statics = {
      nQuizes: 0,
      nComments:0,
      nQuiWithComments: 0,
      nQuizNoComments: 0
    },
    init = init;
    nquiz = Nquiz;
    nComments = nComments;
    init();

 function init() {
       nComments();
  };

//recuperar numero de preguntas
  function Nquiz() {
    models.Quiz.findAndCountAll().then(function(result){
      statics.nQuizes =result.count;
      statics.nQuizNoComments = statics.nQuizes-statics.nQuiWithComments;
      //statics.nQuiWithComments = statics.nQuizes-statics.nQuiWithComments;
      console.log(JSON.stringify(statics));
      res.render('statics/show', {statics: statics, errors: []});
    });
  }

//recuperar numero de Comentarios y Preguntas con comentarios
  function nComments() {
    models.Comment.findAndCountAll({order: ['QuizId']})
      .then(
        function(result) {
          statics.nComments = result.count;
          var quizid = 0;
          for (i=0; i < result.rows.length; i++) {
            if (result.rows[i].QuizId != quizid) {
              statics.nQuiWithComments+=1;
              quizid = result.rows[i].QuizId;
            }
          }
          nquiz();
      });
  }

};
