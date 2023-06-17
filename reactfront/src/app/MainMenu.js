import React from 'react';
import io from "socket.io-client"
//import socket from "./../Sockets/Socket"
import axios from 'axios'

import { useState, useEffect } from 'react'
//import {useNative} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


import { useCoordenadas, useAuth, getRolUruaria, getUruaria, isVoluntaria, isCoordinadora } from './funciones'

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
const URI = ULR_BASE+"logout/";

const URISocket =  process.env.REACT_APP_URL_SOCKET  // "//localhost:8080" //TODO: AGREGAR UNA OPCION GLOBAL PARA LA DIRECCION
let socket




const CompMainMenu = () => {
  const navigate = useNavigate();
  const [Usuaria, setUsuaria] = useState("");
  let Coordenadas = useCoordenadas();
  let usuria

  useEffect(() => {
    if (useAuth()) {
      usuria = getUruaria()
      setUsuaria(usuria)
      // socket.emit('conectado', getUruaria())
    }
  }, [])




  const emergencia = (e) => {

    socket = io(URISocket) //Conectamos al sockets
    e.preventDefault()
    let param = {
      Usuaria, Coordenadas, msg: "Tengo una emergencia"
    }

    console.log(param)
    socket.emit('Emergencia', param)

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

    <div className="container-fluid m-0 p-0">
      <div className="row">
        <div className="col">


          <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
            <Link className="navbar-brand" to={'/'}> <img src="/iconAnabella.png" width="30" height="30" />  Ana Bella  México</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0 align-items-center">
                <li className="nav-item active">
                  <Link className="nav-link" to={'/'}>Home <span className="sr-only">(current)</span></Link>
                </li>



                
                


               

              </ul>
              {(!useAuth()) ?
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 align-items-center">
                  <li className="nav-item">
                    <Link className="nav-link" to={'/login/'}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/Registrarse'}>Registrarse</Link>
                  </li>



                </ul>
                : <ul className="navbar-nav mr-auto mt-2 mt-lg-0 align-items-center">
                 
                  <li className="nav-item">
                    <Link className="nav-link" to={'/MultiChat'}><i className="fa-solid fa-comment"></i>MultiChat</Link>
                  </li>

                  
            
                  <li className="nav-item">
                    <Link className="nav-link" to={'/MisTickets/'}> <i className="fa-solid fa-ticket-simple"></i> Mis Tickets</Link>
                  </li>

                  {/* Solo Voluntarias o superior */}
                  {(isVoluntaria()) ? (
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 align-items-center">
                      <li className="nav-item">
                        <Link className="nav-link" to={'/MisAsignaciones/'}><i className="fa-solid fa-clipboard"></i> Mis Asignaciones</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={'/Emergencias/'}> <i className="fa-solid fa-land-mine-on"></i> Emergencias</Link>
                      </li>
                    </ul>
                  ) : ""
                  }

                  {/* Solo Coordinadores */}
                  {(isCoordinadora()) ? (
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 align-items-center">
                      
                      
                      <li className="nav-item">
                        <Link className="nav-link" to={'/Administracion/'}> <i className="fa-solid fa-lock"></i> Administración</Link>
                      </li>


                      <li className="nav-item">
                        <Link className="nav-link" to={'/Reportes/'}> <i className="fa-solid fa-chart-line"></i> Reportes</Link>
                      </li>




                      {/* <li className="nav-item">
                        <Link className="nav-link" to={'/Usuarios/'}> <i className="fa-solid fa-child-dress"></i> Usuarias</Link>
                      </li>


                      <li className="nav-item">
                        <Link className="nav-link" to={'/Tickets/'}> <i className="fa-solid fa-ticket"></i> Tickets</Link>
                      </li>


                      <li className="nav-item">
                        <Link className="nav-link" to={'/AsignacionCaso/'}> <i className="fa-solid fa-clipboard-list"></i> Asignación de Casos</Link>
                      </li> */}


                    </ul>
                  ) : ""
                  }








                  {/* <form className="form-inline my-2 my-lg-0">
           <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
     
        </form> */}

                  <button className="btn btn-danger m-2 " onClick={emergencia} > <h1 className="display-10 "> <i className="fa-solid fa-land-mine-on"></i> </h1> </button>


                  <button className="btn btn-primary m-2" onClick={logOutFn}  > <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</button>


                </ul>
              }




            </div>
          </nav>




        </div>
      </div >
    </div >


  )
}


export default CompMainMenu