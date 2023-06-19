import db from "../database/db.js";
import { DataTypes } from "sequelize";


import {UsuariasLogros}  from "./hooks/logrosHooks.js"





/**
 //TODO Encontrar como mandar mensajes personalizados para  unique o quitarles el mensaje 
 */


const UsuarioModel = db.define("Usuaria", {
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ApellidoPaterno: {
    type: DataTypes.STRING,
    allowNull: true
  },

  ApellidoMaterno: {
    type: DataTypes.STRING,
    allowNull: true  
  },

  NickName: {
    type: DataTypes.STRING,
    allowNull: false, //TODO: tiene que tener letras pero no simbolos @
    unique: {
      msg: 'El apodo necesita ser unico'  //TODO  msg
    }
  },

  Pass: {
    type: DataTypes.STRING,
    allowNull: false,
    /**
     * set(value) {
  // Storing passwords in plaintext in the database is terrible.
  // Hashing the value with an appropriate cryptographic hash function is better.
  this.setDataValue('password', hash(value));
  }
     * 
     */
  },


  FechaNacimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  Ciudad: {
    type: DataTypes.STRING,
    allowNull: true,
  },


  PerfilFB: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: {
      msg: 'El enlace a FB ya se había registrado'
    },

    validate: {
      isUrl: {
        args: true,
        msg: "El perfil de FB no tiene formato apropiado"
      }
    }

  },


  Email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: {
      msg: 'Este correo ya se había registrado'
    },

    validate: {
      isEmail: {
        args: true,
        msg: "No se introdujo un correo valido"
      }
    }
  },

  Telefono: { //TODO:EL NUMERO DEVE TENER LONGITUD DE NUMERO CON LADA
    type: DataTypes.STRING,
    allowNull: true,
    unique: {
      msg: 'Este numero telefónico ya se había registrado'
    },

    validate: {
      isNumeric: {
        args: true,
        msg: "El teléfono solo puede contener números con su lada "
      }
    }
  },





  /***************************CATALOGOS********************/
  Rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },

  EntidadFederativa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 34
  },
  Estatus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },



}
  , {
    //validacion almenos un medio de contacto
    validate: {
      medioDeContacto() {
        console.log("medioDeContacto", this.Email, this.Telefono, this.PerfilFB)
        if ((this.Email === null) && (this.Telefono === null) && (this.PerfilFB === null)) {
          throw new Error('Tiene que especificarse al menos un medio de contacto (Teléfono, Email o Perfil de facebook)');
        }
      }
    }

    ,hooks: {  ...UsuariasLogros   }
  }

);

export default UsuarioModel;