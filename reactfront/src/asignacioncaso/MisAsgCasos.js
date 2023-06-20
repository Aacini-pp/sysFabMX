import React from 'react';
import axios from 'axios'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import ReactTimeAgo from 'react-time-ago' 

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE+"MisAsignaciones/";

const CompMisAsgCasos = () => {
    const [msgEstado, setMegEstado] = useState('');
    const [msgError, setMegError] = useState('');
    const limpiarMsg = () => {
        setMegEstado("")
        setMegError("")
    }

    const [AsgCasos, setAsgCaso] = useState([])
    useEffect(() => {
        getAsgCaso()

    }, [])

    //procedimiento para mostrar todos los AsgCasos
    const getAsgCaso = async () => {
        const res = await axios.get(URI).then((response) => {
            console.log(response.data);
            setAsgCaso(response.data)
        }).catch(error => {
            console.error(error.response.data)
            limpiarMsg()
            setMegError(error.response.data.message)
        });


    }

    //procedimiento para eliminar un AsgCasos
    const deleteAsgCasos = async (id) => {
        await axios.delete(`${URI}${id} `).then((response) => {
            console.log(response.data);
            limpiarMsg()
            setMegEstado(response.data.message)
            getAsgCaso()
        }).catch(error => {
            console.error(error.response.data)
            limpiarMsg()
            setMegError(error.response.data.message)
        });

    }




    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa-solid fa-clipboard"></i> Mis Asignaciones</h1>
                    <br />

                    <div className="row">
                        <div className="alert alert-success" role="alert">{msgEstado}</div>
                        <div className="alert alert-danger" role="alert">{msgError}</div>
                    </div>



                    <table className="table table-dark text-start">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">#</th>

                                <th scope="col">Ticket</th>

                                <th scope="col">Víctima</th>

                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {AsgCasos.map((AsgCaso) => (
                                <tr key={AsgCaso.id} >
                                    <td> {AsgCaso.id}  </td>

                                    <td > <Link to={`/Tickets/${AsgCaso.deTicket.id}`} >{AsgCaso.Ticket}</Link>:  {AsgCaso.deTicket.Descripcion}  
                                    
                                        <div className='row justify-content-start' >

                                        {AsgCaso.susAvances.map((avance) => (
                                            <div class="col " key={avance.id} >   <Link to={`/AvanceCaso/create/${AsgCaso.id}`} className="h6" >  <ReactTimeAgo date={ avance.createdAt } locale="es-MX"/>  </Link>  </div>


                                        ))}
                                       

                                        </div>
                                    
                                      </td>
                                    <td> <Link to={`/Usuarios/${AsgCaso.deTicket.deUsuaria.id}`} > {AsgCaso.deTicket.deUsuaria.NickName}  </Link>  </td>


                                    <td>
                                        <div className="btn-group d-flex justify-content-end " role="group" >

                                         <Link to={`/AvanceCaso/create/${AsgCaso.id}`} title="Crear reporte de avance de caso" className='btn btn-info align-self-center'> <i className="fa-solid fa-forward"></i></Link>
                                            <button onClick={() => deleteAsgCasos(AsgCaso.id)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                                        </div>    
                                        
                                    </td>
                                </tr>

                            ))}




                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}


export default CompMisAsgCasos