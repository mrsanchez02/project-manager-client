import React, { useContext, useEffect } from 'react'
import authContext from '../../context/autentication/authContext'

const Upperbar = () => {

  const AuthContext = useContext(authContext);
  const { user, authenticatedUser,userLogout } = AuthContext;

  useEffect(() => {
    authenticatedUser()
  }, [])


  return (
    <header className='app-header'>
      {user ? <p className="nombre-usuario">Hello, <span>{user.name}</span></p> : null }
      <nav className='nav-principal'>
          <button
            className='btn btn-blank cerrar-sesion'
            onClick={()=>userLogout()}
          >Log out</button>
      </nav>
    </header>
  )
}

export default Upperbar
