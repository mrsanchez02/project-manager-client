import React,{ useState, useContext, useEffect } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/autentication/authContext';

const Login = () => {
    
    let navigate = useNavigate();

    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext;

    const authContext = useContext(AuthContext);
    const { userLogin, msg, authenticated  } = authContext;

    // if user is already authenticated or a duplicated record.
    useEffect(()=>{
        if(authenticated){
            navigate('/projects')
        }
        if(msg){
            showAlert(msg.msg,'alerta-error')
        }
    },[ msg, authenticated, navigate ])

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
        if(email.trim()===''|| password.trim()===''){
            showAlert('All fields are required','alerta-error');
            return
        }

        // To action.
        userLogin(user);
    }

  return (
    <div className='form-usuario'>
        {alert ? (<div className={`alerta ${alert.category}`}> {alert.msg} </div>) : null}
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
