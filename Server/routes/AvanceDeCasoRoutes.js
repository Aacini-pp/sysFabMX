import express from 'express';
import UserController from '../controllers/UserController.js'

import avanceDeCasoController from '../controllers/AvanceCasoController.js'


import sessionCoordinadora from './../middleware/sessionCoordinadora.js'
import sessionVoluntoria from './../middleware/sessionVoluntoria.js'
import sessionMiddleware from './../middleware/session.js'


const router = express.Router();



//MIDDLEWAREs
/* 
router.get("/", sessionVoluntoria);
router.get("/:id", sessionVoluntoria);
router.post("/", sessionVoluntoria);
router.put("/:id", sessionVoluntoria);
router.delete("/:id", sessionVoluntoria);
 */

router.get("/", avanceDeCasoController.listar);
router.get("/:id", avanceDeCasoController.obtener);
router.post("/", avanceDeCasoController.crear);
router.put("/:id", avanceDeCasoController.actualizar);
router.delete("/:id", avanceDeCasoController.eliminar);




export default router;