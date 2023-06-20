import React from 'react';
import socket from "./Socket"
import axios from 'axios'
import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react"
import { Link } from 'react-router-dom'
import { useAuth, getRolUruaria, getUruaria, isVoluntaria, isCoordinadora } from './../app/funciones'


import { Button, Form, Modal }  from 'react-bootstrap';

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
const URI = ULR_BASE+"AsignacionCaso/";

const CompEmergencias = forwardRef((props, ref) => {

    //array de incidencias
    const [emergenciasAtencion, setEmergenciasAtencion] = useState(props.emergencias);

    const [emergenciaActual, setEmergenciaActual] = useState(null);
    
    const [msgEstado, setMegEstado] = useState('');
    const [msgError, setMegError] = useState('');
    const limpiarMsg = () => {
        setMegEstado("")
        setMegError("")
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
       
        setShow(true);
    }

    // funciones compartidas 
    useImperativeHandle(ref, () => ({
        //procedimiento para mostrar todos los AsgCasos

        setemErgencias(emergs) {
            setEmergenciasAtencion(emergs)
        },
    }))

  
    

    //cambiar el estatus de una emergencia
    const atenderEmergencia  =(id,Voluntarias)=>{
        props.emitirMensaje("EstatusEmerg",{id,Voluntarias,Estatus:1,Voluntaria:getUruaria().id})
    }


    //cambiar el estatus de una emergencia
    const concluirEmergencia  =(id,Voluntarias)=>{
        props.emitirMensaje("EstatusEmerg",{id,Voluntarias,Estatus:5})
    }

    const mostrarEmergencia = (emergencia)=>{
        console.log(emergenciasAtencion);

        // let enlaceMapa =  (emergencia.Coordenadas.latitud) ?  `https://maps.google.com/maps?q=${emergencia.Coordenadas.latitud},%20${emergencia.Coordenadas.longitud}+(Mi%20nombre%20de%20egocios)&z=1&ie=UTF8&iwloc=B&output=embed`   :  "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=19.502997988,%20-99.141332768+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"   ;

        let enlaceMapa =  (emergencia.Coordenadas.latitud) ? "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=19.3188855,%20-98.8968611+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"  :  "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=19.502997988,%20-99.141332768+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"   ;
        let copiaEmergencia = {...emergencia,enlaceMapa}
        
        setEmergenciaActual(copiaEmergencia);
        handleShow();
        console.log("emergenciaActual",emergenciaActual);

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa-solid fa-land-mine-on"></i>Emergencias</h1>
                    Conteo : {emergenciasAtencion.length}
                    <div className="row">
                        <div className="alert alert-success" role="alert">{msgEstado}</div>
                        <div className="alert alert-danger" role="alert">{msgError}</div>
                    </div>

                    <div className='overflow-auto'>

                    <table className="table table-dark">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Fecha-hora</th>
                                <th scope="col">Víctima</th>

                                <th scope="col">Estatus</th>
                                <th scope="col">Coordenadas</th>
                                <th scope="col">Atendido por:</th>

                                <th scope="col"> Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emergenciasAtencion.map((emerg, index) => (
                                <tr key={index} >
                                    <td> {emerg.Emergencia.id}  </td>
                                    <td> {emerg.Emergencia.createdAt.slice(0, 19).replace("T", " ")}  </td>
                                    <td> <Link to={`/Usuarios/${emerg.Usuaria.id}`} >   {emerg.Usuaria.NickName}   </Link> </td>
                                    <td >{emerg.Emergencia.Estatus}   </td>
                                    {/* //TODO:if isset coordenadas */}
                                    <td>
                                        {(emerg.Coordenadas.latitud != null && emerg.Coordenadas.longitud != null) ?
                                            (<a href={`https://www.google.com/maps/search/?api=1&query=${emerg.Coordenadas.latitud},${emerg.Coordenadas.longitud}&zoom=20`} target="_blank"><i className="fa-solid fa-map-location-dot"></i></a>) :
                                            (<a href={`#`} target="_blank"><i className="fa-solid fa-location-dot-slash"> </i></a>)
                                        }


                                    </td>
                                    <td> <Link to={`/Usuarios/${emerg.Emergencia.Voluntaria_Atendio}`} >     {emerg.Emergencia.Voluntaria_Atendio}  </Link> </td>

                                    <td>
                                        <div className="btn-group" role="group" >

                                            <button type="button"  onClick={() =>  mostrarEmergencia( emerg ) }   title="Ver Detalle" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                                Ver Detalle
                                            </button>

                                            {(emerg.Emergencia.Estatus == 2)?(<button title="" className='btn btn-success' onClick={() => atenderEmergencia(emerg.Emergencia.id,emerg.Voluntarias)}  >Atender</button>
                                            ):null }

                                            {(emerg.Emergencia.Estatus != 2  &&    emerg.Emergencia.Voluntaria_Atendio ==  getUruaria().id  )?(    

                                            
                                                (emerg.Emergencia.Estatus < 5   )?(   <button   className='btn btn-danger'  onClick={() => concluirEmergencia(emerg.Emergencia.id,emerg.Voluntarias)}  > Concluir</button>
                                                ):null 

                                            ):null}
                                        </div>
                                    </td>
                                </tr>

                            ))}




                        </tbody>
                    </table>



                    </div>

                   

                    {/* <!-- Button trigger modal --> */}






    {emergenciaActual ? (
                                
      <Modal show={show} onHide={handleClose} size="xl" dialogClassName="modal-90w" >
        <Modal.Header closeButton>
          <Modal.Title>Información Emergencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
                <div className='row'>
                        <div className='col col-md-4'>
                             <div className='row'> 
                                <div className='col '>
                                        

                                        

                                <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                                    
                                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=19.502997988,%20-99.141332768+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                          
                                </iframe>


                                {/* <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                                    
                                    src={emergenciaActual.enlaceMapa}>
                          
                                </iframe> */}


                                        
                                </div>       
                             </div>


                             <div className='row'>
                                <div className='col '>
                                        
                                <div className='overflow-auto'>
                                        <div class="card border-info mb-3">
                                            <div class="card-header">Datos de la emergencia</div>
                                            <div class="card-body text-info">
                                                <h5 class="card-title"> </h5>
                                                <p class="card-text">

                                                                   


                                                                    <table class="table">
                                                                        

                                                                        <tbody>
                                                                            <tr>                                                                            
                                                                                <th>Id</th>
                                                                                <td>{emergenciaActual.Emergencia.id}</td>                                                                            
                                                                            </tr>

                                                                            <tr>
                                                                                <th>Coordenadas</th>
                                                                                <td> 
                                                                                {(emergenciaActual.Coordenadas.latitud != null && emergenciaActual.Coordenadas.longitud != null) ?
                                                                                            (<a href={`https://www.google.com/maps/search/?api=1&query=${emergenciaActual.Coordenadas.latitud},${emergenciaActual.Coordenadas.longitud}&zoom=20`} target="_blank"><i className="fa-solid fa-map-location-dot"></i></a>) :
                                                                                            (null)
                                                                                        }

                                                                                            {(emergenciaActual.Coordenadas.latitud != null && emergenciaActual.Coordenadas.longitud != null) ?
                                                                                            (  <span>  {emergenciaActual.Coordenadas.latitud}  {emergenciaActual.Coordenadas.longitud}  </span>   ) :
                                                                                            (null)
                                                                                        }       
                                                                                </td>   
                                                                            </tr>

                                                                            <tr>
                                                                                <th>Estatus</th>
                                                                                <td>{emergenciaActual.Emergencia.Estatus}</td>   
                                                                            </tr>

                                                                            <tr>                                                                            
                                                                                <th>Atendido por:</th>
                                                                                <td>
                                                                                    {/* {emergenciaActual.Emergencia.Voluntaria_Atendio} */}
                                                                                
                                                                                      <Link to={`/Usuarios/${emergenciaActual.Emergencia.id}`} >    {emergenciaActual.Emergencia.Voluntaria_Atendio}  </Link>
                                                                                </td>                                                                            
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Fecha</th>
                                                                                <td>{emergenciaActual.Emergencia.updatedAt}</td>
                                                                            </tr>

                                                                        </tbody>

                                                                        </table>

                                                </p>
                                            </div>
                                        </div>
                                </div>


                                </div>                                          
                             </div>
                                           
                      </div>     

                       <div className='col col-md-8'>
                                        <div className='row'> 
                                            <div className='col '>

                                            <div class="card border-info mb-3">
                                            <div class="card-header">Datos personales</div>
                                            <div class="card-body text-info">
                                                <h5 class="card-title"> @{emergenciaActual.Usuaria.NickName} </h5>
                                                <p class="card-text">

                                                                   


                                                                    <table class="table">
                                                                        <tbody>
                                                                            <tr>                                                                            
                                                                                <th>Id</th>
                                                                                <td>{emergenciaActual.Usuaria.id}</td>                                                                            
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Nombre</th>
                                                                                <td>{emergenciaActual.Usuaria.Nombre} {emergenciaActual.Usuaria.ApellidoPaterno}   {emergenciaActual.Usuaria.ApellidoMaterno} </td>
                                                                            </tr>

                                                                            <tr>                                                                            
                                                                                <th>Email</th>
                                                                                <td>{emergenciaActual.Usuaria.Email}</td>                                                                            
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Telefono</th>
                                                                                <td>{emergenciaActual.Usuaria.Telefono}</td>
                                                                            </tr>

                                                                            <tr>
                                                                                <th>PerfilFB</th>
                                                                                <td>{emergenciaActual.Usuaria.PerfilFB}</td>
                                                                            </tr>


                                                                            <tr>                                                                            
                                                                                <th>Entidad Federativa</th>
                                                                                <td>{emergenciaActual.Usuaria.EntidadFederativa}</td>                                                                            
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Ciudad</th>
                                                                                <td>{emergenciaActual.Usuaria.Ciudad}</td>
                                                                            </tr>

                                                                            <tr>                                                                            
                                                                                <th>Fecha de nacimiento</th>
                                                                                <td>{emergenciaActual.Usuaria.FechaNacimiento}</td>                                                                            
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Rol</th>
                                                                                <td>{emergenciaActual.Usuaria.Rol}</td>
                                                                            </tr>

                                                                            <tr>
                                                                                <th>Miembro desde </th>
                                                                                <td>{emergenciaActual.Usuaria.createdAt}</td>
                                                                            </tr>
                                                                            
                                                                        </tbody>
                                                                        </table>

                                                </p>
                                            </div>
                                        </div>


                                            </div>       
                                        </div>


                                        <div className='row'>
                                            <div className='col '>

                                                    <table className="table  table-striped table-hover  table-bordered ">
                                                            <thead className="table-info">
                                                                <tr>
                                                                <th scope="col">Ticket</th>
                                                                <th scope="col">Semaforo</th>
                                                                <th scope="col">Voluntaria</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            {emergenciaActual.Casos.map((caso, index) => (
                                                                 <tr key={index} >

                                                                            <td> {caso.deTicket.Descripcion} </td>
                                                                            <td> {caso.deTicket.Semaforo_id} </td>
                                                                            <td> {caso.deVoluntaria.Nombre}  {caso.deVoluntaria.ApellidoPaterno}  {caso.deVoluntaria.ApellidoMaterno}    (@<Link to={`/Usuarios/${caso.deVoluntaria.id}`} >{caso.deVoluntaria.NickName}</Link>)   </td> 
                                                                            
                                                                    </tr>  
                                                                ))}

                                                                   
                                                    
                                                            </tbody>
                                                    </table>



                                            </div>                                          
                                        </div>

                      </div>                   

                </div>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
           Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

        ) : (
            null
    )}
                   

                    {/*  <!--FIN Modal --> */}


                </div>
            </div>
        </div>
    )

})


export default CompEmergencias