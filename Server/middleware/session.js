//var User = require("../models/user").User;
import UsuarioModel from "../models/UserModel.js";




export default   function(req,res,next){
    console.log("Middleware session");
   
    if(!req.session.usuaria){
        res.status(400)
        res.json(  {  message :"Sesion no iniciada" }   );
    } else{
        next();
                /*
        try {
            const usuaria= await UsuarioModel.findOne({
                where: { id:  req.session.usuario.id }
            }); 

            if(usuaria === null){

                console.log("El usuario ya no existe ");
                res.status(400)
                req.session.destroy();
                res.json(  {  message :"Sesion no iniciada" }   );

            } else{
                req.session.usuaria = usuaria.dataValues
                console.log("Sesión perpetuada:",req.session.usuaria);
                res.json (usuaria);
                next();
            }

        }catch (error) {
            
            res.status(400);       
            res.json(  {  message :error.message }   );

        }

        */
    }


}

