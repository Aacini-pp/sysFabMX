import React from 'react';
import axios from 'axios'

import { useState, useEffect } from 'react'
//import {useNative} from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'



const  ULR_BASE = process.env.REACT_APP_BASE_URL;
const URI = ULR_BASE+"AsignacionCaso/";

const URIVoluntarias = ULR_BASE + "Cat/Voluntarias/";
const URITicket = ULR_BASE + "Tickets/";



const CompCreateAsgCaso = () => {
    const navigate = useNavigate();
    const parametros = useParams()
    console.log("parametros; ", parametros)

    const [msgEstado, setMegEstado] = useState('');
    const [msgError, setMegError] = useState('');
    const limpiarMsg = () => {
        setMegEstado("")
        setMegError("")
    }

    const [VoluntariasArry, setVoluntariasArry] = useState([])
    const [TicketSel, setTicketSel] = useState({})


    const [Ticket, setTicket] = useState('')
    const [Voluntaria, setVoluntaria] = useState('')

    //procedimiento para mostrar todos las Voluntarias y coordinadoras
    const getVoluntarias = async () => {

        const res = await axios.get(URIVoluntarias).then((response) => {
            console.log(response.data);
            setVoluntariasArry(response.data)
        }).catch(error => {
            console.error(error.response.data)
            limpiarMsg()
            setMegError(error.response.data.message)
        });


    }

    const getTicketsbyId = async (e) => {

        const res = await axios.get(URITicket + parametros.id).then(function (response) {
            setTicketSel({
                id: response.data[0].id,
                NombreDeUsuaria: response.data[0].deUsuaria.Nombre,
                NickName: response.data[0].deUsuaria.NickName,
                deUsuaria: response.data[0].deUsuaria
            })
        }).catch(error => {
            console.error(error)
            limpiarMsg()
            setMegError(error.response.data.message)
        });


    }

    useEffect(() => {
        getVoluntarias()
        if (Object.hasOwn(parametros, "id")) {
            setTicket(parametros.id)
            getTicketsbyId()

        }
    }, [])

    // Usuaria =1


    const store = async (e) => {
        e.preventDefault()
        const params = {
            Ticket: Ticket,
            Voluntaria: Voluntaria,

        }

        console.log(params)


        axios.post(URI, params).then((response) => {
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


    return (
        <div >
            <h3>Asignando ticket</h3>

            <div className="row">
                <div className="alert alert-success" role="alert">{msgEstado}</div>
                <div className="alert alert-danger" role="alert">{msgError}</div>
            </div>

            <form onSubmit={store}>

                <div className="row">
                    <div className="form-group col-md-6">

                        <label className="form-label required" >Ticket</label>

                        {(Object.hasOwn(parametros, "id")) ?
                            <div className=" ">
                                <Link to={`/Tickets/${TicketSel.id}`} className='btn  btn-secondary   '>  {parametros.id} (Usuaria: {TicketSel.NickName} ) </Link>

                            </div>
                            :
                            <input value={Ticket}
                                onChange={(e) => setTicket(e.target.value)}
                                type="number"
                                className="form-control"
                                required
                            />
                        }







                    </div>
                    <div className="form-group col-md-6">

                        <label className="form-label required"> Voluntaria</label>


                        <select name="Voluntaria" className="form-select" onChange={(e) => { setVoluntaria(e.target.value) }} required>
                            <option value=""  > Seleccione una  voluntaria.. </option>
                            {VoluntariasArry.map((voluntariaItem) => (
                                <option key={voluntariaItem.id} value={voluntariaItem.id}  > {voluntariaItem.NickName}  </option>
                            ))}

                        </select>


                    </div>
                </div>



                <button type="submit" className="btn btn-primary m-2" > <i className="fa-solid fa-floppy-disk"></i> Guardar Asignación</button>
            </form>


        </div>
    )
}


export default CompCreateAsgCaso