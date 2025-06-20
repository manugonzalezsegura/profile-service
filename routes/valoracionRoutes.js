// backend/profile-service/routes/valoracionRoutes.js
const router = require('express').Router();
const {
  createValoracion,
  listRecibidas,
  listHechas,
  existeValoracion,
} = require('../controllers/valoracionController');
const authMiddleware = require('../middlewares/authMiddleware');


// Todas las rutas protegidas
router.post('/', authMiddleware, createValoracion);
router.get('/valoraciones/existe', authMiddleware,existeValoracion);
router.get('/recibidas/:usuarioId', authMiddleware, listRecibidas);
router.get('/hechas/:usuarioId', authMiddleware, listHechas);

module.exports = router;
