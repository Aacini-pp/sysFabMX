import db from "../../database/db.js";
import { DataTypes } from "sequelize";


const CatPremios= db.define("CatPremios",{
   
    Nombre:{
        type:DataTypes.STRING,
        allowNull: false
    } ,
    Descripcion:{
        type:DataTypes.TEXT
    }   ,
    Icono:{
        type:DataTypes.STRING,
        allowNull: true
    }     
   
}, { timestamps: false, freezeTableName: true});




export default CatPremios;