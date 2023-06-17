import React from 'react';
import axios from 'axios'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useAuth, getUruaria, getRolUruaria } from './funciones'

import LogrosComponent from  "./CompLogros/CompLogros"



const  ULR_BASE = process.env.REACT_APP_BASE_URL;
const URI =  ULR_BASE + "login/";


const HomeComponent = () => {



    const mostrarMensaje = () => {

        if (!useAuth()) { //no logeada
            return <h3>Buscamos ayudarte. <span><Link className="" to='/Registrarse'>Registrate</Link>  y cuentanos todo</span> </h3>

        } else if (getRolUruaria() >= 3) { //cordinadora o voluntaria (4,3)
            return <div><h3><span>Muchas gracias por tu ayuda</span> </h3>  <LogrosComponent/>   </div>

        } else { //visitante o victima (1,2)
            return <h3> Buscamos ayudarte. <span><Link className="" to='/Tickets/create'>Cuentanos todo </Link></span> </h3>
        }
    }


    return (
        <div >
            <h1 className="display-1">
                <i className="fa-solid fa-person-dress"></i>  Bienvenida  {(useAuth()) ? <span> {getUruaria().Nombre}  </span> : <span> </span>}
            </h1>

            {mostrarMensaje()}
            <p>

            </p>
        </div>
    )
}


export default HomeComponent