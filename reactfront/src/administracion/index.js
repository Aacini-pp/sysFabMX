import React from 'react';
import axios from 'axios'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import CompShowUsuarios from "./../usuario/ShowUsuario";

import CompShowTickets from "./../ticket/ShowTicket";


import CompShowAsgCaso from "./../asignacioncaso/ShowAsgCaso";




const CompIndexAdmon = () => {

    
    

    

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>  <i className="fa-solid fa-lock"></i> Administración</h1>



                    <div className="d-flex align-items-start">
                        <div className='row'>
                                <div className='col col-md-3'>
                                    <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Usuarias" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa-solid fa-child-dress"></i> Usuarias</button>
                                        <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Tickets" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"> <i className="fa-solid fa-ticket"></i> Tickets </button>
                                        <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-asignaciones" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i className="fa-solid fa-clipboard-list"></i> Asignación de Casos</button>
                                        
                                    </div>
                                    <hr></hr>
                                </div>

                                <div className='col col-md-9'>
                                
                                     <div className="tab-content col-10" id="v-pills-tabContent">
                                        <div className="tab-pane fade show active" id="v-pills-Usuarias" role="tabpanel" aria-labelledby="v-pills-Usuarias-tab">  <CompShowUsuarios />  </div>
                                        <div className="tab-pane fade" id="v-pills-Tickets" role="tabpanel" aria-labelledby="v-pills-Tickets-tab">   <CompShowTickets />   </div>
                                        <div className="tab-pane fade" id="v-pills-asignaciones" role="tabpanel" aria-labelledby="v-pills-asignaciones-tab">   <CompShowAsgCaso />   </div>
                                    
                                    </div>
                                </div>



                        </div>
                        
                        

                    
                    </div>


                </div>
            </div>

       </div>

    )

}


export default CompIndexAdmon