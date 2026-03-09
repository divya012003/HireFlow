import React from 'react'
import { useContext } from 'react'
import  AuthContext  from '../context/AuthContext'
import { Navigate , Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

    const {token,loading} = useContext(AuthContext)

    if(loading) return null

    if(!token) {
        return <Navigate to="/"/>
    }
  return <Outlet/>
}

export default ProtectedRoute
