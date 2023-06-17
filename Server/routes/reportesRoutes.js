import express from 'express';
//import EstadosControler from '../../controllers/Catalogos/EstadosController.js'

import ReportesControler from  "./../controllers/ReportesControlle.js"


import sessionCoordinadora from './../middleware/sessionCoordinadora.js'



const router = express.Router();


//MIDDLEWARE

router.get("/",sessionCoordinadora);
router.get("/EntidadFederativa/:fechaInicio/:fechaFin",sessionCoordinadora);
router.get("/RangoDeEdad/:fechaInicio/:fechaFin",sessionCoordinadora);
router.get("/Urgencias/:fechaInicio/:fechaFin",sessionCoordinadora);
router.get("/CasosExitos/:fechaInicio/:fechaFin",sessionCoordinadora);



router.get("/EntidadFederativa/:fechaInicio/:fechaFin",ReportesControler.EntidadFederativa);
router.get("/RangoDeEdad/:fechaInicio/:fechaFin",ReportesControler.RangoDeEdad);
router.get("/Urgencias/:fechaInicio/:fechaFin",ReportesControler.Urgencias);
router.get("/CasosExitos/:fechaInicio/:fechaFin",ReportesControler.CasosExitos);
router.get("/NuevasReferentes/:fechaInicio/:fechaFin",ReportesControler.NuevasReferentes);



export default router;

