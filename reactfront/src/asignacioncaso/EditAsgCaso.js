import React from 'react';
import axios from 'axios'
import { useState, useEffect } from "react"

import { useNavigate, useParams } from 'react-router-dom'

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE+"AsignacionCaso/";

const CompEditAsgCaso = () => {

    const [msgEstado, setMegEstado] = useState('');
    const [msgError, setMegError] = useState('');
    const limpiarMsg = () => {
        setMegEstado("")
        setMegError("")
    }


    const [Ticket, setTicket] = useState('')
    const [Voluntaria, setVoluntaria] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()


    const update = async (e) => {
        e.preventDefault()
        let params = {
            Ticket: Ticket,
            Voluntaria: Voluntaria,

        }
        console.log(params)

        await axios.put(URI + id, params).then((response) => {
            console.log(response.data);
            limpiarMsg()
            setMegEstado(response.data.message)
            setTimeout(function () { navigate("/AsignacionCaso/") }, 2000);
        }).catch(error => {
            console.error(error.response.data)
            limpiarMsg()
            setMegError(error.response.data.message)
        });
    }


    useEffect(() => {
        getAsgCasbyId()

    }, [])

    const getAsgCasbyId = async (e) => {
        const res = await axios.get(URI + id).then(function (response) {
            setTicket(response.data[0].Ticket)
            setVoluntaria(response.data[0].Voluntaria)
        }).catch(error => {
            console.error(error)
            limpiarMsg()
            setMegError(error.response.data.message)
        });
    }


    return (
        <div >
            <h3>Editando Asignación de Casos</h3>


            <div className="row">
                <div className="alert alert-success" role="alert">{msgEstado}</div>
                <div className="alert alert-danger" role="alert">{msgError}</div>
            </div>


            <form onSubmit={update}>

                <div className="row">
                    <div className="form-group col-md-6">

                        <label className="form-label required" >Ticket</label>
                        <input value={Ticket}
                            onChange={(e) => setTicket(e.target.value)}
                            type="number"
                            className="form-control"
                            required
                        />



                    </div>
                    <div className="form-group col-md-6">

                        <label className="form-label required" >Voluntaria</label>
                        <input value={Voluntaria}
                            onChange={(e) => setVoluntaria(e.target.value)}
                            type="number"
                            className="form-control"
                            required
                        />


                    </div>
                </div>


                <button type="submit" className="btn btn-primary" > <i className="fa-solid fa-floppy-disk"></i> Guardar cambios </button>
            </form>


        </div>

    )

}

export default CompEditAsgCaso;