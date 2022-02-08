import React,{useState} from 'react'
import {Link} from 'react-router-dom';

const NewAccount = () => {

    // State to login.
    const [user, setUser] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    });

    // Destructuring user.
    const {nombre,email, password,confirmar} = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // when users submit
    const handleSubmit = e => {
        e.preventDefault();

        // Validating: No empty fields.

        // Password minimo de 6 caracteres.

        // Los 2 password son iguales.

        // throwing to action.
    }

  return (
    <div className='form-usuario'>
        <div className="contenedor-form sombra-dark">
            <h1>Obtener una cuenta</h1>
            <form onSubmit={handleSubmit}>
                <div className="campo-form">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder='Tu nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Tu Email'
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Tu Password'
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="confirmar">Confirmar Password</label>
                    <input 
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        placeholder='Repite tu Password'
                        value={confirmar}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo-form">
                    <input type='submit' className='btn btn-primario btn-block' value="Registrar"/>
                </div>
            </form>
            <Link to={'/'} className='enlace-cuenta'>
                volver a iniciar sesion
            </Link>
        </div>
    </div>
  )
}

export default NewAccount
