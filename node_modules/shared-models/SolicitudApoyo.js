// /backend/cooperativa-service/models/SolicitudApoyo.js
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const SolicitudApoyo = sequelize.define('SolicitudApoyo', {
    id_solicitud: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    id_solicitante: {type: DataTypes.INTEGER,allowNull: false},
    id_cooperativa: {type: DataTypes.INTEGER,allowNull: false},
    monto_solicitado: {type: DataTypes.DECIMAL(10, 2),allowNull: false},
    motivo: {type: DataTypes.STRING,allowNull: false},
    estado: {
      type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada', 'completada'),
      defaultValue: 'pendiente'},

    fecha_solicitud: {type: DataTypes.DATE,defaultValue: DataTypes.NOW},
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: 'SolicitudApoyo',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return SolicitudApoyo;
};
