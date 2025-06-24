
//este archivo contiene la configuracion del servidor
// dependecias instaladas express,nodemon,dotenv,bcrypt ,jsonwebtoken,cors
// cambios en archivo package.json (cambio linea test por dev, se agrego  type:module) 

import dotenv from 'dotenv'; //importa la libreria para ocultar la bd
import cors from 'cors'
import  express  from "express"; // Busca en node_modules el packete de express y lo asigna a la variable express 
import conetarDB from "./config/db.js"; //importa la conexion
//los archivo creados que no sean dependencias necesitan su extencion
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();//funcion
app.use(express.json());//Con esto se puede procesar la informacion de tipo json
dotenv.config();
conetarDB();
// Configurar CORS

const whitelist = [process.env.FRONTEND_URL];//traemos la ruta desde las variables de entorno
const corsOption={
    origin:function(origin,callback){
        console.log(origin);
        if(whitelist.includes(origin)){

            //puede consultar la api
            callback(null, true);

        }else{
            //no tiene permisos
            callback(new Error('Error de Cors'))

        }

    },
};
app.use(cors(corsOption));
//Routing
app.use('/api/usuarios',usuarioRoutes); //req es lo que envias al servidor res es lo que recibes
app.use('/api/proyectos',proyectoRoutes);
app.use('/api/tareas',tareaRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});