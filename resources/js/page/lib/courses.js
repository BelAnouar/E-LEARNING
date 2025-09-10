import axiosClient from "../pages/api/axios-client"

export const getCourses = async () => {
  try {
    const response = await axiosClient.get("/cours")
    const { data } = await response.data
    console.log(data)
    return data
  } catch (error) {
    throw new Error("Failed to fetch courses")
  }
}

export const updateCourse = async (idCours, formData) => {
  try {
    console.log(`Updating course with ID: ${idCours}`, formData);
    
    const response = await axiosClient.put(`/cours/${idCours}`, formData)
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Failed to update course")
  }
}

export const addCourse = async (formData) => {
  try {
    const response = await axiosClient.post("/cours", formData)
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Failed to add course")
  }
}
