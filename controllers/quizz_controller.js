var models = require("../models/models.js");

exports.question = function(req, res){
	models.Quizz.findAll().then(function(quiz){
		res.render('quizzes/question', {pregunta: quiz[0].pregunta});
	});
};

exports.answer = function(req, res){
	models.Quizz.findAll().then(function(quiz){
		if (req.query.respuesta === quiz[0].respuesta)
			res.render('quizzes/answer', {respuesta: 'Correcto'});
		else
			res.render('quizzes/answer', {respuesta: 'Incorrecto'});
	});
	
};