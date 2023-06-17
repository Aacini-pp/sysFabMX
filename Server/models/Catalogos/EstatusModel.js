import db from "../../database/db.js";
import { DataTypes } from "sequelize";


const EstatusModel= db.define("CatEstatus",{
   
  Nombre:{
        type:DataTypes.STRING,
        allowNull: false
      } ,
   Descripcion:{
        type:DataTypes.TEXT
    }       
   
}, { timestamps: false, freezeTableName: true});




export default EstatusModel;