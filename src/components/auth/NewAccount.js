import React,{useState, useContext, useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/autentication/authContext';

const NewAccount = () => {
    let navigate = useNavigate();

    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext;

    const authContext = useContext(AuthContext);
    const { userRegistration, msg, authenticated  } = authContext;

    // if user is already authenticated or a duplicated record.
    useEffect(()=>{
        if(authenticated){
            navigate('/projects');
        }
        if(msg){
            showAlert(msg.msg,'alerta-error')
        }
    },[ msg, authenticated ])


    // State to login.
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        confirm:''
    });

    // Destructuring user.
    const {name,email, password,confirm} = user;

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
        if(
            name.trim()==='' ||
            email.trim()==='' ||
            password.trim()==='' ||
            confirm.trim()==='' 
            ) {
                showAlert('All fileds required','alerta-error');
                return
            }

        // Password minimo de 6 caracteres.
        if(password.length < 6) {
            showAlert('The password must contain at least 6 characters','alerta-error')
            return
        }

        // Los 2 password son iguales.
        if(password!==confirm) {
            showAlert("Passwords doesn't match",'alerta-error')
            return
        }

        // throwing to action.
        userRegistration({
            name,
            email,
            password
        })
        
    }

  return (
    <div className='form-usuario'>
        {alert ? (<div className={`alerta ${alert.category}`}> {alert.msg} </div>) : null}
        <div className="contenedor-form sombra-dark">
            <h1>Get a new account</h1>
            <form onSubmit={handleSubmit}>
                <div className="campo-form">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        placeholder='Your name'
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Your Email'
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
                        placeholder='Your Password'
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="confirmar">Password confirm</label>
                    <input 
                        type="password"
                        id="confirm"
                        name="confirm"
                        placeholder='Repeat your Password'
                        value={confirm}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo-form">
                    <input type='submit' className='btn btn-primario btn-block' value="Register"/>
                </div>
            </form>
            <Link to={'/'} className='enlace-cuenta'>
                Back to loggin
            </Link>
        </div>
    </div>
  )
}

export default NewAccount
