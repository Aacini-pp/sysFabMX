import db from "../../database/db.js";
import { DataTypes } from "sequelize";


const EstadosModel= db.define("CatEstados",{
   
  Estado:{
        type:DataTypes.STRING,
        allowNull: false
      }      
   
}, { timestamps: false, freezeTableName: true});




export default EstadosModel;