import React from 'react';
import conectarSocket from "./Socket"
import axios from 'axios'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import { useNavigate, useParams } from 'react-router-dom'
import { getUruaria } from "./../app/funciones"



const CompChat = () => {
    const [msgEstado, setMegEstado] = useState('');
    const [msgError, setMegError] = useState('');
    const limpiarMsg = () => {
        setMegEstado("")
        setMegError("")
    }
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);

    const [NickName, setNickName] = useState("");
    let socket = conectarSocket()
    let usuria




    useEffect(() => {
        usuria = getUruaria()
        setNickName(usuria.NickName)
        socket.emit('conectado', getUruaria().NickName)


    }, [])


    useEffect(() => {
        socket.on('mensajes', msg => {
            setMensajes([...mensajes, msg])

        })
        return () => { socket.off() }
    }, [mensajes])


    const submit = (e) => {
        e.preventDefault()
        socket.emit('mensaje', NickName, mensaje)
    }






    return (
        <div >
            <h3>Chat</h3>

            <div className="row">
                <div className="alert alert-success" role="alert">{msgEstado}</div>
                <div className="alert alert-danger" role="alert">{msgError}</div>
            </div>

            <div className="row">
                {mensajes.map((e, i) =>
                    <div className="row  align-items-end" key={i}  >
                        <div className='col col-md-1 btn  btn-secondary'> {e.NickName}:  </div>
                        <div className='col col-md-11'>  {e.mensaje}  </div>
                    </div>)}
                <div className="alert alert-success" role="alert">{msgEstado}</div>

            </div>


            <form onSubmit={submit}>
                <label htmlFor="">Escribe su mensaje</label>
                <textarea cols="30" rows="1"
                    value={mensaje}
                    onChange={e => setMensaje(e.target.value)}>
                </textarea>

                <input type="submit" className="btn btn-primary" value="Enviar" />
            </form>





        </div>

    )

}

export default CompChat;