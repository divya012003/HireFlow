import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"

const Register = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()  // 🔥 VERY IMPORTANT
    console.log(api.defaults.baseURL)

    try {
      const res = await api.post("/register", form)
      console.log(res.data)

      alert("Registered successfully")
      navigate("/")  // go to login

    } catch (err) {
      console.log(err.response?.data)
      alert("Registration failed")
    }
  }

  return (
    <AuthLayout>
      <h2 className='text-2xl font-bold text-center mb-6'>
        Create Account
      </h2>
     
      

      <form onSubmit={handleSubmit} className='space-y-4'>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder='Enter your name'
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder='Enter your email'
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder='Enter your password'
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Register
        </button>

      </form>

      <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <Link to="/" className='text-green-500 font-medium'>
          Login
        </Link>
      </p>

    </AuthLayout>
  )
}

export default Register