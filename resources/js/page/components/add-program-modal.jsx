// add-program-modal.jsx (updated with real API calls)
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useMutation, useQueryClient } from "react-query"
import { addProgram } from "../lib/programs"
import { getCategories } from "../lib/categories"

export function AddProgramModal({ open, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "Certificate",
    price: "",
    maxStudents: "",
    status: "active",
  })
  const queryClient = useQueryClient()

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories({ limit: 100 })
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    if (open) {
      fetchCategories()
    }
  }, [open])

  const addProgramMutation = useMutation(addProgram, {
    onSuccess: () => {
      queryClient.invalidateQueries('programs')
      onOpenChange(false)
      setFormData({
        title: "",
        description: "",
        category: "",
        duration: "",
        level: "Certificate",
        price: "",
        maxStudents: "",
        status: "active",
      })
      setStartDate(null)
      setEndDate(null)
      setError("")
    },
    onError: (error) => {
      setError(error.message)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    // Validation
    if (!formData.title.trim()) {
      setError("Program title is required")
      return
    }
    if (!formData.category) {
      setError("Category is required")
      return
    }
    if (!startDate) {
      setError("Start date is required")
      return
    }
    if (!endDate) {
      setError("End date is required")
      return
    }
    if (startDate >= endDate) {
      setError("End date must be after start date")
      return
    }

    const submitData = {
      ...formData,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      price: parseFloat(formData.price),
      maxStudents: parseInt(formData.maxStudents),
    }

    addProgramMutation.mutate(submitData)
  }

  const handleClose = () => {
    onOpenChange(false)
    setFormData({
      title: "",
      description: "",
      category: "",
      duration: "",
      level: "Certificate",
      price: "",
      maxStudents: "",
      status: "active",
    })
    setStartDate(null)
    setEndDate(null)
    setError("")
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Add New Program
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Program Name"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter program name"
                    required
                    variant="outlined"
                    error={!!error && !formData.title}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!error && !formData.category}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      label="Category"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter program description"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Duration (weeks)"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="12"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Price ($)"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="299.99"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Max Students"
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
                    placeholder="30"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Level</InputLabel>
                    <Select
                      value={formData.level}
                      label="Level"
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    >
                      <MenuItem value="Certificate">Certificate</MenuItem>
                      <MenuItem value="Diploma">Diploma</MenuItem>
                      <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                      <MenuItem value="Graduate">Graduate</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      label="Status"
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="draft">Draft</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={setStartDate}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        fullWidth 
                        required 
                        error={!!error && !startDate}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={setEndDate}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        fullWidth 
                        required 
                        error={!!error && !endDate}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button onClick={handleClose} variant="outlined" size="large" disabled={addProgramMutation.isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={addProgramMutation.isLoading}
              size="large"
              startIcon={addProgramMutation.isLoading ? <CircularProgress size={20} /> : null}
            >
              {addProgramMutation.isLoading ? "Creating..." : "Create Program"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  )
}