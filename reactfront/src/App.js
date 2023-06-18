import React from "react";
import axios from 'axios'
import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react"


import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'


import logo from "./logo.svg";
import "./App.css";

import conectarSocket from "./Sockets/Socket"

import ProtectedRoutes from "./Routes/ProtectedRoutes";
import ProtectedRoutesVoluntaria from "./Routes/ProtectedRoutesVoluntaria";
import ProtectedRoutesCoordinador from "./Routes/ProtectedRoutesCoordinador";



import CompIndexAdmon from   "./administracion/index";
import CompReportes  from "./administracion/Reportes/CompReportes";

import CompDetalleUsuario from "./usuario/DetalleUsuario";
import CompRegistrarUsuario from "./usuario/RegistrarUsuario";
import CompShowUsuarios from "./usuario/ShowUsuario";
import CompCreateUsuarios from "./usuario/CreateUsuario";
import CompEditUsuario from "./usuario/EditUsuario";

import CompDetalleTicket from "./ticket/DetalleTicket";
import CompMisTickets from "./ticket/MisTickets";
import CompShowTickets from "./ticket/ShowTicket";
import CompCreateTickets from "./ticket/CreateTicket";
import CompEditTickets from "./ticket/EditTicket";

import CompMisAsgCasos from "./asignacioncaso/MisAsgCasos";
import CompShowAsgCaso from "./asignacioncaso/ShowAsgCaso";
import CompCreateAsgCaso from "./asignacioncaso/CreateAsgCaso";
import CompEditAsgCas from "./asignacioncaso/EditAsgCaso";


import CompCrearAvanceCaso from "./AvanceCasos/CompCrearAvanceCaso";



import HomeComponent from "./app/HomeComponent";
import CompMainMenu from "./app/MainMenu";
import ComplogUsuarios from "./app/logUsuario";
import CompForgotpass from "./app/CompForgotpass";
import CompChangePasswords from "./app/CompChangePasswords";
import CompPoliticas from "./app/CompPoliticas";


import CompFakeLogin from "./app/juego/fackeLogin";


import CompChat from "./Sockets/CompChat";
import CompEmergencias from "./Sockets/CompEmergencias"
import CompMultiChat from "./Sockets/Chat/MultiChat";

 

import { useAuth, getRolUruaria, getUruaria, isVoluntaria, isCoordinadora } from './app/funciones'

