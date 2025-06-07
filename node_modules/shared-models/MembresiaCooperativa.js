// /backend/cooperativa-service/models/MembresiaCooperativa.js
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const MembresiaCooperativa = sequelize.define('MembresiaCooperativa', {
    id_membresia_cop: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_cooperativa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
      defaultValue: 'pendiente'
    },
    fecha_solicitud: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: 'MembresiaCooperativa',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return MembresiaCooperativa;
};
