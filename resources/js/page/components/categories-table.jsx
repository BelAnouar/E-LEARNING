// categories-table.jsx (updated with real API calls)
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
} from "@mui/material"
import { Search, FilterList, MoreVert, Edit, Delete, Visibility, Add } from "@mui/icons-material"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getCategories, deleteCategory } from "../lib/categories"
import { ca } from "date-fns/locale"
import { AddCategoryModal } from "./add-category-modal"

export function CategoriesTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const queryClient = useQueryClient()
const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  // Fetch categories with react-query
  const { data: categories = [], isLoading, isError, error } = useQuery(
    ['categories', { search: searchTerm }],
    () => getCategories({ search: searchTerm, limit: 100 }),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )

  // Delete category mutation
  const deleteMutation = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories')
      setSnackbar({ open: true, message: "Category deleted successfully", severity: "success" })
    },
    onError: (error) => {
      setSnackbar({ open: true, message: error.message, severity: "error" })
    }
  })

  const handleMenuClick = (event, category) => {
    setAnchorEl(event.currentTarget)
    setSelectedCategory(category)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedCategory(null)
  }

  const handleDelete = async () => {
    if (selectedCategory) {
      try {
        await deleteMutation.mutateAsync(selectedCategory.id)
      } catch (error) {
        console.error("Error deleting category:", error)
      }
    }
    handleMenuClose()
  }

  const handleViewPrograms = () => {
    // Implement view programs functionality
    console.log("View programs for:", selectedCategory)
    handleMenuClose()
  }

  const handleEdit = () => {
    // Implement edit functionality
    console.log("Edit category:", selectedCategory)
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
          <Alert severity="error">Error loading categories: {error.message}</Alert>
        </CardContent>
      </Card>
    )
  }
console.log(categories);

  return (
    <><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" component="h2" fontWeight="bold">
                  Categories Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setIsCategoryModalOpen(true)}
                  sx={{ px: 3, py: 1 }}
                >
                  Add Category
                </Button>
              </Box>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={<Typography variant="h6">Categories</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Organize your programs by category
            </Typography>
          }
          action={
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Search categories..."
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
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Slug</TableCell>
                  <TableCell>Programs</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {category.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                        {category.description || "No description"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={category.slug}
                        variant="outlined"
                        size="small"
                        sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip label={`${category.programCount} programs`} color="default" size="small" />
                    </TableCell>
                    <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, category)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleViewPrograms}>
              <Visibility sx={{ mr: 1 }} fontSize="small" />
              View Programs
            </MenuItem>
            <MenuItem onClick={handleEdit}>
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
      <AddCategoryModal open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen} />
    </>
  )
}