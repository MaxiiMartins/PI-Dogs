const { Router } = require('express');
const dogsRoutes = require("./dogsRoutes")
const temperamentRoutes = require("./temperamentRoutes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/dogs", dogsRoutes)

router.use("/temperament", temperamentRoutes)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
