import db from "../database/db.js";
import { DataTypes } from "sequelize";

import {TicketsLogros}  from "./hooks/logrosHooks.js"



const TicketModel = db.define("Ticket", {

  Usuaria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },


  Semaforo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      isInt: true,
      isIn: {
        args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        msg: "El semáforo no es valido"
      }
    }
  },


  Descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [15, 500],
        msg: "La descripción tiene que estar entre 15 y 500 caracteres"
      }
    }

  },
  Estatus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2
  }


},{ 
     freezeTableName: true 
    ,hooks: {  ...TicketsLogros}
 }
);

export default TicketModel;