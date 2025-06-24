import nodemailer from 'nodemailer'

export const emailRegistro = async (datos)=> {
    const {email,nombre,token} = datos;
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5350fe2d2100d1",
          pass: "2f2086d9e1594c"
        }
      });
      //Informacion del email
      const informacion = await transport.sendMail({
        from: '"Tu-Du Proyect - Administrador de Proyectos" <cuentas@TuDu.com>',
        to:email,
        subject:"Tu-Du - Confirma tu Cuenta",
        text:"Confirma tu Cuenta en Tu-Du Proyect",
        html:`<p>Hola: ${nombre} Por favor Confirma tu cuenta en Tu-Du Proyects y Administra tus Proyectos</p>
        <p>Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        
        </p>
        <p>Si tu no creaste esta cuenta, Puedes ignorar el mensaje</p>
        
        
        
        `
      })
}; 

export const emailOlvidePassword = async (datos)=> {
  const {email,nombre,token} = datos;

  //mover a variables de entorno .env 
  const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5350fe2d2100d1",
        pass: "2f2086d9e1594c"
      }
    });
    //Informacion del email
    const informacion = await transport.sendMail({
      from: '"Tu-Du Proyect - Administrador de Proyectos" <cuentas@TuDu.com>',
      to:email,
      subject:"Tu-Du - Reestablece tu Contraseña",
      text:"Reestablece tu Contraseña de Tu-Du Proyect",
      html:`<p>Hola: ${nombre} Has solicitado reestablecer tu contraseña en Tu-Du Proyects</p>
      <p>Haz click en el siguiente enlace para crear tu nueva Contraseña:
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contraseña</a>
     
      </p>
      <p>Si tu no solicitaste crear una nueva contraseña, Puedes ignorar el mensaje</p>
      
      
      
      `
    })
}; 