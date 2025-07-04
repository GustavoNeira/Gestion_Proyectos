
import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import axios from 'axios'

const Registrar = () => {
  const [nombre,setNombre]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [repetirPassword,setRepetirPassword]=useState('')
  const [alerta,setAlerta]=useState({})

  const handleSubmit = async e =>{
    e.preventDefault();
    if([nombre,email,password,repetirPassword].includes('')){
      setAlerta({msg:"Todos los campos son obligatorios",
      error:true
    })
      return
    }

    if(password !== repetirPassword){
      setAlerta({msg:"Los password no son iguales",
      error:true
    })
      return
    }
    if(password.length < 6){
      setAlerta({msg:"Ingresa un Password con minimo 6 caracteres",
      error:true
    })
      return
    }
    
    setAlerta({})
    // Crear usuario via API
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,{nombre, email, password})
      setAlerta({
        msg:data.msg,
        error:false
      })
      setNombre("")
      setEmail("")
      setPassword("")
      setRepetirPassword("")
    } catch (error) {
      setAlerta({
       msg:error.response.data.msg,
       error:true
      })
    }




  }
  const {msg}=alerta
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Crea Tu Cuenta y Administra tus {' '}
    <span className="text-slate-700">Proyectos</span>
    </h1>
    {msg && <Alerta alerta={alerta}/>}

    <form className="my-10 bg-white shadow rounded-lg p-10"
    onSubmit={handleSubmit}
    
    >
     <div className="my-5">
        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
        <input 
        id="nombre"
        type="text"
        placeholder="Ingrese su Nombre"
        className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        />
      </div>
      <div className="my-5">
        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
        <input 
        id="email"
        type="email"
        placeholder="Ingrese su Email"
        className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="my-5">
        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="pass">Password</label>
        <input 
        id="pass"
        type="password"
        placeholder="Ingrese su Password"
        className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="my-5">
        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="pass2">Repetir Password</label>
        <input 
        id="pass2"
        type="password"
        placeholder="Repita su Password"
        className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={repetirPassword}
        onChange={e => setRepetirPassword(e.target.value)}
        />
      </div>
      <input
      type="submit"
      value="Crear Cuenta"
      className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </form>
    <nav className="lg:flex lg:justify-between">
      <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'
      >¿Ya tienes una cuenta? Inicia Sesión</Link>


<Link to="/olvide-password" className='block text-center my-5 text-slate-500 uppercase text-sm'
      >Olvide Mi Password</Link>


    </nav>
    </>
  )
}

export default Registrar