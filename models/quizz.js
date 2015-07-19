module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quizz', 
			{
				pregunta: DataTypes.STRING,
				respuesta: DataTypes.STRING,
			}
		);
}