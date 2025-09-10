import axiosClient from "../pages/api/axios-client"

const extractData = (response) => {
  if (response.data && response.data.success && response.data.data !== undefined) {
    return response.data.data
  }
  if (response.data) {
    return response.data
  }
  return response
}

const ensureArray = (data) => {
  return Array.isArray(data) ? data : []
}

export const getDashboardStats = async () => {
  try {
    const response = await axiosClient.get("/dashboard/stats")
    const data = extractData(response)
    console.log("Dashboard stats response:", data) 
    return data
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw error
  }
}

export const getUserGrowth = async () => {
  try {
    const response = await axiosClient.get("/dashboard/user-growth")
    const data = extractData(response)
    console.log("User growth response:", data)
    return ensureArray(data)
  } catch (error) {
    console.error("Error fetching user growth:", error)
    return [] 
  }
}

export const getCoursePopularity = async () => {
  try {
    const response = await axiosClient.get("/dashboard/course-popularity")
    const data = extractData(response)
    console.log("Course popularity response:", data)
    return ensureArray(data)
  } catch (error) {
    console.error("Error fetching course popularity:", error)
    return [] 
  }
}

export const getRevenue = async () => {
  try {
    const response = await axiosClient.get("/dashboard/revenue")
    const data = extractData(response)
    console.log("Revenue response:", data)
    return ensureArray(data)
  } catch (error) {
    console.error("Error fetching revenue data:", error)
    return [] 
  }
}

export const getRecentActivity = async () => {
  try {
    const response = await axiosClient.get("/dashboard/recent-activity")
    const data = extractData(response)
    console.log("Recent activity response:", data)
    return ensureArray(data)
  } catch (error) {
    console.error("Error fetching recent activity:", error)
    return [] 
  }
}

export const getEnrollmentsByCategory = async () => {
  try {
    const response = await axiosClient.get("/dashboard/enrollments-by-category")
    const data = extractData(response)
    console.log("Enrollments by category response:", data)
    return ensureArray(data)
  } catch (error) {
    console.error("Error fetching enrollments by category:", error)
    return [] 
  }
}

export const getAllDashboardData = async () => {
  try {
    const [stats, userGrowth, coursePopularity, revenue, recentActivity, enrollmentsByCategory] = await Promise.all([
      getDashboardStats(),
      getUserGrowth(),
      getCoursePopularity(),
      getRevenue(),
      getRecentActivity(),
      getEnrollmentsByCategory(),
    ])

    return {
      stats,
      userGrowth,
      coursePopularity,
      revenue,
      recentActivity,
      enrollmentsByCategory,
    }
  } catch (error) {
    console.error("Error fetching all dashboard data:", error)
    throw error
  }
}
