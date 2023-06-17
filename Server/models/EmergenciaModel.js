
import db from "../database/db.js";
import { DataTypes } from "sequelize";

import {EmergenciasLogros}  from "./hooks/logrosHooks.js"




const EmergenciaModel = db.define("Emergencia", {



    Victima: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    Voluntaria_Atendio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    Estatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
    },

    Ubicacion: {
        type: DataTypes.TEXT,
        allowNull: true,

    },


}, { 
    freezeTableName: true 
   ,hooks: {  ...EmergenciasLogros}
  });

export default EmergenciaModel;