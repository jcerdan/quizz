var models = require("../models/models.js");

exports.show = function(req, res){
	models.Quizz.findById(req.params.quizzId).then(function(quizz){
		res.render('quizzes/show', {
			quizz: quizz,
		});
	});
};

exports.answer = function(req, res){
	models.Quizz.findById(req.params.quizzId).then(function(quizz){
		if (req.query.respuesta === quizz.respuesta)
			res.render('quizzes/answer', {
				respuesta: 'Correcto',
				quizz: quizz,
			});
		else
			res.render('quizzes/answer', {
				respuesta: 'Incorrecto',
				quizz: quizz,
			});
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
	
