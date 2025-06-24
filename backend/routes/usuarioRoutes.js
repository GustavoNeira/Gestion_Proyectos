import  Express  from "express";
const router = Express.Router();
import {registrar,autenticar,confirmar,olvidePassword,comprobarToken,nuevoPassword,perfil } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";
//Autenticacion,Creacion, Registro y Confirmacion de Usuarios
router.post('/',registrar);//crear nuevo usuario
router.post('/login', autenticar);
router.get('/confirmar/:token',confirmar);// : routing dinamico
router.post('/olvide-password',olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get('/perfil', checkAuth,perfil );



export default router;