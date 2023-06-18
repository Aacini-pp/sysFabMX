import React from 'react';
import axios from 'axios'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useAuth, getUruaria, getRolUruaria } from '../funciones'

import "./CompLogros.css"

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
let URI = ULR_BASE+"MisLogros/";



const LogrosComponent = () => {

    const [logros,setLogros] = useState([])
    useEffect( ()=>{
             getUsuario()   
        
    },[])

    //procedimiento para mostrar todos los usuario
    const getUsuario= async () =>{
         const res =  await  axios.get(URI).then((response) => {
            console.log(response.data);
            setLogros(response.data)
        }).catch(error => {
            console.error(error.response.data);
            
        });
       
        
    }


    return (
        <div className="container">
            <div className="row  justify-content-center">
                <div className="col-10">
                  


                        <div id='cardLogros' className="card text-white bg-warning bgGold  mb-3">
                            <div className="card-header"> 
                                 <h1> 
                                    <div className="valoracion">
                                        <button>
                                        <i className="fa-solid fa-star "></i>  
                                        </button>
                                        Tus logros  
                                    </div>
                                    
                                </h1>
                            </div>
                            <div className="card-body">
                               
                                <p className="card-text">

                                        <div className="row  justify-content-center">
                                                


                                                { logros.map( (logro)=>(

                                                    <div key={ logro.id}   className="col col-md-3">
                                                        <i className="fa-solid fa-star"></i> 
                                                        <div className='h6'> {logro.descPremio.Nombre} </div>
                                                    </div>
                                
                                                ))}   







                                        </div>

                                </p>
                            </div>
                        </div>
                 </div>
            </div>
        </div>
    )
}


export default LogrosComponent