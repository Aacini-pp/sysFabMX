import express from 'express';
import appControler from '../controllers/appController.js'
import sessionCoordinadora from './../middleware/sessionCoordinadora.js'
import sessionVoluntoria from "./../middleware/sessionVoluntoria.js"
import sessionMiddleware from './../middleware/session.js'

const router = express.Router();


        //MIDDLEWARE
        //AGREGAR MIDLEWARE

//acceder logeado

router.get("/logout", sessionMiddleware);
// router.get("/MisAsignaciones", sessionVoluntoria);
// router.get("/MisTickets", sessionMiddleware);
// router.get("/MisLogros", sessionVoluntoria);




//acceder solo sin contraseña
router.post("/login", appControler.login);
router.post("/registrarse", appControler.registrarse);
router.post("/forgot-password", appControler.PasswordOlvidado);
router.get("/verify-change-password/:token", appControler.verificarTokenCambioPasword);
router.post("/change-password", appControler.CambiarPassword);








//acceder logeado
router.get("/logout", appControler.logout); //cambiar a post para que sea mas dificik salir, no solo conun enlace
router.get("/MisAsignaciones", appControler.misAsignaciones);
router.delete("/MisAsignaciones/:id", appControler.misAsignacionesDelete);

router.get("/MisTickets", appControler.misTickets);
router.delete("/MisTickets/:id", appControler.misTicketsDelete);

router.get("/MisLogros", appControler.MisLogros);
router.get("/MisMensages", appControler.MisMensages);






export default router;