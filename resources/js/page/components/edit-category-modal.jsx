
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
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material"
import { useMutation, useQueryClient } from "react-query"
import { updateCategory } from "../lib/categories"

export function EditCategoryModal({ open, onOpenChange, category }) {
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const queryClient = useQueryClient()

  
  useEffect(() => {
    if (category && open) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
      })
    }
  }, [category, open])

  const updateCategoryMutation = useMutation(
    (data) => updateCategory(category.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories')
        onOpenChange(false)
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
    

    if (!formData.name.trim()) {
      setError("Category name is required")
      return
    }

    updateCategoryMutation.mutate(formData)
  }

  const handleClose = () => {
    onOpenChange(false)
    setFormData({
      name: "",
      description: "",
    })
    setError("")
  }

  if (!category) return null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Edit Category
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
                  error={!!error && !formData.name}
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
          <Button onClick={handleClose} variant="outlined" size="large" disabled={updateCategoryMutation.isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={updateCategoryMutation.isLoading}
            size="large"
            startIcon={updateCategoryMutation.isLoading ? <CircularProgress size={20} /> : null}
          >
            {updateCategoryMutation.isLoading ? "Updating..." : "Update Category"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}