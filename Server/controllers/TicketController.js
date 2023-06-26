import 'dotenv/config'
import axios from 'axios'

import { Op } from "sequelize"

import TicketModel from "../models/TicketModel.js";
import UsuarioModel from "../models/UserModel.js";

import relaciones from "../models/relacions.js"

/**
 * Esta funcion se encargara de consultar la api de google para consultas analisis de sentimientos de google
 * oara regresar el valor menor de sus items
 */
let analisisCasos = async function (descripcion) {
    const secreetKey = process.env.secreetKeyGoogleAPI
    const APIgoogle = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" + secreetKey


    var data = {
        "document": {
            "type": "PLAIN_TEXT",
            "content": descripcion,
            "language": "es"
        },
        "encodingType": "UTF8"

    }
    let minVal = 1
    const res = await axios.post(APIgoogle, data).then((response) => {
        console.log("Consulta api response", response.data);
        response.data.sentences.forEach((sentence) => {
            console.log("sentence", sentence)
            if (sentence.sentiment.score < minVal) {
                minVal = sentence.sentiment.score
            }

        })

    }).catch(error => {
        console.error("Consulta api error")

    });
    console.log("Resultado semaforo ", { min: minVal, semaforo: Math.round(minVal * -5) + 5 })
    return { min: minVal, semaforo: Math.round(minVal * -5) + 5 }; // Math.round(i * -5)+5)

}

const TicketControler = {}

TicketControler.analisisCasos = analisisCasos


TicketControler.listar = async (req, res) => {
    console.log("TicketControler.listar");
    try {
        const tickets = await TicketModel.findAll({

            where: {[Op.not]: [
                                 { Estatus:5 }
              
                    ]},

            // Queremos que incluya la relación "Estado"
            include: [
                { association: relaciones.Tickets.Usuaria },
                { association: relaciones.Tickets.Estatus },
                { association: relaciones.Tickets.Semaforo }


            ],
            order: [['Estatus', 'DESC'], ['Semaforo_id', 'DESC'], ['id', 'ASC']]
        });
        res.json(tickets);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}

TicketControler.obtener = async (req, res) => {
    console.log("TicketControler.obtener");

    try {
        const ticket = await TicketModel.findAll({
            where: { id: req.params.id },
            include: [
                { association: relaciones.Tickets.Usuaria },
                { association: relaciones.Tickets.Estatus },
                { association: relaciones.Tickets.Semaforo }
            ]
        });

        res.json(ticket);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }


}


TicketControler.crear = async (req, res) => {
    console.log("TicketControler.crear ");

    

    try {

        //si tiene tickets en estatus 1.Activo o 2.SinAsignar lanzar error de no autorizado 
        const noTicket = await TicketModel.count({
            where: { 
                Usuaria: req.session.usuaria.id,
               Estatus: [1,2]
                
             },
             
            
        });

        console.log("NoTicket",noTicket);

        if( noTicket > 0 ){
            throw new Error('No puede crear un Ticket nuevo si tiene "Activo" o "Sin asignar"')

        }


        //analizar texto 
            const resp = await analisisCasos(req.body.Descripcion)
            console.log(resp);



        await TicketModel.create({
            Usuaria: req.session.usuaria.id,
            Descripcion: req.body.Descripcion,
            Semaforo_id: resp.semaforo
        });
        res.json({ message: "Registro creado correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}


TicketControler.actualizar = async (req, res) => {
    console.log("TicketControler.actualizar");
    try {
        await TicketModel.update(req.body, {
            where: { id: req.params.id }
        });

        res.json({ message: "Registro actualizado correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}


TicketControler.eliminar = async (req, res) => {
    console.log("TicketControler.eliminar")

    try {
        await TicketModel.destroy({
            where: { id: req.params.id }
        });

        res.json({ message: "Registro eliminado correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}

export default TicketControler

