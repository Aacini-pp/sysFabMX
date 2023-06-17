import db from "../database/db.js";
import { DataTypes } from "sequelize";

//TODO: EL DIAGRAMA LO NOMBRA COMO TOKEN

//TODO:Cambiar el modelo  para poder usarlo  para varios propositos como token

const EmailRecuperacionModel= db.define("RecuperacionPassMail",{
   
    token:{
        type:DataTypes.TEXT,
        primaryKey: true,
        allowNull: true,
        validate:{
            len:{
                   args:[45],
                   msg:"El token deve medir 45 caracteres"
               }
        }      
    },

    Usuaria:{
        type:DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    Estatus:{
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },

    IpSolicitud:{
        type:DataTypes.TEXT,
        allowNull: false,
        validate:{
            isIP:{
                   msg:"Ingrese una ip valida"
               }
        }
      
    },

    Navegador:{
        type:DataTypes.TEXT,
        allowNull: false,
        validate:{
            len:{
                   args:[5,25],
                   msg:"No parece un navegador valido"
               }
        }
      
    },

    SistemaOperativo:{
        type:DataTypes.TEXT,
        allowNull: false,
        validate:{
            len:{
                   args:[5,25],
                   msg:"No parece una sistema operativo valido"
               }
        }
      
    },
  
   
}, { freezeTableName: true});

export default EmailRecuperacionModel;