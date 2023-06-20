import React from 'react';
import io from "socket.io-client"
//import socket from "./../Sockets/Socket"
import axios from 'axios'

import { useState, useEffect ,forwardRef, useRef} from 'react'
//import {useNative} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { Navbar, Nav, NavDropdown }  from 'react-bootstrap';




import { useCoordenadas, useAuth, getRolUruaria, getUruaria, isVoluntaria, isCoordinadora } from './funciones'

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
const URI = ULR_BASE+"logout/";

const URISocket =  process.env.REACT_APP_URL_SOCKET  // "//localhost:8080" //TODO: AGREGAR UNA OPCION GLOBAL PARA LA DIRECCION
let socket




const CompMainMenu = forwardRef(  (props, ref) => {
  const navigate = useNavigate();
  const [Usuaria, setUsuaria] = useState("");

  const [disabledEmergencia, setDisabledEmergencia] = useState(false);

  
  let Coordenadas = useCoordenadas();
  let usuria

  useEffect(() => {
    if (useAuth()) {
      usuria = getUruaria()
      setUsuaria(usuria)
      // socket.emit('conectado', getUruaria())
    }
  }, [])



  

  const confirmarEnvioEmergencia =  ()=>{

    let copyCofToast = {
      bg:"warning",
      visible:true,
      Title:"emergencia enviada",
      Text:"La ayuda esta en camino",
      audio:"warning",
      timeClose:10000,
   }
        props.customToast(copyCofToast)

        setDisabledEmergencia(true) //
        setTimeout(() => {
          setDisabledEmergencia(false)
        },   copyCofToast.timeClose   );


        console.log("custom toast app",copyCofToast)
  }



  const emergencia = (e) => {

    socket = io(URISocket) //Conectamos al sockets
    e.preventDefault()
    let param = {
      Usuaria, Coordenadas, msg: "Tengo una emergencia"
    }

    console.log(param)
    socket.emit('Emergencia', param)


    confirmarEnvioEmergencia()

  }


  const logOutFn = (e) => {

    console.log("Cerrando session");

    e.preventDefault()

    axios.get(URI).then((response) => {
      console.log(response);
      let usuaria = JSON.parse(localStorage.getItem("Usuaria"));



      console.log("Adios " + usuaria.Nombre)
      console.log(response.message)

      //limpiarMsg()
      //setMegEstado("Adios "+usuaria.Nombre)           
      localStorage.clear();
    }).catch(error => {
      console.error(error)
      localStorage.clear();
      //limpiarMsg()
      //setMegError(error.response.data.message)
    });
    setTimeout(function () { navigate("/login") }, 500);
  }







  return (


   
     



    <Navbar className=" container-fluid  d-flex justify-content-center" collapseOnSelect expand="lg" bg="dark" variant="dark">

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />     
        <Navbar.Brand href="/"><img src="/iconAnabella.png" width="30" height="30" />  Ana Bella  México </Navbar.Brand>


        <Navbar.Collapse id="responsive-navbar-nav">
  
  

{(!useAuth()) ?
              <Nav className="navbar-nav mr-auto mt-2 mt-lg-0 align-items-center">
                <Nav.Link className="nav-item">
                  <Link className="nav-link" to={'/login/'}>Login</Link>
                </Nav.Link>
                <Nav.Link className="nav-item">
                  <Link className="nav-link" to={'/Registrarse'}>Registrarse</Link>
                </Nav.Link>



              </Nav>
              : <Nav className="navbar-nav mr-auto mt-2 mt-lg-0 align-items-center">
               
                <Nav.Link className="nav-item">
                  <Link className="nav-link" to={'/MultiChat'}><i className="fa-solid fa-comment"></i>MultiChat</Link>
                </Nav.Link>

                
          
                <Nav.Link className="nav-item">
                  <Link className="nav-link" to={'/MisTickets/'}> <i className="fa-solid fa-ticket-simple"></i> Mis Tickets</Link>
                </Nav.Link>

                {/* Solo Voluntarias o superior */}
                {(isVoluntaria()) ? (
                  <Nav className="navbar-nav mr-auto mt-2 mt-lg-0 align-items-center">
                    <Nav.Link className="nav-item">
                      <Link className="nav-link" to={'/MisAsignaciones/'}><i className="fa-solid fa-clipboard"></i> Mis Asignaciones</Link>
                    </Nav.Link>
                    <Nav.Link className="nav-item">
                      <Link className="nav-link" to={'/Emergencias/'}> <i className="fa-solid fa-land-mine-on"></i> Emergencias</Link>
                    </Nav.Link>
                  </Nav>
                ) : ""
                }

                {/* Solo Coordinadores */}
                {(isCoordinadora()) ? (
                  <Nav className="navbar-nav mr-auto mt-2 mt-lg-0 align-items-center">
                    
                    
                    <Nav.Link className="nav-item">
                      <Link className="nav-link" to={'/Administracion/'}> <i className="fa-solid fa-lock"></i> Administración</Link>
                    </Nav.Link>


                    <Nav.Link className="nav-item">
                      <Link className="nav-link" to={'/Reportes/'}> <i className="fa-solid fa-chart-line"></i> Reportes</Link>
                    </Nav.Link>




                    {/* <Nav.Link className="nav-item">
                      <Link className="nav-link" to={'/Usuarios/'}> <i className="fa-solid fa-child-dress"></i> Usuarias</Link>
                    </Nav.Link>


                    <Nav.Link className="nav-item">
                      <Link className="nav-link" to={'/Tickets/'}> <i className="fa-solid fa-ticket"></i> Tickets</Link>
                    </Nav.Link>


                    <Nav.Link className="nav-item">
                      <Link className="nav-link" to={'/AsignacionCaso/'}> <i className="fa-solid fa-clipboard-list"></i> Asignación de Casos</Link>
                    </Nav.Link> */}


                  </Nav>
                ) : ""
                }








                {/* <form className="form-inline my-2 my-lg-0">
         <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
   
      </form> */}

            

              </Nav>
            }
</Navbar.Collapse>

    {(useAuth()) ?(
      <button className="btn btn-primary m-2" onClick={logOutFn}  > <i className="fa-solid fa-arrow-right-from-bracket"></i> <br/>  Logout</button>      
    ):null}

    {(useAuth()) ?(
      <button className="btn btn-danger m-2 " onClick={emergencia} disabled={disabledEmergencia}> <h1 className="display-10 "> <i className="fa-solid fa-land-mine-on"></i> </h1> </button>
    ):null}

    </Navbar>




   

    

  )
})


export default CompMainMenu