import db from "../database/db.js";
import { DataTypes } from "sequelize";



import {MensagesLogros}  from "./hooks/logrosHooks.js"




const MensagesModel= db.define("Mensages",{
   

    Leido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isInt: true,
            isIn: {
                args: [[0,1]],
                msg: "El semáforo no es valido"
            }
        }
      },


    Emisora: {
        type: DataTypes.INTEGER,
        allowNull: false
      },


      Receptora: {
        type: DataTypes.INTEGER,
        allowNull: false
      },


      texto: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [1, 500],
            msg: "El mensaje tiene que estar entre 1 y 500 caracteres"
          }
        }
      }


    
}, { 
     hooks: {  ...MensagesLogros   },
    
      freezeTableName: true
    }
);




export default MensagesModel;