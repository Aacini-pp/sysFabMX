import React from 'react';
import socket from "./Socket"
import axios from 'axios'
import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react"
import { Link } from 'react-router-dom'
import { useAuth, getRolUruaria, getUruaria, isVoluntaria, isCoordinadora } from './../app/funciones'

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE+"AsignacionCaso/";

const CompEmergencias = forwardRef((props, ref) => {
    const [msgEstado, setMegEstado] = useState('');
    const [msgError, setMegError] = useState('');
    const limpiarMsg = () => {
        setMegEstado("")
        setMegError("")
    }

    // funciones compartidas 
    useImperativeHandle(ref, () => ({
        //procedimiento para mostrar todos los AsgCasos

        setemErgencias(emergs) {
            setEmergenciasAtencion(emergs)
        },
    }))


    //array de incidencias
    const [emergenciasAtencion, setEmergenciasAtencion] = useState(props.emergencias);


    //cambiar el estatus de una emergencia
    const atenderEmergencia  =(id,Voluntarias)=>{
        props.emitirMensaje("EstatusEmerg",{id,Voluntarias,Estatus:1,Voluntaria:getUruaria().id})
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa-solid fa-land-mine-on"></i>Emergencias</h1>
                    emergenciasAtencion : {emergenciasAtencion.length}
                    <div className="row">
                        <div className="alert alert-success" role="alert">{msgEstado}</div>
                        <div className="alert alert-danger" role="alert">{msgError}</div>
                    </div>



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

                                            <button type="button" title="Ver Detalle" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                                Ver Detalle
                                            </button>

                                            {(emerg.Emergencia.Estatus ==2)?(<button title="" className='btn btn-success' onClick={() => atenderEmergencia(emerg.Emergencia.id,emerg.Voluntarias)}  >Atender</button>
                                            ):"" }
                                            <button title="" className='btn btn-danger'> Concluir</button>

                                        </div>
                                    </td>
                                </tr>

                            ))}




                        </tbody>
                    </table>


                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    ALgun texto aqui
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  <!--FIN Modal --> */}


                </div>
            </div>
        </div>
    )

})


export default CompEmergencias