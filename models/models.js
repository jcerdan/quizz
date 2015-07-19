var path = require("path");
var Sequelize = require("sequelize");

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

var sequelize = new Sequelize(DB_name, user, pwd, {
  dialect: dialect,
  protocol: protocol,
  host: host,
  port: port,
  storage: storage,
  omitNull: true
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
				});
			Quizz.create(
				{
					pregunta: "Capital de Portugal",
					respuesta: "Lisboa"
				}
			).then(console.log("Base de datos inicializda."));
		}
	})
});