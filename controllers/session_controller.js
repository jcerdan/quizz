
exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {
		errors: errors,
	});
	
};

exports.create = function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	var userController = require("./user_controller");
	userController.autenticar(username, password, function(err, user){
		console.log(err);
		if(err){
			req.sessions.error = [{message: "Se ha producido un error: " + err }];
			res.redirect("/login");
		}
		else{
			req.session.user = {
				id: user.id,
				username: user.username
			};
			console.log("redirect to: " + req.session.redir);
			res.redirect(req.session.redir.toString());
		}
	});
};

exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};
