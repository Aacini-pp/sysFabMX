import React from 'react';
import axios from 'axios'

import { useState, useEffect } from 'react'
import { useNavigate , useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


//import "./CompLogros.css"

const ULR_BASE = process.env.REACT_APP_BASE_URL;
let URI = ULR_BASE + "AvanceDeCaso/";



const CompCrearAvanceCaso = () => {

    const navigate = useNavigate();
    const parametros = useParams()
   
    const [msgEstado, setMegEstado] = useState('');
    const [msgError, setMegError] = useState('');
    const limpiarMsg = () => {
        setMegEstado("")
        setMegError("")
    }
    

    const [respuesta , setRespuesta ] = useState(
        {
            AsignacionCaso : 0 ,
            Concluido : 0 ,
            NumeroDependientes : 0 ,
            AniosMaltrato : 0 ,
            SituacionConElMaltratador : 0 ,
            EsAgenteDeCambio : 0 ,
            HaDenunnciadoElMaltrato : 0 ,
            IndependenciEconomica : 0 ,
            TieneRedApoyo : 0 ,
            AcercamientoRecursos : 0 ,
            haDejadoLaRelacionMaltrato : 0 ,
            haDenunciado : 0 ,
            haVueltoConElMaltratador : 0 ,
            hayRiesgoDeRecaer : 0 ,
            seLaHaAcompañadoALosRecursos : 0 ,
            acompañamientoEmocional : 0 ,
            terapiaPsicologica : 0 ,
            asesoramientoLegal : 0 ,
            insercionLaboral : 0 ,
            resolucionDeSusProblemasJudiciales : 0 ,
            ayudaEconomica : 0 ,
            vivienda : 0 ,
            asignacionDeUnaAmigaSuperviviente : 0 ,
            formacionComoAgendeDeCambio : 0 ,
            OtroRecurso : 0 ,
            empoderamientoPersonal : 0 ,
            testimonioEnPositivo : 0 ,
        }
    );



const [ AsignacionCaso , setAsignacionCaso] = useState( 0 );
const [ FechaReporte , setFechaReporte] = useState( 0 );


const [ Concluido , setConcluido] = useState( 0 );
const [ NumeroDependientes , setNumeroDependientes] = useState( 0 );
const [ AniosMaltrato , setAniosMaltrato] = useState( 0 );
const [ SituacionConElMaltratador , setSituacionConElMaltratador] = useState( 0 );
const [ EsAgenteDeCambio , setEsAgenteDeCambio] = useState( 0 );
const [ HaDenunnciadoElMaltrato , setHaDenunnciadoElMaltrato] = useState( 0 );
const [ IndependenciEconomica , setIndependenciEconomica] = useState( 0 );
const [ TieneRedApoyo , setTieneRedApoyo] = useState( 0 );
const [ AcercamientoRecursos , setAcercamientoRecursos] = useState( 0 );


const [ haDejadoLaRelacionMaltrato , sethaDejadoLaRelacionMaltrato] = useState(  false   );
const [ haDenunciado , sethaDenunciado] = useState(  false   );
const [ haVueltoConElMaltratador , sethaVueltoConElMaltratador] = useState(  false   );
const [ hayRiesgoDeRecaer , sethayRiesgoDeRecaer] = useState(   false  );
const [ seLaHaAcompañadoALosRecursos , setseLaHaAcompañadoALosRecursos] = useState(  false   );
const [ acompañamientoEmocional , setacompañamientoEmocional] = useState(  false   );
const [ terapiaPsicologica , setterapiaPsicologica] = useState(  false   );
const [ asesoramientoLegal , setasesoramientoLegal] = useState(  false   );
const [ insercionLaboral , setinsercionLaboral] = useState( false );
const [ resolucionDeSusProblemasJudiciales , setresolucionDeSusProblemasJudiciales] = useState(  false   );
const [ ayudaEconomica , setayudaEconomica] = useState(  false   );
const [ vivienda , setvivienda] = useState(   false  );
const [ asignacionDeUnaAmigaSuperviviente , setasignacionDeUnaAmigaSuperviviente] = useState(  false   );
const [ formacionComoAgendeDeCambio , setformacionComoAgendeDeCambio] = useState(  false   );
const [ OtroRecurso , setOtroRecurso] = useState(  false   );
const [ empoderamientoPersonal , setempoderamientoPersonal] = useState(  0  );
const [ testimonioEnPositivo , settestimonioEnPositivo] = useState( 0 );






    
    
    useEffect(() => {


    }, [])

  



    const store = async (e) => {
        e.preventDefault()
        const params = {
            AsignacionCaso : parseInt( parametros.id ), 
        //    FechaReporte , 
            Concluido , 
            NumeroDependientes , 
            AniosMaltrato , 
            SituacionConElMaltratador , 
            EsAgenteDeCambio , 
            HaDenunnciadoElMaltrato , 
            IndependenciEconomica , 
            TieneRedApoyo , 
            AcercamientoRecursos , 
            haDejadoLaRelacionMaltrato , 
            haDenunciado , 
            haVueltoConElMaltratador , 
            hayRiesgoDeRecaer , 
            seLaHaAcompañadoALosRecursos , 
            acompañamientoEmocional , 
            terapiaPsicologica , 
            asesoramientoLegal , 
            insercionLaboral , 
            resolucionDeSusProblemasJudiciales , 
            ayudaEconomica , 
            vivienda , 
            asignacionDeUnaAmigaSuperviviente , 
            formacionComoAgendeDeCambio , 
            OtroRecurso , 
            empoderamientoPersonal , 
            testimonioEnPositivo , 

        }

        console.log("enviado",params)


        axios.post(URI, params).then((response) => {
            console.log("respuesta", response.data);
            limpiarMsg()
            setMegEstado(response.data.message)
              setTimeout(function () { navigate("/MisAsignaciones/") }, 2000);

        }).catch(error => {
            console.error(error.response.data)
            limpiarMsg()
            setMegError(error.response.data.message)
        });


    }


     const onChangeConcluido = (event) => {
        console.log( " onChangeConcluido", event.target.value);

        setConcluido(parseInt( event.target.value)  )
      }




    return (
        <div className="container">
             <div className="row  justify-content-center">
                <div className="form-group col-md-8">
               
                    <h1 > <i class="fa-solid fa-forward"></i> Avance de Caso</h1>
                    <div className="row">
                        <div className="alert alert-success" role="alert">{msgEstado}</div>
                        <div className="alert alert-danger" role="alert">{msgError}</div>
                    </div>
                    <form method="post" autocomplete="off" id="formulario"  onSubmit={store} >
                    
                    <div class="form-group row pb-3">
                        <label for="inputEmail3" class="col-sm-5 col-form-label">¿Este caso ha concluido ?</label>
                        <div class="col-sm-7"   onChange={onChangeConcluido}>
                           
                           

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" name='casoHaConcluido' type="radio" value={1}  />
                                <label class="form-check-label" for="inlineRadio1">Si</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input"   name='casoHaConcluido'  type="radio"  value={0}  />
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
                           
                            value={NumeroDependientes}
                            onChange={(e) => setNumeroDependientes(e.target.value)}


                            />
                        </div>
                        <div className="form-group col-md-6 ">
                            <label className="form-label">Años de maltrato</label>
                            <input
                            type="number"
                            className="form-control"

                            value={AniosMaltrato}
                            onChange={(e) => setAniosMaltrato(e.target.value)}


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
                            <div class="h6">En que la hemos ayudado desde la última vez que se hizo seguimiento</div>  
                        </legend>
                        
                        <div class="col-sm-7">
                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"   checked={haDejadoLaRelacionMaltrato }    onChange={ (e) => {sethaDejadoLaRelacionMaltrato (! haDejadoLaRelacionMaltrato ) }}   />
                                    <label class="form-check-label" for="defaultCheck1">
                                        Ha dejado la relación maltrato
                                    </label>
                            </div>

                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck2"  checked={haDenunciado }    onChange={ (e) => {sethaDenunciado (! haDenunciado ) }}    />
                                    <label class="form-check-label" for="defaultCheck2">
                                    Ha denunciado
                                    </label>
                            </div>

                            
                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck3"   checked={haVueltoConElMaltratador }    onChange={ (e) => {sethaVueltoConElMaltratador (! haVueltoConElMaltratador ) }}   />
                                    <label class="form-check-label" for="defaultCheck3">
                                    Ha vuelto con el maltratador
                                    </label>
                            </div>


                            
                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck4"  checked={hayRiesgoDeRecaer }    onChange={ (e) => {sethayRiesgoDeRecaer (! hayRiesgoDeRecaer ) }}    />
                                    <label class="form-check-label" for="defaultCheck4">
                                          Hay riesgo de recaer
                                    </label>
                            </div>


                            
                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck5"   checked={seLaHaAcompañadoALosRecursos }    onChange={ (e) => {setseLaHaAcompañadoALosRecursos (! seLaHaAcompañadoALosRecursos ) }}   />
                                    <label class="form-check-label" for="defaultCheck5">
                                            Se la ha acompañado a los recursos
                                    </label>
                            </div>


                            
                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck6"   checked={acompañamientoEmocional }    onChange={ (e) => {setacompañamientoEmocional (! acompañamientoEmocional ) }}   />
                                    <label class="form-check-label" for="defaultCheck6">
                                    Acompañamiento emocional
                                    </label>
                            </div>

                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck7"  checked={terapiaPsicologica }    onChange={ (e) => {setterapiaPsicologica (! terapiaPsicologica ) }}    />
                                    <label class="form-check-label" for="defaultCheck7">
                                        Terapia psicológica
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck8"  checked={asesoramientoLegal }    onChange={ (e) => {setasesoramientoLegal (! asesoramientoLegal ) }}    />
                                    <label class="form-check-label" for="defaultCheck8">
                                    Asesoramiento legal
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck9"   checked={insercionLaboral }    onChange={ (e) => {setinsercionLaboral (! insercionLaboral ) }}    />
                                    <label class="form-check-label" for="defaultCheck9">
                                    Inserción laboral
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck10"   checked={resolucionDeSusProblemasJudiciales }    onChange={ (e) => {setresolucionDeSusProblemasJudiciales (! resolucionDeSusProblemasJudiciales ) }}   />
                                    <label class="form-check-label" for="defaultCheck10">
                                    Resolución de sus problemas judiciales
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck"  checked={ayudaEconomica }    onChange={ (e) => {setayudaEconomica (! ayudaEconomica ) }}    />
                                    <label class="form-check-label" for="defaultCheck6">
                                    Ayuda Económica
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck"   checked={vivienda }    onChange={ (e) => {setvivienda (! vivienda ) }}   />
                                    <label class="form-check-label" for="defaultCheck6">
                                       Vivienda
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck"   checked={asignacionDeUnaAmigaSuperviviente }    onChange={ (e) => {setasignacionDeUnaAmigaSuperviviente (! asignacionDeUnaAmigaSuperviviente ) }}   />
                                    <label class="form-check-label" for="defaultCheck6">
                                       Asignación de una amiga superviviente
                                    </label>
                            </div>


                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck"   checked={formacionComoAgendeDeCambio }    onChange={ (e) => {setformacionComoAgendeDeCambio (! formacionComoAgendeDeCambio ) }}   />
                                    <label class="form-check-label" for="defaultCheck6">
                                    Formación como agende de cambio
                                    </label>
                            </div>

                            <div class="form-check">
                                   <input class="form-check-input" type="checkbox" value="" id="defaultCheck"  checked={OtroRecurso }    onChange={ (e) => {setOtroRecurso (! OtroRecurso ) }}    />
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