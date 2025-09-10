
import axiosClient from "../pages/api/axios-client"

export const getApplications = async (params = {}) => {
  try {
    
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => 
        value !== '' && value !== null && value !== undefined
      )
    )
    
    const response = await axiosClient.get("/applications", { params: cleanParams })
    const { data } = await response
    console.log(data)
    return data
  } catch (error) {
    throw new Error("Failed to fetch applications")
  }
}

export const getApplication = async (id) => {
  try {
    const response = await axiosClient.get(`/applications/${id}`)
    const { data } = await response.data
    console.log(data)
    return data
  } catch (error) {
    throw new Error("Failed to fetch application")
  }
}

export const addApplication = async (formData) => {
  try {
    const response = await axiosClient.post("/applications", formData)
    console.log(response)
    return response.data
  } catch (error) {
    if (error.response?.data?.details) {
      const errorMessages = Object.values(error.response.data.details).flat().join(', ')
      throw new Error(errorMessages)
    }
    throw new Error("Failed to add application")
  }
}

export const updateApplication = async (id, formData) => {
  try {
    console.log(`Updating application with ID: ${id}`, formData);
    
    const response = await axiosClient.put(`/applications/${id}`, formData)
    console.log(response)
    return response.data
  } catch (error) {
    if (error.response?.data?.details) {
      const errorMessages = Object.values(error.response.data.details).flat().join(', ')
      throw new Error(errorMessages)
    }
    throw new Error("Failed to update application")
  }
}

export const deleteApplication = async (id) => {
  try {
    const response = await axiosClient.delete(`/applications/${id}`)
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Failed to delete application")
  }
}

export const approveApplication = async (id) => {
  try {
    const response = await axiosClient.put(`/applications/${id}/approve`)
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Failed to approve application")
  }
}

export const rejectApplication = async (id) => {
  try {
    const response = await axiosClient.put(`/applications/${id}/reject`)
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Failed to reject application")
  }
}

export const getApplicationStatistics = async () => {
  try {
    const response = await axiosClient.get("/applications/statistics")
    const { data } = await response.data
    console.log(data)
    return data
  } catch (error) {
    throw new Error("Failed to fetch application statistics")
  }
}