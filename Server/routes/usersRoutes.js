import express from 'express';
import UserController from '../controllers/UserController.js'


import sessionCoordinadora from './../middleware/sessionCoordinadora.js'
import sessionVoluntoria from './../middleware/sessionVoluntoria.js'
import sessionMiddleware from './../middleware/session.js'


const router = express.Router();



//MIDDLEWAREs

router.get("/", sessionVoluntoria);
router.get("/:id", sessionVoluntoria);
router.post("/", sessionCoordinadora);
router.put("/:id", sessionCoordinadora);
router.delete("/:id", sessionCoordinadora);


router.get("/", UserController.listar);
router.get("/:id", UserController.obtener);
router.post("/", UserController.crear);
router.put("/:id", UserController.actualizar);
router.delete("/:id", UserController.eliminar);




export default router;