
users = {
	admin: {
		id: 1,
		username: "admin",
		password: "1234",
	},
	pepe: {
		id: 1,
		username: "pepe",
		password: "5678",
	},
};

exports.autenticar = function(username, password, callback){
	if (users[username]){
		if (password === users[username].password){
			callback(null, users[username]);
		}
		else{
			callback(new Error("Contraseña incorrecta"));
		}
	}
	else{
		callback(new Error("Este usuario no existe"));
	}
};
