// applications-table.jsx (new component)
"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material"
import { Search, FilterList, MoreVert, Edit, Delete, Visibility, Check, Close } from "@mui/icons-material"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getApplications, deleteApplication, approveApplication, rejectApplication } from "../lib/applications"
import { getPrograms } from "../lib/programs"

export function ApplicationsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [programFilter, setProgramFilter] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [programs, setPrograms] = useState([])
  const queryClient = useQueryClient()

  // Fetch programs for filter dropdown
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsData = await getPrograms({ limit: 100 })
        setPrograms(programsData)
      } catch (error) {
        console.error("Error fetching programs:", error)
      }
    }

    fetchPrograms()
  }, [])

  // Build query params
  const queryParams = {
    search: searchTerm.trim() || undefined,
    status: statusFilter || undefined,
    programId: programFilter || undefined,
    includeProgram: true
  }

  // Fetch applications with react-query
  const { data: applications = [], isLoading, isError, error } = useQuery(
    ['applications', queryParams],
    () => getApplications(queryParams),
    {
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000, // 2 minutes
      retry: 1,
    }
  )

  // Delete application mutation
  const deleteMutation = useMutation(deleteApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries('applications')
      setSnackbar({ open: true, message: "Application deleted successfully", severity: "success" })
    },
    onError: (error) => {
      setSnackbar({ open: true, message: error.message, severity: "error" })
    }
  })

  // Approve application mutation
  const approveMutation = useMutation(approveApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries('applications')
      setSnackbar({ open: true, message: "Application approved successfully", severity: "success" })
    },
    onError: (error) => {
      setSnackbar({ open: true, message: error.message, severity: "error" })
    }
  })

  // Reject application mutation
  const rejectMutation = useMutation(rejectApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries('applications')
      setSnackbar({ open: true, message: "Application rejected successfully", severity: "success" })
    },
    onError: (error) => {
      setSnackbar({ open: true, message: error.message, severity: "error" })
    }
  })

  const getStatusChip = (status) => {
    switch (status) {
      case "pending":
        return <Chip label="Pending" color="warning" size="small" />
      case "approved":
        return <Chip label="Approved" color="success" size="small" />
      case "rejected":
        return <Chip label="Rejected" color="error" size="small" />
      default:
        return <Chip label={status} variant="outlined" size="small" />
    }
  }

  const handleMenuClick = (event, application) => {
    setAnchorEl(event.currentTarget)
    setSelectedApplication(application)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedApplication(null)
  }

  const handleDelete = async () => {
    if (selectedApplication) {
      try {
        await deleteMutation.mutateAsync(selectedApplication.id)
      } catch (error) {
        console.error("Error deleting application:", error)
      }
    }
    handleMenuClose()
  }

  const handleApprove = async () => {
    if (selectedApplication) {
      try {
        await approveMutation.mutateAsync(selectedApplication.id)
      } catch (error) {
        console.error("Error approving application:", error)
      }
    }
    handleMenuClose()
  }

  const handleReject = async () => {
    if (selectedApplication) {
      try {
        await rejectMutation.mutateAsync(selectedApplication.id)
      } catch (error) {
        console.error("Error rejecting application:", error)
      }
    }
    handleMenuClose()
  }

  const handleView = () => {
    // Implement view functionality
    console.log("View application:", selectedApplication)
    handleMenuClose()
  }

  const handleEdit = () => {
    // Implement edit functionality
    console.log("Edit application:", selectedApplication)
    handleMenuClose()
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("")
    setProgramFilter("")
  }

  if (isLoading) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Alert severity="error">
            Error loading applications: {error.message}
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h4" component="h2" fontWeight="bold">
              Applications Management
            </Typography>
          </Box>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={<Typography variant="h6">Applications</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Manage student applications
            </Typography>
          }
          action={
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: 'wrap' }}>
              <TextField
                size="small"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 200 }}
              />
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Program</InputLabel>
                <Select
                  value={programFilter}
                  label="Program"
                  onChange={(e) => setProgramFilter(e.target.value)}
                >
                  <MenuItem value="">All Programs</MenuItem>
                  {programs.map((program) => (
                    <MenuItem key={program.id} value={program.id}>
                      {program.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button variant="outlined" size="small" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </Box>
          }
        />
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Applied</TableCell>
                  <TableCell width={80}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {application.student_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {application.program?.title || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {application.student_email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {application.student_phone || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {getStatusChip(application.status)}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(application.created_at).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, application)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {applications.length === 0 && !isLoading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                {searchTerm || statusFilter || programFilter 
                  ? 'No applications found matching your filters.' 
                  : 'No applications available.'
                }
              </Typography>
            </Box>
          )}

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleView}>
              <Visibility sx={{ mr: 1 }} fontSize="small" />
              View Details
            </MenuItem>
            <MenuItem onClick={handleEdit}>
              <Edit sx={{ mr: 1 }} fontSize="small" />
              Edit
            </MenuItem>
            {selectedApplication?.status === 'pending' && (
              <>
                <MenuItem 
                  onClick={handleApprove} 
                  disabled={approveMutation.isLoading}
                >
                  <Check sx={{ mr: 1 }} fontSize="small" color="success" />
                  {approveMutation.isLoading ? "Approving..." : "Approve"}
                </MenuItem>
                <MenuItem 
                  onClick={handleReject} 
                  disabled={rejectMutation.isLoading}
                  sx={{ color: "error.main" }}
                >
                  <Close sx={{ mr: 1 }} fontSize="small" />
                  {rejectMutation.isLoading ? "Rejecting..." : "Reject"}
                </MenuItem>
              </>
            )}
            <MenuItem 
              onClick={handleDelete} 
              sx={{ color: "error.main" }} 
              disabled={deleteMutation.isLoading}
            >
              <Delete sx={{ mr: 1 }} fontSize="small" />
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </MenuItem>
          </Menu>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}