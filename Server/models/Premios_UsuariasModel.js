import db from "../database/db.js";
import { DataTypes } from "sequelize";


const Premios_UsuariaModel= db.define("Premios_Usuaria",{
   
    Usuaria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },

      


  /***************************CATALOGOS********************/
  Premio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
   
}, { 
  indexes: [
    // Create a unique index on email
    {
      unique: true,
      fields: ['Usuaria',"Premio"]
    }
  ],

     
      freezeTableName: true
    }
);




export default Premios_UsuariaModel;