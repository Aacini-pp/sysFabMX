//var User = require("../models/user").User;
import UsuarioModel from "../models/UserModel.js";




export default function(req,res,next){
    console.log("Middleware  Voluntaria");
   
    if( true /* req.session.usuaria  && req.session.usuaria.Rol >= 3 */){ //TODO: quitar comentario en produccion y el true
        next();
    }else{
        res.status(400)
        res.json(  {  message :"Se necesita ser voluntaria o coordinadora " }   );  
    }


}


