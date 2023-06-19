import 'dotenv/config'

import http from 'http';
import express from 'express';
import { Server as WebSocketServer } from 'socket.io';


import  fs from "fs";
import https from "https";

import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import cors from 'cors';
import db from './database/db.js';


//entidades
import usersRoutes from './routes/usersRoutes.js'
import ticketsRoutes from './routes/ticketsRoutes.js'
import asignacionCasoRoutes from './routes/asignacionCasoRoutes.js'

//catalogos
import EstadosRoutes from './routes/Catalogos/estadosRoutes.js'
import CatRoutes from './routes/Catalogos/catRoutes.js'
import ReportesRoutes from './routes/reportesRoutes.js'


//aplicacion
import appRoues from './routes/appRoutes.js'


//middlewares

import sessionMiddleware from './middleware/session.js'
import sessionCoordinadora from './middleware/sessionCoordinadora.js'


import UsuarioModel from "./models/UserModel.js"
import EmergenciaModel from "./models/EmergenciaModel.js"
import AsignacionCasoModel from "./models/AsignacionCasoModel.js";
import TicketModel from "./models/TicketModel.js";
import MensagesModel from "./models/MensagesModel.js";
import relaciones from "./models/relacions.js"




const app = express();
let httpServer = null;
if ( process.env.PORT_SERV == 443  ){ //SI puerto http usar certificados
    httpServer = https.createServer(
        {
            cert:fs.readFileSync("keys/certificate.crt"),
            key:fs.readFileSync("keys/private.key")
        },
        app);
}else{ // de lo contrario server normal

    httpServer = http.createServer(app);

}







app.use(express.static('public'));
app.use(cors()); //permitir cruce de dominio
app.use(express.json());

try {
    await db.authenticate();
    console.log("Conexxion a la BD")
} catch (error) {

    console.log(`Error en la conexxion:  ${error} `)
}


//guardar session en la base de datos
var SessionStore = SequelizeStore(session.Store);
var myStore = new SessionStore({
    db: db,
});
let optSession = session({
    store: myStore,
    secret: '6e3df1e2bccb9e5eea0d1822814ed45f',// FAB en MD5 = 6e3df1e2bccb9e5eea0d1822814ed45f
    resave: true,
    cookie: {expires: new Date(253402300000000)} , //no expirar
    saveUninitialized: true,
    cookie: { secure: false }
})

//myStore.sync() //crear la tabla  de session

app.use(optSession); //Palabra secreta para sesiones


//rutas

//URL App
app.use("/", appRoues);

/**API*/
app.use("/Usuarios", usersRoutes);
app.use("/Tickets", ticketsRoutes);
app.use("/AsignacionCaso", asignacionCasoRoutes);
app.use("/Reportes/", ReportesRoutes);



app.use("/Cat", CatRoutes);
app.use("/Cat/Estados", EstadosRoutes);





//sockets



const io = new WebSocketServer(httpServer, {

    cors: {//TODO:quitar  en prod
        origin: "http://localhost:3000"
    }
});


//midleware para acceder a las seciones de express-session
io.use(function (socket, next) {
    optSession(socket.handshake, {}, next); //em eñ apreton de manos acceder a las session de express
})



