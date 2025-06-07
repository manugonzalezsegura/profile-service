// backend/perfil-service/server.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');


const { sequelize } = require('./config/DB');
const models = require('./models');
const { ports }      = require('./config/env'); 

const { perfil: port } = require('./config/env').ports;



// 2) Importar rutas
const adminRoutes = require("./routes/adminRoutes");
const perfilRoutes    = require('./routes/perfilRoutes');
const valoracionRoutes= require('./routes/valoracionRoutes');
const mlRoutes = require('./routes/mlRoutes');
const app = express();
app.use(cors());
app.use(express.json());

// 3) Sincronizar tablas (en dev force: true; en prod, ¡no!)
sequelize.sync({ force: false })
  .then(() => console.log('🔄 Perfil DB sincronizada'))
  .catch(err => console.error('❌ Error DB Perfil:', err));

// 4) Montar rutas bajo /api
app.use('/api', perfilRoutes);
app.use('/api/valoraciones', valoracionRoutes);
app.use(mlRoutes);
app.use("/admin", adminRoutes);


// 5) Debug headers
app.get('/debug-headers', (req, res) => res.json(req.headers));

// 6) Levantar servidor
app.listen(ports.prof, () => {
  console.log(`🛡️ Perfil Service escuchando en http://localhost:${ports.prof}`);
});
