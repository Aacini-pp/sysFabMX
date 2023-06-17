import db from "../../database/db.js";
import { DataTypes } from "sequelize";


const SemaforoModel= db.define("CatSemaforo",{
   
  Nombre:{
        type:DataTypes.STRING,
        allowNull: false
      } ,
   Descripcion:{
        type:DataTypes.TEXT
    }       
   
}, { timestamps: false, freezeTableName: true});




export default SemaforoModel;