let socketExport = null;
io.on('connection', async (socket) => {
    socketExport = socket;
    let coordinadoras = [] //cada cuanto volver a cargar las coordinadoras ? 

    try {
        const coords = await UsuarioModel.findAll({
            where: { Rol: 4 },
        });
        coords.map((coordinadora) => {
            coordinadoras.push(coordinadora.id)
        })
    } catch (error) {
        console.log(error);
    }
   // console.log("Cordinadoras: ", coordinadoras)

   // console.log("sessionSocket: ", socket.handshake.session)

    //TODO :
    //si el usuario no esta seteado desconectar socket.disconnect(true)


    


    socket.on("conectado", (arg) => {
        // console.clear();
        // console.info(`------------------------------------------`);
        // console.info(`Usuario conectado: `, arg)
        // console.log("sessionSocket conectado: ", socket.handshake.session)
    })





    socket.on("mensaje", async (  mensaje) => {
   
        let msgEnviar = {
                        ...mensaje,
                        createdAt:( new Date() ).toISOString() //agregamos la fecha de envio  del mensaje
                        }


 
       // console.info(`mensaje recivido`,  msgEnviar);
       // console.log("sessionSocket mensaje: ", socket.handshake.session); // no disponible 

        
        let canalReceptor = "Mensajes>" +  mensaje.Receptor;

        let canlEmisor =  "Mensajes>" +  mensaje.Emisor.id;  //TODO: en produccion usar  socket.handshake.session 


        try {
            await MensagesModel.create({ //todo: tiene q  ue devolver el registro para tener el id y la hora 
                Emisora: mensaje.Emisor.id,
                Receptora:  mensaje.Receptor,
                Leido: 0,
                texto : mensaje.Mensage
            });
        } catch (error) {
            console.log(error.message)
            console.error(error.message)
        }


        io.emit(canalReceptor, msgEnviar ); //enviar para el id que esta  reservado

        io.emit(canlEmisor , msgEnviar ); //enviar  el que mando el mensaje

    })




    socket.on("Emergencia", async (mensaje) => {
        let Usuaria =   mensaje.Usuaria // socket.handshake.session.usuaria; //      conseguir esta info de la session  
        //console.info(`Emergencia recibida:`, mensaje);       
        //console.log("sessionSocket Emergencia: ", socket.handshake.session)


        //registrar el ticket 
        let regEmergencia = null
        let Voluntarias = []
        try {
            await EmergenciaModel.create({ //todo: tiene q  ue devolver el registro para tener el id y la hora 
                Victima: Usuaria.id,
                Voluntaria_Atendio: null,
                Estatus: 2,
                Ubicacion: JSON.stringify(mensaje.Coordenadas) || ""
            }).then(function (reg) {
                regEmergencia = reg.dataValues
            });
        } catch (error) {
            console.log(error.message)
        }

        //buscar sus casos  con sus respectivas voluntarias
        const casos = await AsignacionCasoModel.findAll({
            // Queremos que incluya la relaciónES
            include: [
                {
                    where: { Usuaria: Usuaria.id },
                    association: relaciones.AsignacionCaso.Ticket,
                },
                { association: relaciones.AsignacionCaso.Usuaria, },
                { association: relaciones.AsignacionCaso.Estatus },
            ]
        });

        casos.map((caso) => {
            if (!Voluntarias.includes(caso.Voluntaria) && !coordinadoras.includes(caso.Voluntaria)) {
                Voluntarias.push(caso.Voluntaria)
            }

        })

        //emitir a las coordinadoras 
        //emitir a su voluntaria si tiene caso
        let coordAndVoluntarias = coordinadoras.concat(Voluntarias)
       // console.log("coordAndVoluntarias", coordAndVoluntarias)
        let emicion = { Usuaria,
              Coordenadas: mensaje.Coordenadas,
              Casos: casos, 
              Emergencia: regEmergencia, 
              mensaje: mensaje.msg,
              Voluntarias:coordAndVoluntarias 
            }
        console.info(emicion)

        coordAndVoluntarias.map((vol) => {
            let canalEmitir = `Emergencias>${vol}`
            // console.info("-----------------------------------");
            // console.info(canalEmitir, "EnviandoEmergencia")
            // console.info(emicion)

            io.emit(canalEmitir, emicion)
        })
        // io.emit('Emergencias>42', { Usuaria, Emergencia: regEmergencia, mensaje: mensaje.msg })

    })

    socket.on("EstatusEmerg", async (mensaje) => {
        //cambiar el estatus a la voluntaria
        let param  ={  
            Estatus:mensaje.Estatus
        }
        if(mensaje.Voluntaria){
            param["Voluntaria_Atendio"]= mensaje.Voluntaria
        }
       // console.log("Actualizar estado",mensaje,param)
            
        try {
            await EmergenciaModel.update(param,{
                where: { id: mensaje.id }
            })
        } catch (error) {
            console.log(error.message)
        }

        //enviar mensaje de actualizacion
        io.emit("EstatusEmerg", mensaje)
       
        
    })



    //mandar los casos que siguen activos s
    socket.on("ConsultarDatosAtrazados", (arg) => {

        console.log('Enviando datos atrasados  serv event',arg)
                     
        let emicion = { 
            Usuaria: {
                id: 42,
                Nombre: 'voluntaria',
                ApellidoPaterno: 'susi',
                ApellidoMaterno: null,
                NickName: 'a3',
                Pass: '123',
                FechaNacimiento: null,
                Ciudad: null,
                PerfilFB: null,
                Email: 'aaacini@gmail.com',
                Telefono: null,
                Rol: 3,
                EntidadFederativa: 9,
                Estatus: 1,
                createdAt: '2022-04-29T16:08:37.000Z',
                updatedAt: '2022-05-26T17:25:23.000Z'
              }, 
            Coordenadas: { latitud: 19.4440547, longitud: -99.2156096 },
            Casos: {}, 
            Emergencia: {
                id: 120,
                Victima: 42,
                Voluntaria_Atendio: null,
                Estatus: 2,
                Ubicacion: '{"latitud":19.4440547,"longitud":-99.2156096}',
                updatedAt: '2022-11-08T01:36:49.515Z',
                createdAt: '2022-11-08T01:36:49.515Z'
            }, 
            mensaje: "Tengo una emergencia",
            Voluntarias: [ 1, 18 ] 
        };
        
        
        let canalEmitir = `Emergencias>1` ;//${req.session.usuaria.id}
        io.emit(canalEmitir, emicion);
                
    })


    socket.on("disconnect", (arg) => {
        console.info(`Usuario desconectado: `, arg)
        io.emit('mensajes', { servidor: "Servidor", mensaje: "Ha abandonado la sala" })
        //emitir a su id de socket identificado por su session  .to()  para que no puedan escuchar otras personas 
    })


});










httpServer.listen(  process.env.PORT_SERV , () => {
   // console.log(process.env) 
    console.log("Servidor corriendo en ",  process.env.PORT_SERV )
})




/*
app.listen(8080, () => {
    console.log("Servidor corriendo")
})*/
export default io;