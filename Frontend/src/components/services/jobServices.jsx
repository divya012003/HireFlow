import api from "./api"

export const getJobs = async (status,keyword,page) => {
  const res = await api.get(`/jobs?status=${status}&keyword=${keyword}&page=${page}`)
  return res.data
}

export const createJob = async (jobData) => {
  const res = await api.post("/jobs", jobData)
  return res.data
}

export const deleteJob = async (id) => {
  const res = await api.delete(`/jobs/${id}`)
  return res.data
}

export const updateJob = async (id,data)=>{
    const res = await api.put(`/jobs/${id}`,data)
    return res.data
  }

  export const uploadResume = async (id,formData)=>{
    const res = await api.post(`/jobs/${id}/upload-resume`,formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
  
    return res.data
  }