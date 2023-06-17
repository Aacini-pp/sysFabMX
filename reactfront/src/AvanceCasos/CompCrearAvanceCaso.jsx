import React from 'react';
import axios from 'axios'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


//import "./CompLogros.css"

const ULR_BASE = process.env.REACT_APP_BASE_URL;
let URI = ULR_BASE + "AvanceCaso/";



const CompCrearAvanceCaso = () => {

    const [logros, setLogros] = useState([])

    const navigate = useNavigate();
    
    useEffect(() => {


    }, [])

    //procedimiento para mostrar todos los usuario
    const store = async () => {
        navigate("/MisAsignaciones/"); 

        // let param = {


        // };
        // const res = await axios.post(URI, param).then((response) => {
        //     console.log(response.data);
        //     setLogros(response.data)
        // }).catch(error => {
        //     console.error(error.response.data);

        // });


    }


    return (
        <div className="container">
             <div className="row  justify-content-center">
                <div className="form-group col-md-8">
               
                    <h1 > <i class="fa-solid fa-forward"></i> Avance de Caso</h1>
                    <form method="post" autocomplete="off" id="formulario"  onSubmit={store} >
                    
                    <div class="form-group row pb-3">
                        <label for="inputEmail3" class="col-sm-5 col-form-label">¿Este caso ha concluido ?</label>
                        <div class="col-sm-7">
                           
                           

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" name='casoHaConcluido' type="radio"/>
                                <label class="form-check-label" for="inlineRadio1">Si</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input"   name='casoHaConcluido'  type="radio"/>
                                <label class="form-check-label" for="inlineRadio1">No</label>
                            </div>
                            



                        </div>
                    </div>

                    <hr />

                         


                    <div className="row  pb-4 d-flex align-items-end">
                        <div className="form-group col-md-6  ">
                            <label className="form-label">Numero de personas dependientes</label>
                            <input
                            type="number"
                            className="form-control"
                            />
                        </div>
                        <div className="form-group col-md-6 ">
                            <label className="form-label">Años de maltrato</label>
                            <input
                            type="number"
                            className="form-control"
                            />
                        </div>
                    </div>

                    <hr />



                    <fieldset class="form-group">
                        <div class="row pb-3 d-flex align-items-center" >
                        <legend class="col-form-label col-sm-5 pt-0">Situación con el maltratador</legend>
                        <div class="col-sm-7">
                            <div class="form-check">
                            <input class="form-check-input" type="radio"  name='situacionMaltratador'   checked />
                            <label class="form-check-label" for="gridRadios1">
                                    Sigue en la relación
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name='situacionMaltratador'  />
                            <label class="form-check-label" for="gridRadios2">
                                    Se ha separado del maltratador
                            </label>
                            </div>


                            <div class="form-check">
                            <input class="form-check-input" type="radio" name='situacionMaltratador' />
                            <label class="form-check-label" for="gridRadios2">
                                     Hay riesgo de recaer
                            </label>
                            </div>
                           
                        </div>
                        </div>
                    </fieldset>




                    <div class="form-group row pb-3">
                        <label for="inputEmail3" class="col-sm-7 col-form-label">¿Es agente de cambio?</label>
                        <div class="col-sm-5">
                           
                           

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio"  name='EsAgenteDambio'  />
                                <label class="form-check-label" for="inlineRadio1">Si</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name='EsAgenteDambio' />
                                <label class="form-check-label" for="inlineRadio1">No</label>
                            </div>
                            



                        </div>
                    </div>





                    <div class="form-group row pb-3">
                        <label for="inputEmail3" class="col-sm-7 col-form-label">¿Ha denunciado el maltrato? </label>
                        <div class="col-sm-5">
                           
                           

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name='denunciadoaltrato'/>
                                <label class="form-check-label" for="inlineRadio1">Si</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio"  name='denunciadoaltrato'/>
                                <label class="form-check-label" for="inlineRadio1">No</label>
                            </div>
                            



                        </div>
                    </div>




                    <div class="form-group row pb-3">
                        <label for="inputEmail3" class="col-sm-7 col-form-label">¿Independencia económica?</label>
                        <div class="col-sm-5">
                           
                           

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio"   name='independenciaEconomica' />
                                <label class="form-check-label" for="inlineRadio1">Si</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name='independenciaEconomica'  />
                                <label class="form-check-label" for="inlineRadio1">No</label>
                            </div>
                            



                        </div>
                    </div>



                    <div class="form-group row pb-3">
                        <label for="inputEmail3" class="col-sm-7 col-form-label">¿Tiene red de apoyo/amigas?</label>
                        <div class="col-sm-5">
                           
                           

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name='resdApoyo'  />
                                <label class="form-check-label" for="inlineRadio1">Si</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name='resdApoyo' />
                                <label class="form-check-label" for="inlineRadio1">No</label>
                            </div>
                            



                        </div>
                    </div>




                    <div class="form-group row pb-3">
                        <label for="inputEmail3" class="col-sm-7 col-form-label">¿Acercamiento a los recursos?</label>
                        <div class="col-sm-5">
                           
                           

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio"  name='AcercamientoRecursos'  />
                                <label class="form-check-label" for="inlineRadio1">Si</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name='AcercamientoRecursos' />
                                <label class="form-check-label" for="inlineRadio1">No</label>
                            </div>
                            



                        </div>
                    </div>

                    <hr />


                    <fieldset class="form-group">
                        <div class="row pb-3 d-flex align-items-center" >
                        <legend class="col-form-label col-sm-5 pt-0 h1">Impacto  
                            <div class="h6">En que la hemos ayudado desde la ultima ves que se hizo seguimiento</div>  
                        </legend>
                        
                        <div class="col-sm-7">
                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                    <label class="form-check-label" for="defaultCheck1">
                                        Ha dejado la relación maltrato
                                    </label>
                            </div>

                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                                    <label class="form-check-label" for="defaultCheck2">
                                    Ha denunciado
                                    </label>
                            </div>

                            
                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck3"/>
                                    <label class="form-check-label" for="defaultCheck3">
                                    Ha vuelto con el maltratador
                                    </label>
                            </div>


                            
                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck4"/>
                                    <label class="form-check-label" for="defaultCheck4">
                                          Hay riesgo de recaer
                                    </label>
                            </div>


                            
                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck5"/>
                                    <label class="form-check-label" for="defaultCheck5">
                                            Se la ha acompañado a los recursos
                                    </label>
                            </div>


                            
                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck6"/>
                                    <label class="form-check-label" for="defaultCheck6">
                                    Acompañamiento emocional
                                    </label>
                            </div>

                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck7"/>
                                    <label class="form-check-label" for="defaultCheck7">
                                        Terapia psicológica
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck8"/>
                                    <label class="form-check-label" for="defaultCheck8">
                                    Asesoramiento legal
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck9"/>
                                    <label class="form-check-label" for="defaultCheck9">
                                    Inserción laboral
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck10"/>
                                    <label class="form-check-label" for="defaultCheck10">
                                    Resolución de sus problemas judiciales
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck"/>
                                    <label class="form-check-label" for="defaultCheck6">
                                    Ayuda Económica
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck"/>
                                    <label class="form-check-label" for="defaultCheck6">
                                       Vivienda
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck"/>
                                    <label class="form-check-label" for="defaultCheck6">
                                       Asignación de una amiga superviviente
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck"/>
                                    <label class="form-check-label" for="defaultCheck6">
                                    Formación como agende de cambio
                                    </label>
                            </div>

                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck"/>
                                    <label class="form-check-label" for="defaultCheck6">
                                    Otro
                                    </label>
                            </div>




                           
                           
                        </div>
                        </div>
                    </fieldset>

                    <hr />



                    <div class="form-group row pb-3">
                        <label for="inputEmail3" class="col-sm-7 col-form-label">Empoderamiento personal</label>
                        <div class="col-sm-5">
                           
                           

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio"  name='EmpoderamientoPersonal'  />
                                <label class="form-check-label" for="inlineRadio1">Si</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name='EmpoderamientoPersonal' />
                                <label class="form-check-label" for="inlineRadio1">No</label>
                            </div>
                            



                        </div>
                    </div>


                    <div class="form-group row pb-3">
                        <label for="inputEmail3" class="col-sm-7 col-form-label">Testimonio en positivo</label>
                        <div class="col-sm-5">
                           
                           

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio"  name='TestimonioPositivo'  />
                                <label class="form-check-label" for="inlineRadio1">Si</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name='TestimonioPositivo' />
                                <label class="form-check-label" for="inlineRadio1">No</label>
                            </div>
                            



                        </div>
                    </div>


                    <div class="rox">

                    <button type="submit" className="btn btn-primary">
                       
                        <i className="fa-solid fa-floppy-disk"></i> Registrar Avance de caso
                    </button>
                        
                    </div>


                    


                    </form>
                </div>
            </div>  

        </div>
    )
}


export default CompCrearAvanceCaso