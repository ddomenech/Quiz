module.exports = function(sequelize, DataTypes){

  return sequelize.define('Quiz',
    {
        pregunta: {
          type: DataTypes.STRING,
          validate: {notEmpty: {msg: "-> falta pregunta"}}
        },
        respuesta: {
          type: DataTypes.STRING,
          validate: {notEmpty: {msg: "-> falta respuesta"}}
        },
        tema: {
          type: DataTypes.STRING,
          validate: {notEmpty: {msg: "-> falta tema"}}
        }
    });
}
