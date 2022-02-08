import React,{useState} from 'react'
import {Link} from 'react-router-dom';

const Login = () => {

    // State to login.
    const [user, setUser] = useState({
        email:'',
        password:''
    });

    // Destructuring user.
    const {email, password} = user;

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


        // throwing to action.
    }

  return (
    <div className='form-usuario'>
        <div className="contenedor-form sombra-dark">
            <h1>Iniciar Sesion</h1>
            <form onSubmit={handleSubmit}>
                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Tu Email'
                        onChange={handleChange}
                        value={email}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Tu Password'
                        onChange={handleChange}
                        value={password}
                    />
                </div>
                <div className="campo-form">
                    <input type='submit' className='btn btn-primario btn-block' value="Iniciar Sesion"/>
                </div>
            </form>
            <Link to={'/new-account'} className='enlace-cuenta'>
                Obtener cuenta
            </Link>
        </div>
    </div>
  )
}

export default Login
