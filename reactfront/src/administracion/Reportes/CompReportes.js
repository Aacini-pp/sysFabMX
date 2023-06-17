import React from 'react';
import axios from 'axios'

import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'


import CompRepEntidadFederativa from  "./coponents/CompRepEntidadFederativa"
import CompRepRangoDeEdad from  "./coponents/CompRepRangoDeEdad"
import CompRepUrgencias from  "./coponents/CompRepUrgencias"
import CompRepCasosExitosos from  "./coponents/CompRepCasosExitosos"
import CompRepNuevasReferentes from  "./coponents/CompRepNuevasReferentes"






// urlfakegame = https://poki.com/es/g/tingly-bubble-shooter

const CompReportes = () => {

    
 
    


    return (
        <div className="container-fluid p-2">
            <div className="row  justify-content-center">
                <div className="col">
                    <h1>  <i className="fa-solid fa-chart-line"></i> Reportes </h1>





                    <nav>
                        <div className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-EntidadFederativa-tab" data-bs-toggle="tab" data-bs-target="#nav-EntidadFederativa" type="button" role="tab" aria-controls="nav-EntidadFederativa" aria-selected="true">Entidad Federativa</button>
                            <button className="nav-link" id="nav-RangoEdad-tab" data-bs-toggle="tab" data-bs-target="#nav-RangoEdad" type="button" role="tab" aria-controls="nav-RangoEdad" aria-selected="false">Rango de Edad</button>
                            <button className="nav-link" id="nav-Urgencias-tab" data-bs-toggle="tab" data-bs-target="#nav-Urgencias" type="button" role="tab" aria-controls="nav-Urgencias" aria-selected="false">Urgencias</button>

                            <button className="nav-link" id="nav-Casos-Exitosos-tab" data-bs-toggle="tab" data-bs-target="#nav-Casos-Exitosos" type="button" role="tab" aria-controls="nav-Casos-Exitosos" aria-selected="false">Casos exitosos</button>
                            <button className="nav-link" id="nav-Nuevas-Referentes-tab" data-bs-toggle="tab" data-bs-target="#nav-Nuevas-Referentes" type="button" role="tab" aria-controls="nav-Nuevas-Referentes" aria-selected="false">Nuevas referentes</button>
                        </div>
                    </nav>


                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-EntidadFederativa" role="tabpanel" aria-labelledby="nav-EntidadFederativa-tab">                               
                            <CompRepEntidadFederativa/>
                        </div>
                        <div className="tab-pane fade" id="nav-RangoEdad" role="tabpanel" aria-labelledby="nav-RangoEdad-tab">
                            <CompRepRangoDeEdad/>
                        </div>
                        


                        <div className="tab-pane fade" id="nav-Urgencias" role="tabpanel" aria-labelledby="nav-Urgencias-tab">        
                            <CompRepUrgencias/>
                        </div>

                        <div className="tab-pane fade" id="nav-Casos-Exitosos" role="tabpanel" aria-labelledby="nav-Casos-Exitosos-tab">
                            <CompRepCasosExitosos/>
                        </div>

                        <div className="tab-pane fade" id="nav-Nuevas-Referentes" role="tabpanel" aria-labelledby="nav-Nuevas-Referentes-tab">
                            <CompRepNuevasReferentes/>
                        </div>    


                        

                        
                    </div>




                
                    
                
                </div>
                
            </div>
        </div>
    )
}


export default CompReportes