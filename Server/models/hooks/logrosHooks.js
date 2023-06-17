
//import UsuarioModel from "./../UserModel.js"
//import TicketModel from "./../TicketModel.js"
// import AsignacionCasoModel from "./../AsignacionCasoModel.js"
import Premios_Usuaria from "../Premios_UsuariasModel.js"


// import EstadosModel from "./../Catalogos/EstadosModel.js"
// import RolesModel from "./../Catalogos/RolesModel.js"
// import EstatusModel from "./../Catalogos/EstatusModel.js"
// import SemaforoModel from "./../Catalogos/SemaforoModel.js"
// import CatPremios from "./../Catalogos/CatPremios.js"


export const MensagesLogros = {  

    
}

export const EmergenciasLogros = {


    afterValidate  :  async (record, options)=> { 
       
       
        //////////    LOGRO  Atender una Emergencia
        console.log("Logro Atender una Emergencia" );
        if( record.dataValues.Voluntaria_Atendio ){  // si alguien atendio la emergencia
            try {
                await Premios_Usuaria.create(  { 
                    Premio:9,
                    Usuaria: record.dataValues.Voluntaria_Atendio
                  }   );
            } catch (error) {
                console.log("ERROR  GENERANDO PREMIO");
                console.log(error.message);
            }
        }
       

    }




}

export const AsignacionesLogros = {

    afterValidate  :  async (record, options)=> { 
       
        console.log("Logro Ser asignada a un caso " );
        //////////////// SER ASIGNADA A UN CASO  
        try {
            await Premios_Usuaria.create(  { 
                Premio:3,
                Usuaria: record.dataValues.Voluntaria
              }   );
        } catch (error) {
            console.log("ERROR  GENERANDO PREMIO");
            console.log(error.message);
        }

    }
};


export const TicketsLogros = {

       
     

};


export const UsuariasLogros = {

   
        afterUpdate : async (record, options) => {
           
            ///////////////PREMIO POR VOLVERSE VOLUNTARIA
            console.log("Logro POR VOLVERSE VOLUNTARIA " );
            // si era rol  1,2  y pasa a  3,  //premio por volverse voluntaria

           if( record.dataValues.Rol == 3   &&   [1, 2].includes( record._previousDataValues.Rol )   ){
                try {
                    await Premios_Usuaria.create(  { 
                        Premio:1,
                        Usuaria: record.dataValues.id
                      }   );
                } catch (error) {
                    console.log("ERROR  GENERANDO PREMIO");
                    console.log(error.message);
                }
           }
           
           
           ///////////////PREMIO POR VOLVERSE coordinadora
           console.log("Logro POR VOLVERSE coordinadora " );
            // si era rol  1,2  y pasa a  3,  //premio por volverse voluntaria
           if( record.dataValues.Rol == 4   &&   [1, 2,3].includes( record._previousDataValues.Rol )   ){
                    try {
                        await Premios_Usuaria.create(  { 
                            Premio:10,
                            Usuaria: record.dataValues.id
                        }   );
                    } catch (error) {
                        console.log("ERROR  GENERANDO PREMIO");
                        console.log(error.message);
                    }
            }
            

        }


         //    //hook para logros 
    //    afterBulkUpdate : (record, options)=> {
    //     // user.mood = 'happy';

    //     console.log("-------Ticket.afterBulkUpdate" );
    //     console.log(record);
    //     console.log( options);
    //     console.log("-------" );

    //     // user.Ciudad = 'happy';
    //     },
    //     beforeUpdate : (record, options) => {
    //         //record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //         console.log("-------Ticket.beforeUpdate" );
    //         console.log(record);
    //         console.log( options);
    //         console.log("-------" );
    //     },


        // ,
        // afterValidate  : (record, options)=> { 
        //     console.log("-------Ticket.afterValidate" );
        //     console.log(record);
        //     console.log( options);
        //     console.log("-------" );

        // }
    

}