import CompNotFound from "./app/NotFound";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  const [emergencias, setEmergencias] = useState([]);
  const [socket, setSocket] = useState(conectarSocket());
  const childCompRef = useRef()


  TimeAgo.addDefaultLocale(es);
 

 
  const  ULR_BASE = process.env.REACT_APP_BASE_URL;
  const URI_MIS_MENSAGES = ULR_BASE + "MisMensages/";

 
    const [conversaciones, setConversaciones] = useState([]);


    const getMisMensages = async ()=>{
      const res = await axios.get(URI_MIS_MENSAGES).then((response) => {
        console.log(response.data);
         setConversaciones( response.data );
        
      }).catch(error => {
          console.error(error.response)
         
      });
      
    }


    useEffect(() => {
     getMisMensages();
    }, [])

     




  const getEmergencias = () => {
    alert("Please")
    // return emergencias
  }

  const EmergenciasPendientesEvent = (e) => {
    
    console.log('ConsultarDatosAtrazados');
    let canal ="ConsultarDatosAtrazados";
    let mensaje = "";
    //emitirMensaje(canal, mensaje);

  }

  const emitirMensaje =(canal, mensaje) =>{
    socket.emit(canal, mensaje)
    
  }

  /*
    useEffect(() => {
    
      if (useAuth()) {
        console.log("ConectarSocketCanalPropioEvent")
        let socket = conectarSocket()
  
        let chanelUser = `Emergencias>${getUruaria().id}`//
  
  
        console.log("Escuchando ", chanelUser)
        socket.on(chanelUser, msg => {
          console.log("MensajeSoket recivido: ", msg, emergencias)
          setEmergencias([...emergencias, msg])
          console.log("Emergencias registradas", emergencias)
        })
  
        return () => { socket.off() }
      }
  
    }, [])
    */





 //agrega un msg recibido el el array de mensajes  ordenandolo deacurdo a su receptor
  //tanto propio como de alguien mas
  //y reggresa una copia modificado de Conversasiones
    const agregarMensaje  =  (msg) =>{
      let copyConversaciones = [...conversaciones]; //copiamos las conversaciones
      let posItem = null;

      //cuando el mensaje es de otro  buscar el id del misor
      // cuando el mensaje es propio bucar el id del receptro
      let idABuscar =    ( getUruaria().id  !=   msg.Emisor.id   ) ? msg.Emisor.id  : msg.Receptor; 

      //encontrar la posicion del ensaje
    let elemModificar =   conversaciones.find(function(elem, index) {
           if(   elem.Usuaria.id == idABuscar   ){
              posItem = index;
              return elem ;
           }
      });

 
      if( posItem !=  null ){ // si se encuentra  conversacion con el 

       
        elemModificar.mensages.push( //agregarlo a la conversacion 
          { 
            "emisor": msg.Emisor.id,
            "receptor":msg.Receptor,
            "text" :  msg.Mensage,
            "createdAt": msg.createdAt
        });



        if( ( getUruaria().id  !=   msg.Emisor.id   ) ){ //solo aumnetar  mensajes no leidos cuando no es el suyo
          elemModificar.mensajesNoleidos++;
        }
        copyConversaciones[ posItem ]  = elemModificar;

         //pasar el elemento hasta arriba del array
       copyConversaciones.splice(0, 0, copyConversaciones.splice(posItem, 1)[0]);

      }else{ //crear elemento 

          copyConversaciones.unshift({ //agregarlo hasta arriba de los elementos
            Usuaria: msg.Emisor ,//info del otro contacto
            mensajesNoleidos : 1,
            mensages: [{ 
                          "emisor": msg.Emisor.id,
                          "receptor":msg.Receptor,
                          "text" :  msg.Mensage,
                          "createdAt": msg.createdAt
                    }]
          });


      }

      console.log("copyConversaciones",copyConversaciones);
      return  copyConversaciones;

    };



    //Escuchar mensajes 
  // useEffect(() => {


  //   if (useAuth()) {


  //     return () => { socket.off() }
  //   }
  
  // }, [socket, conversaciones])





  useEffect(() => {


    if (useAuth()) {


      EmergenciasPendientesEvent();//consultar emergencias
      
      
      let chanelUser = `Emergencias>${getUruaria().id}`
      console.log("Escuchando ", chanelUser)
      socket.on(chanelUser, msg => {
        setEmergencias([...emergencias, msg])
        if (childCompRef.current) { //si estamos en la vista Emergencias actualizar
          childCompRef.current.setemErgencias([...emergencias, msg])
        }

      })


      socket.on("EstatusEmerg", msg => {
        //modificar las emergencias
        let emergActualizadas = [ ...emergencias]

        console.log("EstatusEmerg",msg,emergActualizadas)

        emergActualizadas.forEach( (elem,index) =>{
            console.log(elem,index)
            if( elem.Emergencia.id == msg.id ){
              emergActualizadas[index].Emergencia.Estatus = msg.Estatus

              if(msg.Voluntaria ){
                emergActualizadas[index].Emergencia.Voluntaria_Atendio = msg.Voluntaria

              }
            }
        }  )
        
        
        
      setEmergencias(emergActualizadas)   //actualizar las emergencias
        
        if (childCompRef.current) {   //pasarlas al comp Emergencias si es que es el qeu esta en ventana
          childCompRef.current.setemErgencias(emergActualizadas)
        }

      })


        //leer mensages del chat

      let chanelUserMsg = `Mensajes>${getUruaria().id}`; //canal de la usuaria
      console.log("EscuchandoMensajes ", chanelUserMsg);
      socket.on(chanelUserMsg, msg => {


        //recibimos la copia  de las conversaciones
      let copyConversaciones  =  agregarMensaje(msg);        
      setConversaciones([...copyConversaciones]);  //agregar el mensaje  a su usuario y no directamente, 
     
      // if (childCompRef.current) { //si estamos en la vista Emergencias actualizar
      //   childCompRef.current.setemErgencias([...conversaciones, msg])
      // }

      })


      return () => { socket.off() }
    }
  }, [socket, emergencias, conversaciones])


  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <CompMainMenu />
          
          
          <div  className="position-relative">
            <img src={logo} className="App-logo" alt="logo"></img> 
            
            <div  className="position-absolute  top-50 start-50 translate-middle  ">
              <a href="/">
                   <img src="/anaBellaMex.png" width="82%" ></img> 
               </a>
            </div>
          </div>
         
          




          <Routes>
            <Route path="/" element={<HomeComponent />} />

           

            <Route path="/login" element={<ComplogUsuarios EmergenciasPendientes={EmergenciasPendientesEvent} />} />
            <Route path="/Registrarse" element={<CompRegistrarUsuario />} />
            <Route path="/forgot-password" element={<CompForgotpass />} />
            <Route path="/change-password/:token" element={<CompChangePasswords />} />
            <Route path="/politicas" element={<CompPoliticas />} />

            <Route path="/juego" element={<CompFakeLogin />} />

            



            <Route element={<ProtectedRoutes />}>

              {/* usuarios logeados */}
              <Route path="/Chat" element={<CompChat />} />

              <Route path="/MultiChat" element={<CompMultiChat   conversaciones={conversaciones}   />} />
            
           

              <Route path="/MisTickets/" element={<CompMisTickets />} />
              <Route path="/Tickets/create" element={<CompCreateTickets />} />
              <Route element={<ProtectedRoutesVoluntaria />}>
                <Route path="/Emergencias" element={<CompEmergencias ref={childCompRef} emergencias={emergencias} emitirMensaje={emitirMensaje}  getEmergencias={getEmergencias} />} />

                <Route path="/MisAsignaciones/" element={<CompMisAsgCasos />} />
                <Route path="/Usuarios/:id" element={<CompDetalleUsuario />} />
                <Route path="/Tickets/:id" element={<CompDetalleTicket />} />

                <Route element={<ProtectedRoutesCoordinador />}>

                

                <Route path="/Administracion/" element={<CompIndexAdmon />} />

                  <Route path="/Usuarios/" element={<CompShowUsuarios />} />
                  <Route path="/Usuarios/create" element={<CompCreateUsuarios />} />
                  <Route path="/Usuarios/edit/:id" element={<CompEditUsuario />} />

                  <Route path="/Tickets/" element={<CompShowTickets />} />
                  {/* ...Crear ticket es publico */}
                  <Route path="/Tickets/edit/:id" element={<CompEditTickets />} />

                  <Route path="/AsignacionCaso/" element={<CompShowAsgCaso />} />
                  <Route path="/AsignacionCaso/create" element={<CompCreateAsgCaso />} />
                  <Route path="/AsignacionCaso/create/:id" element={<CompCreateAsgCaso />} />
                  <Route path="/AsignacionCaso/edit/:id" element={<CompEditAsgCas />} />


                  <Route path="/AvanceCaso/create/:id" element={<CompCrearAvanceCaso />} />
                  
                
                <Route path="/Reportes/" element={<CompReportes />} />
                 
                
                

                </Route>
              </Route>
            </Route>
            <Route path="*" element={<CompNotFound />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div >
  );
}

export default App;
