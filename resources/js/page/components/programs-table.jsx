
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
  LinearProgress,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material"
import { Search, FilterList, MoreVert, Edit, Delete, Visibility, Add } from "@mui/icons-material"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getPrograms, deleteProgram } from "../lib/programs"
import { EditProgramModal } from "./edit-program-modal"
import { AddProgramModal } from "./add-program-modal"

export function ProgramsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const queryClient = useQueryClient()

    const [isProgramModalOpen, setIsProgramModalOpen] = useState(false)


  const { data: programs = [], isLoading, isError, error } = useQuery(
    ['programs', { search: searchTerm }],
    () => getPrograms({ search: searchTerm, limit: 100 }),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )

  // Delete program mutation
  const deleteMutation = useMutation(deleteProgram, {
    onSuccess: () => {
      queryClient.invalidateQueries('programs')
      setSnackbar({ open: true, message: "Program deleted successfully", severity: "success" })
    },
    onError: (error) => {
      setSnackbar({ open: true, message: error.message, severity: "error" })
    }
  })

  const getStatusChip = (status) => {
    switch (status) {
      case "active":
        return <Chip label="Active" color="success" size="small" />
      case "inactive":
        return <Chip label="Inactive" color="default" size="small" />
      case "completed":
        return <Chip label="Completed" color="primary" size="small" />
      case "cancelled":
        return <Chip label="Cancelled" color="error" size="small" />
      default:
        return <Chip label={status} variant="outlined" size="small" />
    }
  }

  const handleMenuClick = (event, program) => {
    setAnchorEl(event.currentTarget)
    setSelectedProgram(program)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedProgram(null)
  }

  const handleDelete = async () => {
    if (selectedProgram) {
      try {
        await deleteMutation.mutateAsync(selectedProgram.id)
      } catch (error) {
        console.error("Error deleting program:", error)
      }
    }
    handleMenuClose()
  }

  const handleView = () => {
  
    console.log("View program:", selectedProgram)
    handleMenuClose()
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setEditModalOpen(true)
    
    
    handleMenuClose()
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
          <Alert severity="error">Error loading programs: {error.message}</Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" component="h2" fontWeight="bold">
                  Programs Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setIsProgramModalOpen(true)}
                  sx={{ px: 3, py: 1 }}
                >
                  Add Program
                </Button>
              </Box>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={<Typography variant="h6">Programs</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Manage your educational programs
            </Typography>
          }
          action={
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 250 }}
              />
              <Button variant="outlined" size="small" startIcon={<FilterList />}>
                Filter
              </Button>
            </Box>
          }
        /> 
        
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Program</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Enrollments</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {programs.map((program) => (
                  <TableRow key={program.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {program.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Starts {new Date(program.startDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{program.category}</TableCell>
                    <TableCell>{program.level}</TableCell>
                    <TableCell>{program.duration}</TableCell>
                    <TableCell>${program.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2">
                          {program.currentEnrollments}/{program.maxStudents}
                        </Typography>
                        <Box sx={{ width: 60 }}>
                          <LinearProgress
                            variant="determinate"
                            value={(program.currentEnrollments / program.maxStudents) * 100}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{getStatusChip(program.status)}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, program)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleView}>
              <Visibility sx={{ mr: 1 }} fontSize="small" />
              View
            </MenuItem>
            <MenuItem onClick={(e)=>handleEdit(e)}>
              <Edit sx={{ mr: 1 }} fontSize="small" />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "error.main" }} disabled={deleteMutation.isLoading}>
              <Delete sx={{ mr: 1 }} fontSize="small" />
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </MenuItem>
          </Menu>
        </CardContent>
       
      </Card>

      <EditProgramModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        program={selectedProgram}
      />

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
       <AddProgramModal open={isProgramModalOpen} onOpenChange={setIsProgramModalOpen} />
    </>
  )
}