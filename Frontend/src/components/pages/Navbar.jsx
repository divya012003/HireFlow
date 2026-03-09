import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const Navbar = () => {
  const { token, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        
        <h1 className="text-xl font-bold text-green-400">
          HireFlow
        </h1>

        <div className="flex gap-6 items-center">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="hover:text-blue-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-500 hover:bg-blue-600 px-4 py-1 rounded-md transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar