// /backend/profile-service/controllers/valoracionController.js

const { Valoracion,Usuario } = require('../models');

/**
 * POST /api/valoraciones
 */
exports.createValoracion = async (req, res) => {
  const id_autor = req.user.id_usuario;// 🔐 Desde el token
  const { id_receptor, rol_receptor, puntuacion, comentario } = req.body;

  console.log('📝 Intentando crear valoración...');
  console.log('👤 Autor (desde token):', id_autor);
  console.log('🎯 Receptor:', id_receptor);
  console.log('🎭 Rol receptor:', rol_receptor);
  console.log('⭐ Puntuación:', puntuacion);
  console.log('💬 Comentario:', comentario);

  try {
    // Validación básica: que autor ≠ receptor
    if (id_autor === id_receptor) {
      return res.status(400).json({ error: 'No puedes valorarte a ti mismo' });
    }

    // Validación: que receptor exista
    const receptor = await Usuario.findByPk(id_receptor);
    if (!receptor) {
      console.log('❌ Usuario receptor no existe');
      return res.status(404).json({ error: 'Usuario receptor no encontrado' });
    }

    // (Opcional) Validar si ya existe valoración entre autor → receptor
    const yaExiste = await Valoracion.findOne({
      where: { id_autor, id_receptor, rol_receptor }
    });

    if (yaExiste) {
      console.log('⚠️ Ya existe una valoración para este usuario');
      return res.status(400).json({ error: 'Ya has valorado a este usuario' });
    }

    // Crear valoración
    const valoracion = await Valoracion.create({
      id_autor,
      id_receptor,
      rol_receptor,
      puntuacion,
      comentario
    });

    console.log('✅ Valoración creada con éxito:', valoracion.id_valoracion);
    res.status(201).json(valoracion);

  } catch (err) {
    console.error('❌ Error en createValoracion:', err);
    res.status(500).json({ error: 'Error al crear la valoración' });
  }
};




/**
 * GET /api/valoraciones/recibidas/:usuarioId
 */
exports.listRecibidas = async (req, res) => {
  const id_receptor = Number(req.params.usuarioId);
  console.log('📥 Buscando valoraciones recibidas por usuario ID:', id_receptor);

  try {
    const valoraciones = await Valoracion.findAll({
      where: { id_receptor },
      include: [
        {
          model: Usuario,
          as: 'Autor',
          attributes: ['id_usuario', 'nombre', 'email']
        }
      ],
      order: [['creado_en', 'DESC']]
    });

    console.log(`📊 Valoraciones encontradas: ${valoraciones.length}`);
    res.json(valoraciones);

  } catch (err) {
    console.error('❌ Error en listRecibidas:', err);
    res.status(500).json({ error: 'Error al obtener valoraciones recibidas' });
  }
};

/**
 * GET /api/valoraciones/hechas/:usuarioId
 */
exports.listHechas = async (req, res) => {
  const id_autor = Number(req.params.usuarioId);

  try {
    const vals = await Valoracion.findAll({ where: { id_autor } });
    res.json(vals);

  } catch (err) {
    console.error('❌ Error en listHechas:', err);
    res.status(500).json({ error: 'Error al obtener valoraciones hechas' });
  }
};


/**
 * GET /api/valoraciones/existe?id_autor=5&id_receptor=9&rol_receptor=inquilino
 */
exports.existeValoracion = async (req, res) => {
  const id_autor = Number(req.query.id_autor);
  const id_receptor = Number(req.query.id_receptor);
  const rol_receptor = req.query.rol_receptor;

  if (!id_autor || !id_receptor || !rol_receptor) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  try {
    const existe = await Valoracion.findOne({
      where: { id_autor, id_receptor, rol_receptor }
    });

    res.json({ existe: !!existe });
  } catch (err) {
    console.error('❌ Error en existeValoracion:', err);
    res.status(500).json({ error: 'Error al verificar existencia de valoración' });
  }
};
