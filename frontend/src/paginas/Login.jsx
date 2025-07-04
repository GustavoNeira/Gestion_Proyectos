import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia Sesión y Administra tus {' '}
    <span className="text-slate-700">Proyectos</span>
    </h1>

    <form className="my-10 bg-white shadow rounded-lg p-10">
      <div className="my-5">
        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
        <input 
        id="email"
        type="email"
        placeholder="Ingrese su Email"
        className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />
      </div>
      <div className="my-5">
        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="pass">Password</label>
        <input 
        id="pass"
        type="password"
        placeholder="Ingrese su Password"
        className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />
      </div>
      <input
      type="submit"
      value="Iniciar Sesión"
      className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </form>
    <nav className="lg:flex lg:justify-between">
      <Link to="registrar" className='block text-center my-5 text-slate-500 uppercase text-sm'
      >¿No tienes una cuenta? Registrate</Link>


<Link to="olvide-password" className='block text-center my-5 text-slate-500 uppercase text-sm'
      >Olvide Mi Password</Link>


    </nav>
    </>
  )
}

export default Login