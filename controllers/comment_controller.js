var models = require("../models/models.js");

exports.load = function(req, res, next, commentId){
	models.Comment.find({
		where: {
			id: Number(commentId)
		}
	}).then(function(comment){
		if (comment){
			req.comment = comment;
			next();
		}
		else{
			next(new Error("Este comentario no existe: " + commentId));
		}
	}).catch(function(error){
		next(error);
	});
};

exports.publish = function(req, res){
	req.comment.publicado = true;

	req.comment.save({
		fields: ["publicado"]
	}).then(function(){
		res.redirect("/quizzes/" + req.params.quizzId);
	}).catch(function(err){
		next(err);
	});
};

exports.new = function(req, res){
	var comment = models.Comment.build({
		texto: "",
	});
	res.render('comments/new', {
		comment: comment,
		quizz: req.quizz,
		quizzId: req.params.quizzId,
		errors: []
	});
};

exports.create = function(req, res){
	var comment = models.Comment.build({
		texto: req.body.comment.texto,
		QuizzId: req.params.quizzId
	});

	comment
		.validate()
		.then(function(err){
			if (err){
				res.render('comments/new', {
					comment:comment, 
					quizz: req.quizz,
					quizzId: req.params.quizzId,
					errors: err.errors
				});
			}
			else{
				comment.save().then(function(){
					res.redirect('/quizzes/' + req.params.quizzId);
				});
			}
		})
};

/*
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
*/