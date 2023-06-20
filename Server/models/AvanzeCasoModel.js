import db from "../database/db.js";
import { DataTypes } from "sequelize";

//  import {AsignacionesLogros}  from "./hooks/logrosHooks.js"







const AvanzeCasoModel= db.define("AvanceCaso",{
    AsignacionCaso:{
        type:DataTypes.INTEGER,
        },
    
    
      FechaReporte:{
        type:DataTypes.DATE,
        },
    
      Concluido:{
        type:DataTypes.INTEGER,
        },
      NumeroDependientes:{
        type:DataTypes.INTEGER,
        },
      AniosMaltrato:{
        type:DataTypes.INTEGER,
        },
      SituacionConElMaltratador:{
        type:DataTypes.INTEGER,
        },
      EsAgenteDeCambio:{
        type:DataTypes.INTEGER,
        },
      HaDenunnciadoElMaltrato:{
        type:DataTypes.INTEGER,
        },
      IndependenciEconomica:{
        type:DataTypes.INTEGER,
        },
      TieneRedApoyo:{
        type:DataTypes.INTEGER,
        },
      AcercamientoRecursos:{
        type:DataTypes.INTEGER,
        },
      haDejadoLaRelacionMaltrato:{
        type:DataTypes.INTEGER,
        },
      haDenunciado:{
        type:DataTypes.INTEGER,
        },
      haVueltoConElMaltratador:{
        type:DataTypes.INTEGER,
        },
      hayRiesgoDeRecaer:{
        type:DataTypes.INTEGER,
        },
      seLaHaAcompañadoALosRecursos:{
        type:DataTypes.INTEGER,
        },
      acompañamientoEmocional:{
        type:DataTypes.INTEGER,
        },
      terapiaPsicologica:{
        type:DataTypes.INTEGER,
        },
      asesoramientoLegal:{
        type:DataTypes.INTEGER,
        },
      insercionLaboral:{
        type:DataTypes.INTEGER,
        },
      resolucionDeSusProblemasJudiciales:{
        type:DataTypes.INTEGER,
        },
      ayudaEconomica:{
        type:DataTypes.INTEGER,
        },
      vivienda:{
        type:DataTypes.INTEGER,
        },
      asignacionDeUnaAmigaSuperviviente:{
        type:DataTypes.INTEGER,
        },
      formacionComoAgendeDeCambio:{
        type:DataTypes.INTEGER,
        },
      OtroRecurso:{
        type:DataTypes.INTEGER,
        },
      empoderamientoPersonal:{
        type:DataTypes.INTEGER,
        },
      testimonioEnPositivo:{
        type:DataTypes.INTEGER,
        },
    


}, { 
    freezeTableName: true 
   
  })

  ;
  
  export default AvanzeCasoModel;