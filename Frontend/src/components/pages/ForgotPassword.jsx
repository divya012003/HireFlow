import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await api.post("/forgot-password", { email })

      const token = res.data.resetToken   // since you're returning it

      alert("Reset token generated")
      navigate(`/reset-password/${token}`)

    } catch (err) {
      alert("User not found")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword