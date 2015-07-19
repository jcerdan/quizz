var models = require("../models/models.js");

exports.load = function(req, res, next, quizzId){
	models.Quizz.findById(quizzId).then(function(quizz){
		if (quizz){
			req.quizz = quizz;
			next();
		}
		else{
			next(new Error("no Existe el ID: " + quizzId));
		}
	}).catch(function(error){
		next(error);
	});
};

exports.show = function(req, res){
	res.render('quizzes/show', {
		quizz: req.quizz,
	});
};

exports.answer = function(req, res){
	if (req.query.respuesta === req.quizz.respuesta)
		res.render('quizzes/answer', {
			respuesta: 'Correcto',
			quizz: req.quizz,
		});
	else
		res.render('quizzes/answer', {
			respuesta: 'Incorrecto',
			quizz: req.quizz,
		});
};

exports.index = function(req, res){
	models.Quizz.findAll().then(function(quizzes){
		console.log(quizzes);
		res.render('quizzes/index', {
			quizzes: quizzes,
		})
	})
};
	
