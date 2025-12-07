import React from 'react'
import { Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';

function AuthProtected({children}) {
    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate to={<Login />} />
    }
    return children;
}

export default AuthProtected
