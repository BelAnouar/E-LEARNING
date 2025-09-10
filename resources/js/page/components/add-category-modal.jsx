// add-category-modal.jsx (updated with real API calls)
"use client"

import { useState } from "react"
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
import { addCategory } from "../lib/categories"

export function AddCategoryModal({ open, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const queryClient = useQueryClient()

  const addCategoryMutation = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories')
      onOpenChange(false)
      setFormData({ name: "", description: "" })
      setError("")
    },
    onError: (error) => {
      setError(error.message)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    if (!formData.name.trim()) {
      setError("Category name is required")
      return
    }

    addCategoryMutation.mutate(formData)
  }

  const handleClose = () => {
    onOpenChange(false)
    setFormData({ name: "", description: "" })
    setError("")
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Add New Category
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
                <TextField
                  fullWidth
                  label="Category Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  required
                  variant="outlined"
                  error={!!error}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter category description"
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={handleClose} variant="outlined" size="large" disabled={addCategoryMutation.isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={addCategoryMutation.isLoading}
            size="large"
            startIcon={addCategoryMutation.isLoading ? <CircularProgress size={20} /> : null}
          >
            {addCategoryMutation.isLoading ? "Creating..." : "Create Category"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}