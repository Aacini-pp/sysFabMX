import UsuarioModel from "./UserModel.js"
import TicketModel from "./TicketModel.js"
import AsignacionCasoModel from "./AsignacionCasoModel.js"

import AvanceDeCasoModel from "../models/AvanzeCasoModel.js";




import Premios_UsuariaModel from "./Premios_UsuariasModel.js"
import MensagesModel from "./MensagesModel.js"


import EstadosModel from "./Catalogos/EstadosModel.js"
import RolesModel from "./Catalogos/RolesModel.js"
import EstatusModel from "./Catalogos/EstatusModel.js"
import SemaforoModel from "./Catalogos/SemaforoModel.js"
import CatPremios from "./Catalogos/CatPremios.js"


import EmailRecuperacionModel from "./EmailRecuperacionModelModel.js"


/**Contiene la relacion de  todas las entidaes */


const Relaciones={
    Usuaria:{
        Estado:UsuarioModel.belongsTo(EstadosModel,{as:"deEstado",foreignKey:"EntidadFederativa"}),
        Rol:UsuarioModel.belongsTo(RolesModel,{as:"deRol",foreignKey:"Rol"}),
        Estatus:UsuarioModel.belongsTo(EstatusModel,{as:"deEstatus",foreignKey:"Estatus"}),
        Tickets: UsuarioModel.hasMany(TicketModel,{as:"susTickets",foreignKey:"Usuaria"}),

       
    },
   /* Voluntaria:{
      Ticket:UsuarioModel.belongsToMany(TicketModel, {
        through: 'AsignacionCaso',
        foreignKey: 'Voluntaria', // replaces `productId`
        otherKey: 'Ticket' // replaces `categoryId`
      }),
    }, */
    Tickets :{
        Usuaria:TicketModel.belongsTo(UsuarioModel,{as:"deUsuaria",foreignKey:"Usuaria"}), 
        Estatus:TicketModel.belongsTo(EstatusModel,{as:"deEstatus",foreignKey:"Estatus"}),
        Semaforo:TicketModel.belongsTo(SemaforoModel,{as:"deSemaforo",foreignKey:"Semaforo_id"}),
    },
    AsignacionCaso:{
        Usuaria: AsignacionCasoModel.belongsTo(UsuarioModel,{as:"deVoluntaria",foreignKey:"Voluntaria"}),
        Ticket: AsignacionCasoModel.belongsTo(TicketModel,{as:"deTicket",foreignKey:"Ticket"}), 
        Estatus:AsignacionCasoModel.belongsTo(EstatusModel,{as:"deEstatus",foreignKey:"Estatus"}),
        AvanceDeCaso : AsignacionCasoModel.hasMany( AvanceDeCasoModel ,{as:"susAvances",foreignKey:"AsignacionCaso"}    )
    },
   EmailRecuperacion:{
        Usuaria: EmailRecuperacionModel.belongsTo(UsuarioModel,{as:"deUsuaria",foreignKey:"Usuaria"}),
    },
    Premios_Usuaria:{
        Usuaria: Premios_UsuariaModel.belongsTo(UsuarioModel,{as:"perteneceUsuaria",foreignKey:"Usuaria"}),
        CatPremios:Premios_UsuariaModel.belongsTo(CatPremios,{as:"descPremio",foreignKey:"Premio"})
    },
    Mensages:{
       Emisora:MensagesModel.belongsTo(UsuarioModel,{as:"emisora",foreignKey:"Emisora"}),
       Receptora: MensagesModel.belongsTo(UsuarioModel,{as:"receptora",foreignKey:"Receptora"})
    }   
}
export default Relaciones