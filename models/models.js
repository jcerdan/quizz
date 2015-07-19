var path = require("path");
var Sequelize = require("sequelize");

var sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'quizz.sqlite')
});

var Quizz = sequelize.import(path.join(__dirname, 'quizz'));

exports.Quizz = Quizz;

sequelize.sync().then(function(){
	Quizz.count().then(function(count){
		if (count === 0){
			Quizz.create(
				{
					pregunta: "Capital de Italia",
					respuesta: "Roma"
				}
			).then(console.log("Base de datos inicializda."));
		}
	})
});