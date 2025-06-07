// /backend/cooperativa-service/models/Cooperativa.js
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const Cooperativa = sequelize.define('Cooperativa', {
    id_cooperativa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: DataTypes.STRING,
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    },
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: 'Cooperativa',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Cooperativa;
};
