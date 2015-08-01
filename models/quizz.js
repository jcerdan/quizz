module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quizz', 
			{
				pregunta: {
					type: DataTypes.STRING,
					validate: {
						notEmpty: {
							msg: "El campo pregunta no puede estar vacío"
						}
					}
				},
				respuesta:  {
					type: DataTypes.STRING,
					validate: {
						notEmpty: {
							msg: "El campo respuesta no puede estar vacío"
						}
					}
				}
			}
		);
}