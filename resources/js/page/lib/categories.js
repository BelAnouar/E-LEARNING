
import axiosClient from "../pages/api/axios-client"

export const getCategories = async (params = {}) => {
  try {
    const response = await axiosClient.get("/categories", { params })
    const { data } = await response
   
    return data
  } catch (error) {
    throw new Error("Failed to fetch categories")
  }
}

export const getCategory = async (id) => {
  try {
    const response = await axiosClient.get(`/categories/${id}`)
    const { data } = await response.data
    console.log(data)
    return data
  } catch (error) {
    throw new Error("Failed to fetch category")
  }
}

export const addCategory = async (formData) => {
  try {
    const response = await axiosClient.post("/categories", formData)
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Failed to add category")
  }
}

export const updateCategory = async (id, formData) => {
  try {
    console.log(`Updating category with ID: ${id}`, formData);
    
    const response = await axiosClient.put(`/categories/${id}`, formData)
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Failed to update category")
  }
}

export const deleteCategory = async (id) => {
  try {
    const response = await axiosClient.delete(`/categories/${id}`)
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Failed to delete category")
  }
}

export const getPopularCategories = async (limit = 10) => {
  try {
    const response = await axiosClient.get("/categories/popular", { params: { limit } })
    const { data } = await response.data
    console.log(data)
    return data
  } catch (error) {
    throw new Error("Failed to fetch popular categories")
  }
}

export const getCategoriesWithPrograms = async (params = {}) => {
  try {
    const response = await axiosClient.get("/categories/with-programs", { params })
    const { data } = await response.data
    console.log(data)
    return data
  } catch (error) {
    throw new Error("Failed to fetch categories with programs")
  }
}

export const getCategoryStatistics = async () => {
  try {
    const response = await axiosClient.get("/categories/statistics")
    const { data } = await response.data
    console.log(data)
    return data
  } catch (error) {
    throw new Error("Failed to fetch category statistics")
  }
}