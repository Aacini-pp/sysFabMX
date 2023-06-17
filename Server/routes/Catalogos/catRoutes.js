import express from 'express';
//import EstadosControler from '../../controllers/Catalogos/EstadosController.js'
 import CatControler from '../../controllers/Catalogos/CatController.js'

import sessionCoordinadora from '../../middleware/sessionCoordinadora.js'
import sessionVoluntoria from   '../../middleware/sessionVoluntoria.js'
const router = express.Router();


//MIDDLEWARE
router.get("/Estatus",sessionVoluntoria);
router.get("/Roles",sessionVoluntoria);
router.get("/Semaforo",sessionVoluntoria);
router.get("/Voluntarias",sessionCoordinadora);



router.get("/Estatus",CatControler.listarEstatus);
router.get("/Roles",CatControler.listarRoles);
router.get("/Semaforo",CatControler.listarSemaforo);


router.get("/Voluntarias",CatControler.listarVoluntarias);


export default router;