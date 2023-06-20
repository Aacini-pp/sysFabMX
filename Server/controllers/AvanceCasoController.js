import 'dotenv/config'
import axios from 'axios'

import TicketModel from "../models/TicketModel.js";
import UsuarioModel from "../models/UserModel.js";
import AvanceDeCasoModel from "../models/AvanzeCasoModel.js";

import relaciones from "../models/relacions.js"



const AvanceDeCasoControler = {}



AvanceDeCasoControler.listar = async (req, res) => {
    console.log("AvanceDeCasoControler.listar");



    

}

AvanceDeCasoControler.obtener = async (req, res) => {
    console.log("AvanceDeCasoControler.obtener");

    let casoBuscar =   (req.session.usuaria ) ? req.session.usuaria.id: 1;
 
    
    try {
        const ticket = await AvanceDeCasoModel.findAll({
            where: { AsignacionCaso:  req.body.AsignacionCaso },
        });

        res.json(ticket);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

    


}


AvanceDeCasoControler.crear = async (req, res) => {
    console.log("AvanceDeCasoControler.crear ",req.body);

        // TODO: restringir la creacion para casos no asignados 
    try{
        await AvanceDeCasoModel.create({
            ... req.body
        });
        res.json({ message: "Registro creado correctamente" });
       

    }  catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

   
  

   // res.json(results);

    
}


AvanceDeCasoControler.actualizar = async (req, res) => {
    console.log("AvanceDeCasoControler.actualizar");

}


AvanceDeCasoControler.eliminar = async (req, res) => {
    console.log("AvanceDeCasoControler.eliminar")

}

export default AvanceDeCasoControler

