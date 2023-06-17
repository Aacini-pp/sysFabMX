import express from 'express';
import EstadosControler from '../../controllers/Catalogos/EstadosController.js'

import sessionCoordinadora from '../../middleware/sessionCoordinadora.js'

const router = express.Router();


//MIDDLEWARE
router.post("/",sessionCoordinadora);
router.put("/:id",sessionCoordinadora);
router.delete("/:id",sessionCoordinadora);





router.get("/",EstadosControler.listar);
router.get("/:id",EstadosControler.obtener);
router.post("/",EstadosControler.crear);
router.put("/:id",EstadosControler.actualizar);
router.delete("/:id",EstadosControler.eliminar);


export default router;