import React, { Component } from 'react';

import axios from "axios";

import { useState, useEffect } from "react";

import ReactTimeAgo from 'react-time-ago'






//import "./conversation.css";

export default function Conversation( { conversation, currentUser }  ) {
    const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URIRoles = ULR_BASE + "Cat/Roles/";

    
    const [roles, setRoles] = useState([]);

    const getRoles = async () => {
      const res = await axios
        .get(URIRoles)
        .then((response) => {
          console.log("Roles",response.data);
          setRoles(response.data);
        })
        .catch((error) => {
          console.error(error);
         
          
        });
    };
  
  
  
    useEffect(() => {
    
      getRoles();
     
    }, []);
  
  

    const consegirUltimMensaje= () =>{
        if(conversation.mensages.length >0 ){
            let  ultimoMsg =conversation.mensages.length -1;
            return     conversation.mensages[ultimoMsg] ;   
        }else {
            return null;

        }
       
    };



    const consegirUltimMensajeAbreviado= () =>{
        if(consegirUltimMensaje()){

            return     consegirUltimMensaje().text ;  //" TODO: abreviar mensaje
        }else {
            return "";
        }
      
    };



  return (
    <li className="p-2 border-bottom">
                                    <a
                                        href="#!"
                                        className="d-flex justify-content-between text-decoration-none"
                                    >
                                        <div className="d-flex flex-row">
                                            <div>
                                                <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                alt="avatar"
                                                className="d-flex align-self-center me-3"
                                                width="60"
                                                />
                                                <span className="badge bg-success badge-dot"></span>
                                            </div>
                                            <div className="pt-1 text-start">
                                                <p className="fw-bold mb-0">    { currentUser.Nombre }    </p>
                                                
                                                <p className="text-muted fs-5">    @{ currentUser.NickName } 
                                                   
                                                  {/*   <span className="fs-6" >(Coordinadora)</span>   */}

                                                    


                                                  {roles.map((rol) => (
                                                      currentUser.Rol > 2 &&  rol.id ==  currentUser.Rol  )
                                                    ? (  <span className="fs-6" > (  {rol.Nombre  })</span> )
                                                    : null
                                                    )}
                                                 
                                                 </p>
                                               
                                                <p className="small text-muted">
                                                    {consegirUltimMensajeAbreviado()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-1">
                                        { conversation.mensajesNoleidos ? ( 
                                            <span className="badge bg-danger rounded-pill float-end">
                                                { conversation.mensajesNoleidos}
                                            </span>): "" }

                                            { consegirUltimMensaje()? ( 
                                               <p className="small text-muted mb-1 fs-6">  <em>  <ReactTimeAgo date={ consegirUltimMensaje().createdAt} locale="es-MX"/>   </em>     </p>
                                               ): "" }


                                            
                                        
                                        </div>
                                    </a>
                                    </li>
  );
}

