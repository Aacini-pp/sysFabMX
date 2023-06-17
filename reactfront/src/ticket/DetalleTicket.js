import React from 'react';
import axios from 'axios'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import { useNavigate, useParams } from 'react-router-dom'

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE+"Tickets/";
const URISemaforos = ULR_BASE + "Cat/Semaforo/";
const URIEstatus =  ULR_BASE +  "Cat/Estatus/";



const CompDetalleTicket = () => {
    const [msgEstado, setMegEstado] = useState('');
    const [msgError, setMegError] = useState('');
    const limpiarMsg = () => {
        setMegEstado("")
        setMegError("")
    }

    const [NivelesSemaforo, setNivelesSemaforo] = useState([])
    const [estatusArry, setEstatusArry] = useState([])

    const [Usuaria, setUsuaria] = useState('')
    const [deUsuaria, setDeUsuaria] = useState('')
    const [Semaforo, setSemaforo] = useState('')
    const [Descripcion, setDescripcion] = useState('')
    const [Estatus, setEstatus] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()


    const update = async (e) => {
        e.preventDefault()


        let params = {
            Usuaria: Usuaria,
            Semaforo_id: (Semaforo == "") ? null : Semaforo,
            Descripcion: Descripcion,
            Estatus: Estatus
        }
        console.log(params)


        await axios.put(URI + id, params).then((response) => {
            console.log(response.data);
            limpiarMsg()
            setMegEstado(response.data.message)
            setTimeout(function () { navigate("/Tickets/") }, 2000);

        }).catch(error => {
            console.error(error.response.data)
            limpiarMsg()
            setMegError(error.response.data.message)
        });


    }


    useEffect(() => {
        getTicketsbyId()
        getNivelesSemaforo()
        getEstatus()
    }, [])

    const getEstatus = async () => {

        const res = await axios.get(URIEstatus).then((response) => {
            console.log(response.data);
            setEstatusArry(response.data)
        }).catch(error => {
            console.error(error.response.data)
            limpiarMsg()
            setMegError(error.response.data.message)
        });


    }

    const getNivelesSemaforo = async () => {

        const res = await axios.get(URISemaforos).then((response) => {
            console.log(response.data);
            setNivelesSemaforo(response.data)
        }).catch(error => {
            console.error(error.response.data)
            limpiarMsg()
            setMegError(error.response.data.message)
        });


    }

    const getTicketsbyId = async (e) => {
        const res = await axios.get(URI + id).then(function (response) {
            setUsuaria(response.data[0].Usuaria)
            setSemaforo(response.data[0].deSemaforo.Nombre)
            setDescripcion(response.data[0].Descripcion)
            setDeUsuaria(response.data[0].deUsuaria.NickName)
            setEstatus(response.data[0].deEstatus.Nombre)


        }).catch(error => {
            console.error(error)
            limpiarMsg()
            setMegError(error.response.data.message || "Error")
        });


    }


    return (
        <div >
            <h3>Editando Ticket</h3>

            <div className="row">
                <div className="alert alert-success" role="alert">{msgEstado}</div>
                <div className="alert alert-danger" role="alert">{msgError}</div>
            </div>

            <form onSubmit={update}>
                <div className="form-group ">

                    <label className="form-label required" >Víctima </label>
                    <div className=" ">
                        <Link to={`/usuarios/${Usuaria}`} className='btn  btn-secondary  '>{deUsuaria}</Link>
                    </div>




                </div>

                <div className="row">


                    <div className="form-group col-md-6">

                        <label className="form-label required" >Estatus</label>

                        <input value={Estatus}
                            type="text"
                            className="form-control"
                            disabled
                        />



                    </div>

                    <div className="form-group col-md-6">

                        <label className="form-label required" >Semáforo</label>
                        <input value={Semaforo}
                            type="text"
                            className="form-control"
                            disabled
                        />


                    </div>
                </div>


                <div className="mb-3">
                    <label className="form-label required" >Descripcion</label>
                    <textarea
                        value={Descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        type="textarea"
                        className="form-control "
                        rows="8"
                        placeholder="Descriva la situacion por la que requiera ayuda"
                        disabled
                    />
                </div>






                <Link to={`/Tickets/edit/${id}`} className='btn btn-primary m-2'>  <i className="fa-solid fa-floppy-disk"></i> Editar Ticket   </Link>

                <Link to={`/Tickets/`} className='btn btn-danger m-2'> <i className="fa-solid fa-ban"></i>  Cancelar  </Link>
            </form>


        </div>

    )

}

export default CompDetalleTicket;