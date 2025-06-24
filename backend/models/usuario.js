import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const usuarioSchema = mongoose.Schema({
    nombre:{
        type:String,//tipo de datos
        required:true,//requerido
        trim:true//elimina espacios
    },
    password:{
        type:String,//tipo de datos
        required:true,//requerido
        trim:true//elimina espacios

    },
    email:{
        type:String,//tipo de datos
        required:true,//requerido
        trim:true,//elimina espacios
        unique:true,//verifica que el dato no se haya registrado anteriormente
    },
    token:{
        type:String,//tipo de datos
    },
    confirmado:{
        type:Boolean,//tipo de datos
        default:false,
    },
},
{
    timestamps:true,
});
usuarioSchema.pre('save', async function(next){//hashea la password
  if(!this.isModified('password')){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
}
const Usuario = mongoose.model("Usuario",usuarioSchema);
export default Usuario;