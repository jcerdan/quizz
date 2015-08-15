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
				publicado: {
					type: DataTypes.BOOLEAN,
					defaultValue: false
				}
			}
		);
}