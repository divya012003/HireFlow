import { useEffect, useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import { getJobs, createJob, deleteJob, } from "../services/jobServices"

const Dashboard = () => {
  // const [response, setResponse] = useState("")
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])
  const [status, setStatus] = useState("All")
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()

  const fetchJobs = async () => {
    const data = await getJobs(status, keyword)
    setJobs(data.jobs)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const total = jobs.length
  const applied = jobs.filter(j => j.status === "Applied").length
  const interview = jobs.filter(j => j.status === "Interview").length
  const offer = jobs.filter(j => j.status === "Offer").length

  const testProtectedRoute = async () => {
    try {
      console.log("Test button clicked")
      const res = await api.get("/profile")
      // setResponse(res.data.message)
      setUser(res.data)
    } catch (err) {
      // setResponse("Request failed")
      setUser("request failed")
    }
  }

  const handleLogout = () => {

    localStorage.removeItem("token")
    navigate("/")

  }



  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Dashboard</h1>

      <div>
        <h1 className="text-3xl font-semibold mb-4">Welcome to HireFlow </h1>
        <p className="text-gray-600">Track your Job application</p>
      </div>

      <button
        onClick={testProtectedRoute}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Test Protected API
      </button>

      {/* <p>{response}</p> */}


      {user && (
        <div>
          <p>Name:{user.name}</p>
          <p>Email:{user.email}</p>
          <p>Role:{user.role}</p>
        </div>
      )}

      {user?.role === "admin" && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Admin Panel
        </button>
      )}

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>


      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">

        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-lg font-semibold">Total Jobs</h2>
          <p className="text-2xl">{total}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-lg font-semibold">Applied</h2>
          <p className="text-2xl">{applied}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded">
          <h2 className="text-lg font-semibold">Interview</h2>
          <p className="text-2xl">{interview}</p>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-lg font-semibold">Offer</h2>
          <p className="text-2xl">{offer}</p>
        </div>

      </div>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search company or title"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2"
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={fetchJobs}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>

      </div>

      {/* Recent Jobs */}

      <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  flex items-center justify-center">

        {jobs.length === 0 ? (
          <div className="text-gray-500  ">No jobs</div>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{job.company}</h3>
              <p>{job.title}</p>
              <p className="text-gray-500">{job.location}</p>

              <button
                onClick={() => handleDelete(job._id)}
                className="text-red-500 mt-2"
              >
                Delete
              </button>
            </div>
          ))
        )}

      </div>






    </div>
  )
}

export default Dashboard