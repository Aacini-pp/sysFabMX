import EstadosModel from "../../models/Catalogos/EstadosModel.js";
import UsuarioModel from "../../models/UserModel.js"

import EstatusModel from "../../models/Catalogos/EstatusModel.js"
import RolesModel from "../../models/Catalogos/RolesModel.js"
import SemaforoModel from "../../models/Catalogos/SemaforoModel.js"

const CatControler = {}





CatControler.listarEstatus = async (req, res) => {
    console.log("CatControler.listarEstatus");
    try {
        const estatus = await EstatusModel.findAll({
            order: [['id', 'ASC'],]
        });
        res.json(estatus);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}

CatControler.listarRoles = async (req, res) => {
    console.log("CatControler.listarRoles");
    try {
        const roles = await RolesModel.findAll({
            order: [['id', 'ASC'],]
        });
        res.json(roles);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}


CatControler.listarVoluntarias = async (req, res) => {
    console.log("CatControler.listarRoles");
    try {
        const voluntarias = await UsuarioModel.findAll({
            where: { Rol: [3, 4] },
            order: [['Rol', 'DESC'], ['Nombre', 'ASC']]
        });
        res.json(voluntarias);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}


CatControler.listarSemaforo = async (req, res) => {
    console.log("CatControler.listarSemaforo");
    try {
        const semaforos = await SemaforoModel.findAll({
            order: [['id', 'ASC']]
        });
        res.json(semaforos);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}





export default CatControler