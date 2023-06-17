import React from 'react';
import axios from 'axios'

import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
    LineChart, Line, ResponsiveContainer
  } from "recharts";
import { CSVLink } from 'react-csv';



const CompRepurgencias = () => {

    const [fechaInicio, setFechaInicio] = useState(  "2022-01-01" );
    const [fechaFin, setFechaFin] = useState(  new Date().toISOString().substr( 0, 10 ) );

    const [dataChart, setDataChart] = useState(  [] );


    const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE + "Reportes/Urgencias/";





    useEffect(() => {
       
        getReporte()
      }, [fechaInicio,fechaFin]);



    //procedimiento para mostrar todos los usuario
    const getReporte= async () =>{
        URL = URI+`${fechaInicio}/${fechaFin}`;
        const res =  await  axios.get(URL ).then((response) => {
           console.log(response.data);


           setDataChart( response.data );
          // setUsuario(response.data)
       }).catch(error => {
           console.error(error.response.data)
          
       });
      
       
   }
 
    


    return (
        <div className="card bg-light text-dark mb-3" >
                <div className="card-header">     
                
                    <div className="row justify-content-center">
                                <div className="col-md-5">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label h6 align-self-center">Fecha Inicial </label>
                                    <div className="col-sm-9 align-self-center">
                                        <input type="date" name="fecha_registro_inicio" className="form-control " value={fechaInicio}  onChange={(e) => setFechaInicio(e.target.value)}   />
                                    </div>
                                </div>
                                </div>
                                <div className="col-md-5">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label h6 align-self-center">Fecha Final</label>
                                    <div className="col-sm-9 align-self-center">
                                        <input type="date" name="fecha_registro_fin" className="form-control " value={fechaFin}  onChange={(e) => setFechaFin(e.target.value)}  /> 
                                    </div>
                                </div>
                                </div>
                    </div> 

                    <div className="row  justify-content-center">


                        <div className="col-5">
                            <CSVLink  data={dataChart} filename={`TablaEmergencias_${fechaInicio}_${fechaFin}`}  > 
                                <button className="btn btn-primary m-2">  <i className="fa-solid fa-file-arrow-down"></i>  Descargar</button>
                            </CSVLink>
                        </div>
                    </div>

                </div>
                <div className="card-body ">
                    <h5 className="card-title">  Urgencias </h5>
                    <p className="card-text ">

                        <div className='row justify-content-center'>
                            
                                <LineChart
                                width={900}
                                height={300}
                                data={dataChart}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name"  />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="casos" stroke="#8884d8" activeDot={{ r: 8 }} />
                                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                                </LineChart>
                           
                           
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-8'>  <h6>Urgencias</h6>  </div>
                        </div>
                           

                    </p>
                </div>
        </div>

    );

}


export default  CompRepurgencias;