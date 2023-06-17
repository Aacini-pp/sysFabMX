import React from 'react';
import axios from 'axios'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'


const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE+"AsignacionCaso/";

const CompShowAsgCaso = () => {
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
                    <h1><i className="fa-solid fa-list-check"></i> Asignación de Casos</h1>

                    <div className="row">
                        <div className="alert alert-success" role="alert">{msgEstado}</div>
                        <div className="alert alert-danger" role="alert">{msgError}</div>
                    </div>

                    <Link to={'/AsignacionCaso/create'} className='btn btn-primary m-2'><i className="fas fa-plus"></i>Asignar caso</Link>


                    <table className="table table-dark">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Voluntaria</th>
                                <th scope="col">Ticket</th>

                                <th scope="col">Víctima</th>

                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {AsgCasos.map((AsgCaso) => (
                                <tr key={AsgCaso.id} >
                                    <td> {AsgCaso.id}  </td>
                                    <td> <Link to={`/Usuarios/${AsgCaso.deVoluntaria.id}`} >   {AsgCaso.deVoluntaria.NickName}   </Link> </td>
                                    <td > <Link to={`/Tickets/${AsgCaso.deTicket.id}`} >{AsgCaso.Ticket}</Link>:  {AsgCaso.deTicket.Descripcion}    </td>
                                    <td> <Link to={`/Usuarios/${AsgCaso.deTicket.deUsuaria.id}`} > {AsgCaso.deTicket.deUsuaria.NickName}  </Link>  </td>


                                    <td>
                                        <div className="btn-group" role="group" >
                                            <Link to={`/AsignacionCaso/edit/${AsgCaso.id}`} title="Editar Asignación" className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                            <button title="Eliminar Asignacion" onClick={() => deleteAsgCasos(AsgCaso.id)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
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


export default CompShowAsgCaso