"use client"

import { useQuery, useQueryClient } from "react-query"
import {
  getDashboardStats,
  getUserGrowth,
  getCoursePopularity,
  getRevenue,
  getRecentActivity,
  getEnrollmentsByCategory,
} from "../../lib/dashboard"

const StatisticsDashboard = () => {
  const queryClient = useQueryClient()

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    error: statsErrorMessage,
  } = useQuery("dashboardStats", getDashboardStats, {
    refetchInterval: 30000,
    staleTime: 10000,
    retry: 3,
    onError: (error) => {
      console.error("Dashboard stats error:", error)
    },
  })
  console.log("Dashboard stats data:", stats) 



  const { data: recentActivityData = [], isLoading: activityLoading } = useQuery("recentActivity", getRecentActivity, {
    refetchInterval: 15000,
    retry: 3,
    onError: (error) => {
      console.error("Recent activity error:", error)
    },
  })

  

  
  const handleRefresh = async () => {
    await queryClient.invalidateQueries("dashboardStats")
   
  }


  if (statsLoading) {
    return (
      <div className="statistics-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    )
  }


  if (statsError) {
    return (
      <div className="statistics-dashboard">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Dashboard</h3>
          <p>{statsErrorMessage?.message || "Failed to load dashboard data"}</p>
          <button onClick={handleRefresh} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const StatCard = ({ title, value, icon, trend, trendValue, color = "blue", loading = false }) => (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-header">
        <div className="stat-icon">
          <span>{icon}</span>
        </div>
        <div className="stat-trend">
          {trend && trendValue && (
            <span className={`trend ${trend}`}>
              {trend === "up" ? "↗️" : "↘️"} {trendValue}%
            </span>
          )}
        </div>
      </div>
      <div className="stat-content">
        <h3 className="stat-value">
          {loading ? (
            <div className="loading-skeleton"></div>
          ) : typeof value === "number" && value > 1000 ? (
            value.toLocaleString()
          ) : (
            value
          )}
        </h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  )



  return (
    <div className="statistics-dashboard">
   
      <div className="dashboard-header">
        <h2>Dashboard Statistics</h2>
        <button onClick={handleRefresh} className="btn btn-refresh">
          🔄 Refresh
        </button>
      </div>

    
   <div className="stats-grid">

  <StatCard
    title="Total Users"
    value={stats?.totalUsers || 0}
    icon="👥"
    trend={stats?.trends?.users || "up"}
    trendValue={stats?.userGrowthPercentage || 0}
    color="blue"
    loading={statsLoading}
  />

  <StatCard
    title="Total Courses"
    value={stats?.totalCourses || 0}
    icon="📚"
    trend="up"
    trendValue="8"
    color="green"
    loading={statsLoading}
  />


  <StatCard
    title="Total Enrollments"
    value={stats?.totalEnrollments || 0}
    icon="🎓"
    trend="up"
    trendValue="15"
    color="purple"
    loading={statsLoading}
  />

 
  <StatCard
    title="Total Revenue"
    value={stats?.totalRevenue ? `$${stats.totalRevenue.toLocaleString()}` : "$0"}
    icon="💰"
    trend={stats?.trends?.revenue || "up"}
    trendValue="23"
    color="orange"
    loading={statsLoading}
  />

  <StatCard
    title="Active Users"
    value={stats?.activeUsers || 0}
    icon="🟢"
    trend="up"
    trendValue="5"
    color="teal"
    loading={statsLoading}
  />

  <StatCard
    title="Completed Courses"
    value={stats?.completedCourses || 0}
    icon="✅"
    trend="up"
    trendValue="18"
    color="indigo"
    loading={statsLoading}
  />


  <StatCard
    title="Pending Payments"
    value={stats?.pendingPayments || 0}
    icon="⏳"
    trend="down"
    trendValue="3"
    color="red"
    loading={statsLoading}
  />


  <StatCard
    title="Total Files"
    value={stats?.totalFiles || 0}
    icon="📁"
    trend="up"
    trendValue="7"
    color="gray"
    loading={statsLoading}
  />
</div>
    



      <div className="recent-activity">
        <div className="activity-header">
          <h3>Recent Activity</h3>
          {activityLoading && <div className="activity-loading">Loading...</div>}
        </div>
        <div className="activity-list">
          {activityLoading ? (
           
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="activity-item loading">
                <div className="activity-icon loading-skeleton"></div>
                <div className="activity-content">
                  <div className="loading-skeleton" style={{ width: "70%", height: "16px" }}></div>
                  <div className="loading-skeleton" style={{ width: "40%", height: "12px", marginTop: "4px" }}></div>
                </div>
              </div>
            ))
          ) : Array.isArray(recentActivityData) && recentActivityData.length > 0 ? (
            recentActivityData.map((activity, index) => (
              <div key={activity.id || index} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <p>No recent activity</p>
                <span className="activity-time">Check back later</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatisticsDashboard