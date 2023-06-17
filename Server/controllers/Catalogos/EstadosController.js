import EstadosModel from "../../models/Catalogos/EstadosModel.js";
import UsuarioModel from "../../models/UserModel.js"


const EstadosControler = {}


EstadosControler.listar = async (req, res) => {
    console.log("EstadosControler.listar");
    try {
        const estados = await EstadosModel.findAll({
            order: [['id', 'ASC'],]
        });
        res.json(estados);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}

EstadosControler.obtener = async (req, res) => {
    console.log("EstadosControler.obtener");

    try {
        const estado = await EstadosModel.findAll({
            where: { id: req.params.id }
        });

        res.json(estado);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }


}


EstadosControler.crear = async (req, res) => {
    console.log("EstadosControler.crear ");
    try {
        await EstadosModel.create(req.body);
        res.json({ message: "Registro creado correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}


EstadosControler.actualizar = async (req, res) => {
    console.log("EstadosControler.actualizar");
    try {
        await EstadosModel.update(req.body, {
            where: { id: req.params.id }
        });

        res.json({ message: "Registro actualizado correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}


EstadosControler.eliminar = async (req, res) => {
    console.log("EstadosControler.eliminar")

    try {
        await EstadosModel.destroy({
            where: { id: req.params.id }
        });

        res.json({ message: "Registro eliminado correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}

export default EstadosControler

