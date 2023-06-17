import React from 'react';
import axios from 'axios'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'



const arraySemaforo ={
    1:"btn btn-success",
    0:"btn btn-success",
    2:"btn btn-success",
    3:"btn btn-success",
    4:"btn btn-success",
    5:"btn btn-warning",
    6:"btn btn-warning",
    7:"btn btn-danger",
    8:"btn btn-danger",
    9:"btn btn-danger",
    10:"btn btn-danger",
}

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE+"Tickets/";

const CompShowTickets = () => {

    const [msgEstado, setMegEstado] = useState('');
    const [msgError, setMegError] = useState('');
    const limpiarMsg = () => {
        setMegEstado("")
        setMegError("")
    }


    const [tickets, setTickets] = useState([])
    useEffect(() => {
        getTicket()

    }, [])

    //procedimiento para mostrar todos los tickets
    const getTicket = async () => {
        const res = await axios.get(URI).then((response) => {
            console.log(response.data);
            setTickets(response.data)
        }).catch(error => {
            console.error(error.response.data)
            limpiarMsg()
            setMegError(error.response.data.message)
        });


    }

    //procedimiento para eliminar un tickets
    const deleteTickets = async (id) => {
        await axios.delete(`${URI}${id} `).then((response) => {
            console.log(response.data);
            limpiarMsg()
            setMegEstado(response.data.message)
            getTicket()
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
                    <h1><i className="fa-solid fa-ticket"></i> Tickets</h1>

                    <div className="row">
                        <div className="alert alert-success" role="alert">{msgEstado}</div>
                        <div className="alert alert-danger" role="alert">{msgError}</div>
                    </div>

                    <Link to={'/Tickets/create'} className='btn btn-primary m-2'><i className="fas fa-plus"></i> Registrar Ticket</Link>


                    <table className="table table-dark">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Víctima</th>
                                <th scope="col">Semáforo</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Estatus </th>
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((Ticket) => (
                                <tr key={Ticket.id}  >
                                    <td> {Ticket.id}  </td>
                                    <td>  <Link to={`/Usuarios/${Ticket.Usuaria}`} >      {Ticket.deUsuaria.NickName}   </Link>  </td>
                                    <td> <button className={arraySemaforo[Ticket.Semaforo_id]} >  {Ticket.Semaforo_id} </button> </td>
                                    <td> {Ticket.Descripcion}  </td>
                                    <td> {Ticket.deEstatus.Nombre}  </td>

                                    <td >
                                        <div className="btn-group d-flex justify-content-end " role="group" >
                                            {/* Si el tiket esta sin asignar mostrar el boton para asignar */}
                                            {(Ticket.Estatus == 2) ?
                                                <Link to={`/AsignacionCaso/create/${Ticket.id}`} title="Asignar ticket" className='btn btn-success align-self-center'> <i className="fa-solid fa-play"></i></Link>
                                                : ""
                                            }

                                            <Link to={`/Tickets/edit/${Ticket.id}`} title="Editar ticket" className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                            <button title="Eliminar ticket" onClick={() => deleteTickets(Ticket.id)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
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


export default CompShowTickets