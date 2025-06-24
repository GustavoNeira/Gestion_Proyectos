import mongoose from "mongoose";
import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";


const obtenerProyectos = async (req, res) =>{


const proyectos = await Proyecto.find().where('creador').equals(req.usuario);
//buscamos en el model proyecto y encontramos con find

res.json(proyectos);
};
const nuevoProyecto = async (req, res) =>{
   const proyecto = new Proyecto(req.body)
   proyecto.creador = req.usuario._id

   try {
    const proyectoAlmacenado = await proyecto.save()
    res.json(proyectoAlmacenado);
   } catch (error) {
    console.log(error)
   }
};
const obtenerProyecto = async (req, res) =>{
    const {id} = req.params;

    const validar = mongoose.Types.ObjectId.isValid(id)
    if(!validar){
      const error = new Error ('Proyecto no existe')
      return res.status(404).json({msg:error.message})
    }
    const proyecto = await Proyecto.findById(id);
    if(!proyecto) {

      res.status(404).json({msg: 'El proyecto que estas buscando no existe'}); 
    };
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
      res.status(403).json({msg: 'No tienes permisos'});
    };
    //obtener las tareas del proyecto
    const tareas = await Tarea.find().where('proyecto').equals(proyecto._id);
   res.json({
    proyecto,
    tareas,
   });


};
const editarProyecto = async (req, res) =>{
  const {id} = req.params;

    const validar = mongoose.Types.ObjectId.isValid(id)
    if(!validar){
      const error = new Error ('Proyecto no existe')
      return res.status(404).json({msg:error.message})
    }
    const proyecto = await Proyecto.findById(id);
    if(!proyecto) {

      res.status(404).json({msg: 'El proyecto que estas buscando no existe'}); 
    };
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
      res.status(403).json({msg: 'No tienes permisos'})
};
proyecto.nombre = req.body.nombre || proyecto.nombre;
proyecto.descripcion= req.body.descripcion || proyecto.descripcion;
proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
proyecto.cliente = req.body.cliente || proyecto.cliente
try {
  const proyectoAlmacenado = await proyecto.save()
  res.json(proyectoAlmacenado);
  
} catch (error) {
  console.log(error)
}
};

const eliminarProyecto = async (req, res) =>{
  const {id} = req.params;

  const validar = mongoose.Types.ObjectId.isValid(id)
  if(!validar){
    const error = new Error ('Proyecto no existe')
    return res.status(404).json({msg:error.message})
  }
  const proyecto = await Proyecto.findById(id);
  if(!proyecto) {

    res.status(404).json({msg: 'El proyecto que estas buscando no existe'}); 
  };
  if(proyecto.creador.toString() !== req.usuario._id.toString()){
    res.status(403).json({msg: 'No tienes permisos'})
};

try {
  await proyecto.deleteOne();
  res.json({msg:"El Proyecto "+ proyecto.nombre + " Eliminado"})
} catch (error) {
  console.log(error)
}

};
const agregarColaborador = async (req, res) =>{
    
};
const eliminarColaborador = async (req, res) =>{
    
};

export{
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
   
}