import express from 'express';
import TicketController from '../controllers/TicketController.js'

import sessionCoordinadora from './../middleware/sessionCoordinadora.js'
import sessionVoluntoria from './../middleware/sessionVoluntoria.js'
import sessionMiddleware from './../middleware/session.js'

const router = express.Router();

//MIDDLEWAREs
router.get("/",sessionVoluntoria);
router.get("/:id",sessionVoluntoria);
router.post("/",sessionMiddleware);
router.put("/:id",sessionCoordinadora);
router.delete("/:id",sessionCoordinadora);


router.get("/",TicketController.listar);
router.get("/:id",TicketController.obtener);
router.post("/",TicketController.crear);
router.put("/:id",TicketController.actualizar);
router.delete("/:id",TicketController.eliminar);

export default router;