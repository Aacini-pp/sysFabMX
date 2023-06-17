import UsuarioModel from "../models/UserModel.js";
import TicketModel from "../models/TicketModel.js";
import AsignacionCasoModel from "../models/AsignacionCasoModel.js";

import relaciones from "../models/relacions.js"

import sequelize  from "./../database/db.js";


const ReportesControler = {};



ReportesControler.EntidadFederativa = async (req, res) => {
    console.log("ReportesControler.EntidadFederativa ");

    try {

        let fechaInicio = req.params.fechaInicio;
        let fechaFin =  req.params.fechaFin;
        
        const [results, metadata] = await sequelize.query(`
        SELECT COUNT(*) as value, CatEstados.Estado name FROM  Usuaria  
                INNER JOIN  CatEstados  ON  Usuaria.EntidadFederativa = CatEstados.id
                WHERE Usuaria.Rol IN (1,2)
               AND  DATE ( Usuaria.createdAt ) BETWEEN '${fechaInicio}' AND '${fechaFin}'
                GROUP BY EntidadFederativa 
        `);




        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }


}




ReportesControler.RangoDeEdad = async (req, res) => {
    console.log("ReportesControler.RangoDeEdad");

    try {
        let fechaInicio = req.params.fechaInicio;
        let fechaFin =  req.params.fechaFin;
        
        const [results, metadata] = await sequelize.query(`
                SELECT   YEAR(CURDATE())-YEAR(FechaNacimiento)    name , COUNT( * ) value FROM Usuaria
                WHERE Usuaria.Rol IN (1,2)
                AND  DATE ( Usuaria.createdAt ) BETWEEN '${fechaInicio}' AND '${fechaFin}'
                GROUP BY name 
        `);

        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }


}



ReportesControler.Urgencias = async (req, res) => {
    console.log("ReportesControler.Urgencias");

    try {        
        let fechaInicio = req.params.fechaInicio;
        let fechaFin =  req.params.fechaFin;        
        const [results, metadata] = await sequelize.query(`                
                SELECT  DATE(createdAt) name,  COUNT( * ) casos FROM Emergencia 
                WHERE  DATE ( createdAt )  BETWEEN '${fechaInicio}' AND '${fechaFin}'
                GROUP BY name 
        `);

        res.json(results);
        

    } catch (error) {
        console.log(error);
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }


}



ReportesControler.CasosExitos = async (req, res) => {
    console.log("ReportesControler.CasosExitos");

    try {        
        let fechaInicio = req.params.fechaInicio;
        let fechaFin =  req.params.fechaFin;        
        const [results, metadata] = await sequelize.query(`                
            SELECT  DATE(createdAt) name,  COUNT( * ) casos FROM Ticket 
            INNER JOIN CatEstatus ON   Ticket.Estatus = CatEstatus.id       
            WHERE 
            CatEstatus.Nombre = "Concluido"
            AND DATE ( createdAt )  BETWEEN '${fechaInicio}' AND '${fechaFin}'      
            GROUP BY name 				
        `);

        res.json(results);
        

    } catch (error) {
        console.log(error);
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}



ReportesControler.NuevasReferentes = async (req, res) => {
    console.log("ReportesControler.NuevasReferentes");

    try {        
        let fechaInicio = req.params.fechaInicio;
        let fechaFin =  req.params.fechaFin;        
        const [results, metadata] = await sequelize.query(`                            
        SELECT   DATE ( Usuaria.createdAt )   name , COUNT( * ) 'Nuevas referentes' FROM Usuaria
        WHERE Usuaria.Rol IN (3,4)
        AND  DATE ( Usuaria.createdAt ) BETWEEN '${fechaInicio}' AND '${fechaFin}' 
        GROUP BY name 
        `);

        res.json(results);
        

    } catch (error) {
        console.log(error);
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }


}









export default ReportesControler;