import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.put(`/reset-password/${token}`, {
        password
      })

      alert("Password reset successful")
      navigate("/")

    } catch (err) {
      alert("Invalid or expired token")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ResetPassword