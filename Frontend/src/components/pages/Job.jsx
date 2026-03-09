import { useEffect, useState } from "react"
import { getJobs, createJob, deleteJob, updateJob, uploadResume } from "../services/jobServices"

const Job = () => {

  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({
    company: "",
    title: "",
    location: ""
  })
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState("")
  const [status, setStatus] = useState("All")
  const [totalPages, setTotalPages] = useState(1)
  const [editingJob, setEditingJob] = useState(null)

  const fetchJobs = async () => {
    const data = await getJobs(status, keyword, page)
    setJobs(data.jobs)
    setTotalPages(data.totalPages)
  }

  useEffect(() => {
    fetchJobs()
  }, [page])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createJob(form)
    setForm({ company: "", title: "", location: "" })
    fetchJobs()
  }

  const handleDelete = async (id) => {
    await deleteJob(id)
    fetchJobs()
  }
  const handleUpdate = async () => {

    await updateJob(editingJob._id, editingJob)

    setEditingJob(null)

    fetchJobs()

  }
  const handleUpload = async (e, id) => {
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append("resume", file)

    await uploadResume(id, formData)

    fetchJobs()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-600"
      case "Interview":
        return "bg-yellow-100 text-yellow-600"
      case "Rejected":
        return "bg-red-100 text-red-600"
      case "Offer":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const handleStatusChange = async (id, status) => {
    await updateJob(id, { status })

    fetchJobs()
  }

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">Job Tracker</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Job
        </button>

      </form>

      {editingJob && (

        <div className="border p-4 mb-6 bg-gray-50 rounded">

          <h2 className="font-bold mb-3">Edit Job</h2>

          <input
            value={editingJob.company}
            onChange={(e) => setEditingJob({
              ...editingJob,
              company: e.target.value
            })}
            className="border p-2 w-full mb-2"
          />

          <input
            value={editingJob.title}
            onChange={(e) => setEditingJob({
              ...editingJob,
              title: e.target.value
            })}
            className="border p-2 w-full mb-2"
          />

          <input
            value={editingJob.location}
            onChange={(e) => setEditingJob({
              ...editingJob,
              location: e.target.value
            })}
            className="border p-2 w-full mb-2"
          />

          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update Job
          </button>

        </div>

      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded shadow">

            <h3 className="font-bold">{job.company}</h3>

            <p className="text-gray-500">{job.location}</p>

            <input
              type="file"
              onChange={(e) => handleUpload(e, job._id)}
              className="mt-2"
            />
            <select
              value={job.status}
              onChange={(e) => handleStatusChange(job._id, e.target.value)}
              className="border px-2 py-1 rounded mt-2"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select><br />


            <button
              onClick={() => setEditingJob(job)}
              className="text-blue-500 mr-3"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(job._id)}
              className="text-red-500"
            >
              Delete
            </button>
            

          </div>
        ))}

      </div>

      <div className="flex gap-2 mt-6">

        {[...Array(totalPages)].map((_, i) => (

          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border ${page === i + 1 ? "bg-green-500 text-white" : ""
              }`}
          >
            {i + 1}
          </button>

        ))}

      </div>

    </div>
  )
}

export default Job