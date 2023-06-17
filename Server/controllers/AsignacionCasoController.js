import AsignacionCasoModel from "../models/AsignacionCasoModel.js";
import TicketModel from "../models/TicketModel.js";
import relaciones from "../models/relacions.js"


const AsignacionCasoControler = {}






AsignacionCasoControler.listar = async (req, res) => {
    console.log("AsignacionCasoControler.listar");
    try {
        const casos = await AsignacionCasoModel.findAll({
            // Queremos que incluya la relación "Estado"
            include: [
                { association: relaciones.AsignacionCaso.Usuaria },
                {
                    association: relaciones.AsignacionCaso.Ticket,
                    include: [{ association: relaciones.Tickets.Usuaria },]
                },
                { association: relaciones.AsignacionCaso.Estatus },
            ]
        });
        res.json(casos);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}

AsignacionCasoControler.obtener = async (req, res) => {
    console.log("AsignacionCasoControler.obtener");

    try {
        const caso = await AsignacionCasoModel.findAll({
            where: { id: req.params.id },
            include: [
                { association: relaciones.AsignacionCaso.Usuaria },
                {
                    association: relaciones.AsignacionCaso.Ticket,
                    include: [{ association: relaciones.Tickets.Usuaria },]
                },
                { association: relaciones.AsignacionCaso.Estatus },
            ]
        });

        res.json(caso);
    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }


}


AsignacionCasoControler.crear = async (req, res) => {
    console.log("AsignacionCasoControler.crear ");
    console.log(req.body);
    try {
        await AsignacionCasoModel.create(req.body);
        //cambiar el estado del ticket a 1:Activo
        await TicketModel.update({ Estatus: 1 }, {
            where: { id: req.body.Ticket }
        });
        res.json({ message: "Registro Asignación de caso creado correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}


AsignacionCasoControler.actualizar = async (req, res) => {
    console.log("AsignacionCasoControler.actualizar");
    try {
        await AsignacionCasoModel.update(req.body, {
            where: { id: req.params.id }
        });

        res.json({ message: "Registro actualizado correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}


AsignacionCasoControler.eliminar = async (req, res) => {
    console.log("AsignacionCasoControler.eliminar")

    try {
        await AsignacionCasoModel.destroy({
            where: { id: req.params.id }
        });

        res.json({ message: "Registro eliminado Correctamente" });

    } catch (error) {
        res.status(400)
        res.json({ message: error.message.replace("Validation error: ", "") });
    }

}

export default AsignacionCasoControler

