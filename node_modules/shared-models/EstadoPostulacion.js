// /shared-models/EstadoPostulacion.js
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  return sequelize.define('EstadoPostulacion', {
    id_estado_postulacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'EstadoPostulacion',
    timestamps: false
  });
};
