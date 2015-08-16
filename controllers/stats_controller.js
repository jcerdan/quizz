var models = require("../models/models.js");

exports.index = function(req, res){
	var stats = {};
	
	Promise.all([
		models.Quizz.count(),
		models.Comment.count(),
		models.Quizz.findAndCountAll({
			include: [{
				model: models.Comment
			}]
		})
	]).then(function(results){
		stats.quizzesQuantity = results[0];
		stats.commentsQuantity = results[1];
		stats.promedio = (stats.commentsQuantity / stats.quizzesQuantity).toFixed(2);

		stats.quizzesConComentario = 0;
		stats.quizzesSinComentario = 0;
		for (i in results[2]){
			var objeto = results[2][i];
			for (j in objeto){
				if (objeto[j].Comments.length > 0){
					stats.quizzesConComentario += 1;
				}
				else{
					stats.quizzesSinComentario += 1;
				}
			}
		}
		res.render("stats/index", {
			stats: stats,
			errors: []
		});
	});
	/*
	models.Quizz.count().then(function(quizzesQuantity){
		if (quizzesQuantity){
			stats.quizzesQuantity = quizzesQuantity;
			models.Comment.count().then(function(commentsQuantity){
				if (commentsQuantity){
					stats.commentsQuantity = commentsQuantity;
					res.render("stats/index", {
						stats: stats,
						errors: []
					});
				}
			})
		}
		else{
			next(new Error("No se han podido recuperar correctamente las estadísticas"));
		}
	});
	*/
};

