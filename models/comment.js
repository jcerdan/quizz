module.exports = function(sequelize, DataTypes){
	return sequelize.define('Comment', 
			{
				texto: {
					type: DataTypes.STRING,
					validate: {
						notEmpty: {
							msg: "El campo de texto del comentario no puede estar vacío."
						}
					}
				},
				/*
				Quizz: {
					type: DataTypes.ENUM,
					values: ['Humanidades', 'Ocio', 'Ciencia', 'Tecnologia'],
					validate: {
		        isIn: {
		        	args: [['Humanidades', 'Ocio', 'Ciencia', 'Tecnologia']],
		        	msg: "Debes escoger un tema para el quizz",
		        }
		      }
				}
				*/
			}
		);
}