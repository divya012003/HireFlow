import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import { Link } from "react-router-dom"
import { loginUser } from '../services/authServices'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Login = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const { login } = useContext(AuthContext)

  function handleChange(e) {

    const { name, value } = e.target

    setForm({
      ...form, [name]: value
    })
  }

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const data = await loginUser(form)
      login(data.token)

      // localStorage.setItem("token", data.token)

      navigate("/dashboard")
    } catch (err) {
      alert("Login Failed")
    }
  }





  return (
    <AuthLayout>
      <h2 className='text-2xl font-bold text-center mb-6'>Login to HireFlow</h2>

      <div className='space-y-4'>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder='Enter your email'
          className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' id="" />


        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder='Enter your password'
          className='w-full border  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' id="" />


        <button onClick={handleSubmit}
          className='w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition'>
          Login
        </button>
        <Link to="/forgot-password" className="text-blue-500 text-sm">
          Forgot Password?
        </Link>

      </div>

      <p className='text-center text-sm mt-6'>Don't have an account?{" "}
        <Link to="/register" className="text-green-500 font-medium">Register</Link>
      </p>
    </AuthLayout>
  )
}

export default Login
