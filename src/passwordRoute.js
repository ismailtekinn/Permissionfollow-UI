import React from 'react'
import { useAuth } from './Context/AuthContext';
import { Navigate } from 'react-router-dom';

function PasswordRoute({component:Component}) {
    const {loggedIn} = useAuth();

    if(loggedIn) return <Component/>
    
  return <Navigate to="/new-password" />
}

export default PasswordRoute
