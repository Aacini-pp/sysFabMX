import React from 'react';
import axios from 'axios'

import { useState } from 'react'
//import {useNative} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE+"Tickets/";


const CompCreateTickets = () => {
    const [msgEstado, setMegEstado] = useState('');
    const [msgError, setMegError] = useState('');
    const limpiarMsg = () => {
        setMegEstado("")
        setMegError("")
    }


    /*  const [Usuaria, setUsuaria] = useState('')
     const [Semaforo, setSemaforo] = useState('') */
    const [Descripcion, setDescripcion] = useState('')


    // Usuaria =1
    const navigate = useNavigate();


    const store = async (e) => {
        e.preventDefault()
        const params = {
            /* Usuaria:Usuaria,
            Semaforo_id:Semaforo, */
            Descripcion: Descripcion,
        }

        console.log(params)


        axios.post(URI, params).then((response) => {
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


    return (
        <div >
            <h3>Registrando Ticket</h3>

            <div className="row">
                <div className="alert alert-success" role="alert">{msgEstado}</div>
                <div className="alert alert-danger" role="alert">{msgError}</div>
            </div>

            <form onSubmit={store}>

                {/*  <div className="row">
                <div className="form-group col-md-6">

                    <label className="form-label required" >Victima</label>
                    <input value={Usuaria}
                    onChange={  (e)=> setUsuaria(e.target.value)  }
                    type="number"
                    className="form-control"
                    required    
                    />
            
                        

                </div>
                <div className="form-group col-md-6">
                    
                        <label className="form-label required" >Semaforo</label>
                        <input value={Semaforo}
                        onChange={  (e)=> setSemaforo(e.target.value)  }
                        type="number"
                        className="form-control"
                        required    
                        />
                   

                </div>
            </div> */}


                <div className="mb-3">
                    <label className="form-label required" >Descripción</label>
                    <textarea
                        value={Descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        type="textarea"
                        className="form-control"
                        rows="8"
                        placeholder="Descriva la situacion por la que requiera ayuda"
                        required
                    />
                </div>






                <button type="submit" className="btn btn-primary" > <i className="fa-solid fa-floppy-disk"></i> Registrar Ticket </button>
            </form>


        </div>
    )
}


export default CompCreateTickets