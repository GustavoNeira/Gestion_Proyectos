const generarId = ()=>{

    const random = Math.random().toString(32).substring(2);//crea un numero aleatorio y le da formato
    const fecha = Date.now().toString(32); //crea otro valor aleatorio

    return random+fecha;

}
export default generarId;