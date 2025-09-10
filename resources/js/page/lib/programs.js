
import axiosClient from "../pages/api/axios-client"

export const getPrograms = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => 
        value !== '' && value !== null && value !== undefined
      )
    )
    
    const response = await axiosClient.get("/programs", { params: cleanParams })
    const { data } = await response
    console.log(response);
    
    console.log(data)
    return data
  } catch (error) {
    throw new Error("Failed to fetch programs")
  }
}

export const getProgram = async (id) => {
  try {
    const response = await axiosClient.get(`/programs/${id}`)
    const { data } = await response.data
    console.log(data)
    return data
  } catch (error) {
    throw new Error("Failed to fetch program")
  }
}

export const addProgram = async (formData) => {
  try {
    const response = await axiosClient.post("/programs", formData)
    console.log(response)
    return response.data
  } catch (error) {
    
    if (error.response?.data?.details) {
      const errorMessages = Object.values(error.response.data.details).flat().join(', ')
      throw new Error(errorMessages)
    }
    throw new Error("Failed to add program")
  }
}

export const updateProgram = async (id, formData) => {
  try {
    console.log(`Updating program with ID: ${id}`, formData);
    
    const response = await axiosClient.put(`/programs/${id}`, formData)
    console.log(response)
    return response.data
  } catch (error) {
    
    if (error.response?.data?.details) {
      const errorMessages = Object.values(error.response.data.details).flat().join(', ')
      throw new Error(errorMessages)
    }
    throw new Error("Failed to update program")
  }
}

export const deleteProgram = async (id) => {
  try {
    const response = await axiosClient.delete(`/programs/${id}`)
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Failed to delete program")
  }
}