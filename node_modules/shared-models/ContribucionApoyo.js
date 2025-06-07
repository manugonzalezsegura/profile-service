// /backend/cooperativa-service/models/ContribucionApoyo.js
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const ContribucionApoyo = sequelize.define('ContribucionApoyo', {
    id_contribucion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_solicitud: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_donante: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    orden_transaccion: { // 🆕 UUID/buyOrder para trazabilidad con Transbank
      type: DataTypes.STRING(36),
      allowNull: false
    },
    token_ws: { // 🆕 para guardar el token recibido
      type: DataTypes.STRING(255),
      allowNull: true
    },
    estado: { // 🆕 puedes tener 'pendiente', 'pagado', etc.
      type: DataTypes.ENUM('pendiente', 'pagado'),
      defaultValue: 'pendiente'
    },
    fecha_contribucion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: 'ContribucionApoyo',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return ContribucionApoyo;
};
