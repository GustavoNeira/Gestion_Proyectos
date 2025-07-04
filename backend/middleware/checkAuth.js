import  jwt  from "jsonwebtoken";
import Usuario from "../models/usuario.js";


const checkAuth = async (req,res, next) => {
    let token;
    
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
try {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,  process.env.JWT_SECRETO);
    
   req.usuario = await Usuario.findById(decoded.id).select(
    '-password -confirmado -token -createdAt -updatedAt -__v'
    );
  
   return next();
} catch (error) {
    console.log(error);
    return res.status(404).json({msg:"Hubo un error Token expirado"});
}
}
if(!token){
    const error = new Error('Token no valido');
    return res.status(401).json({msg:error.message});
}
return next();
};
export default checkAuth;