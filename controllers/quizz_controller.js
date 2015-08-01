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
		errors: [],
	});
};

exports.answer = function(req, res){
	if (req.query.respuesta === req.quizz.respuesta)
		res.render('quizzes/answer', {
			respuesta: 'Correcto',
			quizz: req.quizz,
			errors: []
		});
	else
		res.render('quizzes/answer', {
			respuesta: 'Incorrecto',
			quizz: req.quizz,
			errors: []
		});
};

exports.index = function(req, res){
	if (req.query.search){
		var search = req.query.search.replace(" ", "%");
		models.Quizz.findAll({
				where: ["pregunta like ?", "%" + search + "%"],
				order: 'pregunta ASC'
			}).then(function(quizzes){
			res.render('quizzes/index', {
				quizzes: quizzes,
				errors: []
			})
		});
	}
	else{
		models.Quizz.findAll().then(function(quizzes){
			res.render('quizzes/index', {
				quizzes: quizzes,
				errors: []
			})
		});
	}
};

exports.new = function(req, res){
	var quizz = models.Quizz.build({
		pregunta: "pregunta",
		respuesta: "respuesta",
	});
	res.render('quizzes/new', {
		quizz: quizz,
		errors: []
	});
};

exports.create = function(req, res){
	var quizz = models.Quizz.build(req.body.quizz);

	quizz
		.validate()
		.then(function(err){
			if (err){
				res.render('quizzes/new', {
					quizz:quizz, 
					errors: err.errors
				});
			}
			else{
				quizz.save({
					fields: ["pregunta", "respuesta", "tema"]
				}).then(function(){
					res.redirect('/quizzes');
				});
			}
		})
};

exports.edit = function(req, res){
	var quizz = req.quizz;

	res.render('quizzes/edit', {
		quizz: quizz,
		errors: [],
	})
};
	
exports.update = function(req,res){
	req.quizz.pregunta = req.body.quizz.pregunta;
	req.quizz.respuesta = req.body.quizz.respuesta;
	req.quizz.tema = req.body.quizz.tema;

	req.quizz
		.validate()
		.then(function(err){
			if (err){
				res.render('quizzes/edit', {
					quizz: req.quizz, 
					errors: err.errors
				});
			}
			else{
				req.quizz.save({
					fields: ["pregunta", "respuesta", "tema"]
				}).then(function(){
					res.redirect('/quizzes');
				});
			}
		});
};

exports.destroy = function(req, res){
	req.quizz.destroy().then(function(){
		res.redirect('/quizzes');
	}).catch(function(err){next(error)});	
};
