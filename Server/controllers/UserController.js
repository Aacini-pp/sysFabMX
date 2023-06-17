import UsuarioModel from "../models/UserModel.js";
import TicketModel from "../models/TicketModel.js";
import AsignacionCasoModel from "../models/AsignacionCasoModel.js";

import relaciones from "../models/relacions.js"


const UsuarioControler = {}


UsuarioControler.listar = async (req, res) => {
    console.log("UsuariotControler.listar");
    try {
        const usuarios = await UsuarioModel.findAll({
            // Queremos que incluya la relaciónes
            include: [
                { association: relaciones.Usuaria.Estado },
                { association: relaciones.Usuaria.Rol },
                { association: relaciones.Usuaria.Estatus }
                , { association: relaciones.Usuaria.Tickets }
            ]
        });
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}

UsuarioControler.obtener = async (req, res) => {
    console.log("UsuariotControler.obtener");

    try {
        const usuario = await UsuarioModel.findAll({
            where: { id: req.params.id },
            include: [
                { association: relaciones.Usuaria.Estado },
                { association: relaciones.Usuaria.Rol },
                { association: relaciones.Usuaria.Estatus }
            ]
        });

        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }


}


UsuarioControler.crear = async (req, res) => {
    console.log("UsuariotControler.crear ");
    try {
        await UsuarioModel.create(req.body);
        res.json({ message: "Registro creado correctamente" });

    } catch (error) {
        console.log(error);
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}


UsuarioControler.actualizar = async (req, res) => {
    console.log("UsuariotControler.actualizar");
    try {
       
        const usuaria = await UsuarioModel.findByPk( req.params.id );
        usuaria.update( {  ...req.body  });


        res.json({ message: "Registro actualizado correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}


UsuarioControler.eliminar = async (req, res) => {
    console.log("UsuariotControler.eliminar")

    try {
        await UsuarioModel.destroy({
            where: { id: req.params.id }
        });

        res.json({ message: "Registro eliminado correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}













export default UsuarioControler




