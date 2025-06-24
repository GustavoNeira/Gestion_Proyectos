import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const agregarTarea = async (req, res) => {
    const {proyecto} = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    

    if(!existeProyecto){
        const error = new Error("El Proyecto no Existe");
        return res.status(404).json({msg:error.message});
    }
    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes los permisos para crear Tareas en este Proyecto");
        return res.status(403).json({msg:error.message});
    }
    try {
        const tareaAlmacenada = await Tarea.create(req.body);
        res.json(tareaAlmacenada)
        
    } catch (error) {
        console.log(error)
    }
};

const obtenerTarea = async (req, res) => {
  const {id} = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");// populate se utiliza para cruzar informacion trae la informacion de la tarea y el proyecto
  if(!tarea){
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({msg:error.message}); 
  }
  if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
    const error = new Error("No eres el creador del proyecto");
    return res.status(403).json({msg:error.message});
  }
  res.json(tarea);

};

const actualizarTarea = async (req, res) => {
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto");// populate se utiliza para cruzar informacion trae la informacion de la tarea y el proyecto
    if(!tarea){
      const error = new Error("Tarea no encontrada");
      return res.status(404).json({msg:error.message}); 
    }
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
      const error = new Error("No eres el creador del proyecto");
      return res.status(403).json({msg:error.message});
    }
    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;
    tarea.fechaEntraga = req.body.fechaEntraga || tarea.fechaEntraga;

    try {
        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada);
    } catch (error) {
        console.log(error)
    }

};

const eliminarTarea = async (req, res) => {
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto");// populate se utiliza para cruzar informacion trae la informacion de la tarea y el proyecto
    if(!tarea){
      const error = new Error("Tarea no encontrada");
      return res.status(404).json({msg:error.message}); 
    }
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
      const error = new Error("No eres el creador del proyecto");
      return res.status(403).json({msg:error.message});
    }
    try {
        await tarea.deleteOne();
        res.json({msg:"Tarea Eliminada"});
    } catch (error) {
        console.log(error);
    }
};

const cambiarEstado = async (req, res) => {};

export{
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
};