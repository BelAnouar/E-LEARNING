
"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material"
import { useMutation, useQueryClient } from "react-query"
import { updateApplication } from "../lib/applications"
import { getPrograms } from "../lib/programs"

export function EditApplicationModal({ open, onClose, application }) {
  const [error, setError] = useState("")
  const [programs, setPrograms] = useState([])
  const [formData, setFormData] = useState({
    programId: "",
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    message: "",
    status: "pending",
  })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (application && open) {
      setFormData({
        programId: application.program_id?.toString() || "",
        studentName: application.student_name || "",
        studentEmail: application.student_email || "",
        studentPhone: application.student_phone || "",
        message: application.message || "",
        status: application.status || "pending",
      })
    }
  }, [application, open])


  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsData = await getPrograms({ limit: 100 })
        setPrograms(programsData)
      } catch (error) {
        console.error("Error fetching programs:", error)
      }
    }

    if (open) {
      fetchPrograms()
    }
  }, [open])

  const updateApplicationMutation = useMutation(
    (data) => updateApplication(application.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('applications')
        onClose()
        setError("")
      },
      onError: (error) => {
        setError(error.message)
      }
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.programId) {
      setError("Please select a program")
      return
    }
    if (!formData.studentName.trim()) {
      setError("Student name is required")
      return
    }
    if (!formData.studentEmail.trim()) {
      setError("Student email is required")
      return
    }
    if (!/\S+@\S+\.\S+/.test(formData.studentEmail)) {
      setError("Please enter a valid email address")
      return
    }
    console.log(formData);

    updateApplicationMutation.mutate(formData)
  }

  const handleClose = () => {
    setFormData({
      programId: "",
      studentName: "",
      studentEmail: "",
      studentPhone: "",
      message: "",
      status: "pending",
    })
    setError("")
    onClose()
  }

  if (!application) return null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Edit Application
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!error && !formData.programId}>
                  <InputLabel>Program</InputLabel>
                  <Select
                    value={formData.programId}
                    label="Program"
                    onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                  >
                    {programs.map((program) => (
                      <MenuItem key={program.id} value={program.id}>
                        {program.title} - {program.category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Student Name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Enter student name"
                  required
                  variant="outlined"
                  error={!!error && !formData.studentName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Student Email"
                  type="email"
                  value={formData.studentEmail}
                  onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                  placeholder="Enter student email"
                  required
                  variant="outlined"
                  error={!!error && !formData.studentEmail}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.studentPhone}
                  onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
                  placeholder="Enter phone number"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Additional message"
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={handleClose} variant="outlined" size="large" disabled={updateApplicationMutation.isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={updateApplicationMutation.isLoading}
            size="large"
            startIcon={updateApplicationMutation.isLoading ? <CircularProgress size={20} /> : null}
          >
            {updateApplicationMutation.isLoading ? "Updating..." : "Update Application"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
