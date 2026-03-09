import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/routes/AppRoutes'
import {AuthProvider} from './components/context/AuthContext'
import Navbar from './components/pages/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
      <BrowserRouter>
   
        <AuthProvider>
        <Navbar/>
          <AppRoutes />
        </AuthProvider>
        
      </BrowserRouter>
      
    </>
  )
}

export default App
