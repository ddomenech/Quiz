//Get /quizes/question
exports.question = function(req, res, next) {
  res.render('quizes/question', {pregunta: '¿Capital de Italia?'});  
};

//GET /quizes/answer
exports.answer = function(req, res, next) {
  if (req.query.respuesta === 'Roma') {
   res.render('quizes/answer', {respuesta: 'Correcto'});     
  }else{
   res.render('quizes/answer', {respuesta: 'Incorrecto'});
  }
};

//GET /author
exports.author = function(rq, res, next) {
  res.render('creditos/author', {author: 'David Domenech', foto: 'images/foto.png' });  
};