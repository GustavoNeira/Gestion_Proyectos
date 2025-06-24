
import Usuario from "../models/usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro,emailOlvidePassword } from "../helpers/email.js";


const registrar = async(req, res)=>{

    //Evitar registro duplicado
    const {email}= req.body;
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario){
        const error = new Error('Email ya registrado');
        return res.status(400).json({msg:error.message});
    }




    try {
        const usuario = new Usuario(req.body);
        usuario.token=generarId();
        await usuario.save();
        //Enviar email confirmacion
        emailRegistro({
            email:usuario.email,
            nombre:usuario.nombre,
            token:usuario.token,

        })
        res.json({msg:"Usuario Creado Correctamente, Revisa tu Email para confirmar tu Cuenta"});
       
    } catch (error) {
        console.log(error)
    }
    
    

};

const autenticar = async (req, res) =>{
    const {email, password} = req.body;
//Comprobar si usuario existe

const usuario = await Usuario.findOne({email});
console.log(usuario);
if(!usuario) {
    const error = new Error('El Usuario No Existe');
    return res.status(404).json({msg:error.message});
}
//Comprobar si el usuario esta confirmado
if(!usuario.confirmado) {
    const error = new Error('Tu Cuenta no ha sido confirmada');
    return res.status(403).json({msg:error.message});
}
//Comprobar su password
if(await usuario.comprobarPassword(password)){
    res.json({
        _id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        token:generarJWT(usuario._id),
    })

}else{
    const error = new Error('La contraseña es incorrecta');
    return res.status(403).json({msg:error.message});
}
};
const confirmar = async (req,res)=>{
const {token} = req.params;
const usuarioConfirmar = await Usuario.findOne({token});
if(!usuarioConfirmar){
    const error = new Error('Token no valido');
    return res.status(403).json({msg:error.message});
}

try {
    usuarioConfirmar.confirmado=true;
    usuarioConfirmar.token="";
    await usuarioConfirmar.save();
    res.json({msg:'Usuario Confirmado Correctamente'});
    console.log(usuarioConfirmar);
} catch (error) {
   console.log(error); 
}
};
const olvidePassword = async (req, res)=>{
    const {email} = req.body;
    const usuario = await Usuario.findOne({email});
    console.log(usuario);
    if(!usuario) {
      const error = new Error('El Usuario No Existe');
      return res.status(404).json({msg:error.message});
}
try {
    usuario.token = generarId();
    await usuario.save();

    // enviar email
    emailOlvidePassword({
        email:usuario.email,
        nombre:usuario.nombre,
        token:usuario.token,

    })

    res.json({msg:"Hemos enviado un email con las instrucciones" })
    
} catch (error) {
    console.log(error);
    
}

};
const comprobarToken = async (req,res)=>{
const {token} = req.params;//extrae informacion de url
const tokenValido = await Usuario.findOne({token});
if(tokenValido){
    res.json({msg:'Token Valido'})
}else{
    const error = new Error('Token no Valido');
    return res.status(404).json({msg:error.message});
}
};

const nuevoPassword = async (req,res)=>{

 const {token} = req.params;
 const {password} = req.body;
 const usuario = await Usuario.findOne({token});//verificamos el token

if(usuario){//si es correcto
    usuario.password=password;//guardamos el password
    usuario.token="";//reseteamos el token
    try {
        await usuario.save();//y guardamos
        res.json({msg:"Contraseña Actualizada Correctamente"});
    } catch (error) {
        console.log(error);
    }
}else{
    const error = new Error('Token no Valido');//si el token es incorrecto  mostramos un error
    return res.status(404).json({msg:error.message});
}
};

const perfil = async (req,res) =>{
   const {usuario} = req;
   res.json(usuario);
}

export{
    registrar, autenticar,confirmar,olvidePassword,comprobarToken,nuevoPassword,perfil
};