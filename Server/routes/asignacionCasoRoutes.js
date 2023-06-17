import express from 'express';
import AsignacionCasoController from '../controllers/AsignacionCasoController.js'
import sessionCoordinadora from './../middleware/sessionCoordinadora.js'
import sessionMiddleware from './../middleware/session.js'
const router = express.Router();


//MIDDLEWAREs
router.get("/",sessionCoordinadora);
router.get("/:id",sessionCoordinadora);
router.post("/",sessionCoordinadora);
router.put("/:id",sessionCoordinadora);
router.delete("/:id",sessionCoordinadora);





router.get("/",AsignacionCasoController.listar);
router.get("/:id",AsignacionCasoController.obtener);
router.post("/",AsignacionCasoController.crear);
router.put("/:id",AsignacionCasoController.actualizar);
router.delete("/:id",AsignacionCasoController.eliminar);

export default router;