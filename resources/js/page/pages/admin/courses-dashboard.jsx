"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  Paper,
  Divider,
  Avatar,
  CardHeader,
} from "@mui/material"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  VideoFile as VideoIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  CloudUpload as CloudUploadIcon,
  MenuBook as BookIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material"

import { getCourses, updateCourse, addCourse } from "../../lib/courses"
import { getWeeks, addWeek, updateWeek } from "../../lib/weeks"
import { getFilesByWeek, AddFile } from "../../lib/Files"

export default function WeeksDashboard() {
  const [weeks, setWeeks] = useState([])
  const [courses, setCourses] = useState({})
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(true)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const [editWeekDialog, setEditWeekDialog] = useState({ open: false, week: null })
  const [addWeekDialog, setAddWeekDialog] = useState({ open: false })

  
  const [weekForm, setWeekForm] = useState({
    idCour: "",
    titre: "",
    description: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      
      const coursesData = await getCourses()
      const coursesMap = {}
      coursesData.forEach((course) => {
        coursesMap[course.idCours] = course
      })
      setCourses(coursesMap)

     
      const allWeeks = []
      const filesMap = {}

      for (const course of coursesData) {
        try {
        
          const weeksData = await getWeeks({ queryKey: ["weeks", course.idCours] })
          
       
          const weeksWithCourse = weeksData.map(week => ({
            ...week,
            idCour: course.idCours
          }))
          
          allWeeks.push(...weeksWithCourse)

     
          for (const week of weeksWithCourse) {
            try {
              const filesData = await getFilesByWeek(week.idweek)
              filesMap[week.idweek] = filesData
            } catch (error) {
              console.log(`No files found for week ${week.idweek}`)
              filesMap[week.idweek] = []
            }
          }
        } catch (error) {
          console.log(`No weeks found for course ${course.idCours}`)
        }
      }

      setWeeks(allWeeks)
      setFiles(filesMap)
    } catch (error) {
      console.error("Error loading data:", error)
      showSnackbar("Failed to load data", "error")
    } finally {
      setLoading(false)
    }
  }

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleEditWeek = (week) => {
    setWeekForm({
      idCour: week.idCour,
      titre: week.titre,
      description: week.description,
    })
    setEditWeekDialog({ open: true, week })
  }

  const handleAddWeek = () => {
    setWeekForm({
      idCour: "",
      titre: "",
      description: "",
    })
    setAddWeekDialog({ open: true })
  }

  const handleSaveWeek = async () => {
    try {
      if (editWeekDialog.week) {
        
        await updateWeek(editWeekDialog.week.idweek, {
          [editWeekDialog.week.idweek]: {
            titre: weekForm.titre,
            description: weekForm.description,
          },
        })
        showSnackbar("Week updated successfully")
      } else {
    
        await addWeek(weekForm)
        showSnackbar("Week added successfully")
      }

      loadData() 
      setEditWeekDialog({ open: false, week: null })
      setAddWeekDialog({ open: false })
      setWeekForm({ idCour: "", titre: "", description: "" })
    } catch (error) {
      console.error("Error saving week:", error)
      showSnackbar("Failed to save week", "error")
    }
  }

  const handleFileUpload = async (event, idWeek) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append("File", file)
      formData.append("idWeek", idWeek)
      formData.append("name", file.name)
      formData.append("type", file.type)
      formData.append("size", file.size)
      formData.append("lastModified", file.lastModified)

      await AddFile(formData)
      showSnackbar("File uploaded successfully")

      // Reload files for this week
      const filesData = await getFilesByWeek(idWeek)
      setFiles((prev) => ({ ...prev, [idWeek]: filesData }))
    } catch (error) {
      console.error("Error uploading file:", error)
      showSnackbar("Failed to upload file", "error")
    }
  }

  const getFileIcon = (type) => {
    if (type.startsWith("video/")) return <VideoIcon color="primary" />
    if (type.startsWith("image/")) return <ImageIcon color="secondary" />
    return <FileIcon />
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" className="mt-3">
            Loading courses and weeks...
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <div className="bg-light min-vh-100">
      <Container maxWidth="xl" className="py-4">
        {/* Header */}
        <Paper elevation={2} className="p-4 mb-4">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h3" component="h1" className="fw-bold text-primary mb-2">
                <AssignmentIcon className="me-2" fontSize="large" />
                Weeks Dashboard
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Manage course weeks and their files ({weeks.length} weeks total)
              </Typography>
            </Box>
            <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={handleAddWeek} className="btn-lg">
              Add Week
            </Button>
          </Box>
        </Paper>

        {/* Weeks Grid */}
        <Grid container spacing={3}>
          {weeks.map((week) => {
            const course = courses[week.idCour] || {}
            const weekFiles = files[week.idweek] || []

            return (
              <Grid item xs={12} lg={6} key={week.idweek}>
                <Card elevation={3} className="h-100">
                  {/* Week Header with Course Info */}
                  <CardHeader
                    avatar={
                      <Avatar className="bg-primary">
                        <CalendarIcon />
                      </Avatar>
                    }
                    title={
                      <Typography variant="h5" className="fw-bold">
                        {week.titre}
                      </Typography>
                    }
                    subheader={
                      <Box>
                        <Typography variant="body2" color="text.secondary" className="mb-2">
                          {week.description}
                        </Typography>
                        {course.titre && (
                          <Box display="flex" alignItems="center" gap={1} className="mb-2" flexWrap="wrap">
                            <Chip
                              icon={<BookIcon />}
                              label={course.titre}
                              color="primary"
                              variant="outlined"
                              size="small"
                            />
                            {course.enseignant && (
                              <Chip
                                icon={<PersonIcon />}
                                label={course.enseignant}
                                color="secondary"
                                variant="outlined"
                                size="small"
                              />
                            )}
                            {course.prix && (
                              <Chip
                                icon={<MoneyIcon />}
                                label={`$${course.prix}`}
                                color="success"
                                variant="outlined"
                                size="small"
                              />
                            )}
                          </Box>
                        )}
                      </Box>
                    }
                    action={
                      <IconButton onClick={() => handleEditWeek(week)} color="primary">
                        <EditIcon />
                      </IconButton>
                    }
                  />

                  {/* Course Image */}
                  {course.image && (
                    <Box className="px-3 mb-2">
                      <CardMedia
                        component="img"
                        height="150"
                        image={course.image}
                        alt={course.titre}
                        className="rounded"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  )}

                  <CardContent>
                    <Divider className="mb-3" />

                    {/* Files Section */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" className="mb-3">
                      <Typography variant="h6" className="fw-semibold">
                        <FileIcon className="me-2" />
                        Files ({weekFiles.length})
                      </Typography>
                      <Box>
                        <input
                          type="file"
                          id={`file-upload-${week.idweek}`}
                          style={{ display: "none" }}
                          onChange={(e) => handleFileUpload(e, week.idweek)}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<CloudUploadIcon />}
                          onClick={() => document.getElementById(`file-upload-${week.idweek}`).click()}
                        >
                          Upload
                        </Button>
                      </Box>
                    </Box>

                    {/* Files List */}
                    <Paper variant="outlined" className="p-2" style={{ maxHeight: "300px", overflowY: "auto" }}>
                      {weekFiles.length > 0 ? (
                        <List dense>
                          {weekFiles.map((file) => (
                            <ListItem key={file.idFiles} className="border rounded mb-1 bg-white">
                              <ListItemIcon>{getFileIcon(file.type)}</ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="body2" className="fw-medium">
                                    {file.name}
                                  </Typography>
                                }
                                secondary={
                                  <Box display="flex" gap={1} flexWrap="wrap">
                                    <Chip label={formatFileSize(file.size)} size="small" variant="outlined" />
                                    <Chip
                                      label={file.type.split("/")[0]}
                                      size="small"
                                      color={file.type.startsWith("video/") ? "primary" : "default"}
                                      variant="outlined"
                                    />
                                  </Box>
                                }
                              />
                              <ListItemSecondaryAction>
                                <IconButton size="small" color="primary">
                                  <DownloadIcon />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Box className="text-center py-4">
                          <FileIcon color="disabled" style={{ fontSize: 48 }} />
                          <Typography variant="body2" color="text.secondary" className="mt-2">
                            No files uploaded yet
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Click "Upload" to add files to this week
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>

        {weeks.length === 0 && !loading && (
          <Paper className="p-5 text-center">
            <AssignmentIcon color="disabled" style={{ fontSize: 64 }} />
            <Typography variant="h5" color="text.secondary" className="mt-3 mb-2">
              No weeks found
            </Typography>
            <Typography variant="body1" color="text.secondary" className="mb-3">
              Start by adding your first course week
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddWeek}>
              Add First Week
            </Button>
          </Paper>
        )}

       
        <Dialog
          open={editWeekDialog.open || addWeekDialog.open}
          onClose={() => {
            setEditWeekDialog({ open: false, week: null })
            setAddWeekDialog({ open: false })
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{editWeekDialog.week ? "Edit Week" : "Add New Week"}</DialogTitle>
          <DialogContent>
            <Box className="row g-3 mt-1">
              {!editWeekDialog.week && (
                <div className="col-12">
                  <TextField
                    select
                    fullWidth
                    label="Select Course"
                    value={weekForm.idCour}
                    onChange={(e) => setWeekForm({ ...weekForm, idCour: e.target.value })}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="">Select a course</option>
                    {Object.values(courses).map((course) => (
                      <option key={course.idCours} value={course.idCours}>
                        {course.titre} - {course.enseignant}
                      </option>
                    ))}
                  </TextField>
                </div>
              )}
              <div className="col-12">
                <TextField
                  fullWidth
                  label="Week Title"
                  value={weekForm.titre}
                  onChange={(e) => setWeekForm({ ...weekForm, titre: e.target.value })}
                />
              </div>
              <div className="col-12">
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={weekForm.description}
                  onChange={(e) => setWeekForm({ ...weekForm, description: e.target.value })}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setEditWeekDialog({ open: false, week: null })
                setAddWeekDialog({ open: false })
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveWeek}>
              {editWeekDialog.week ? "Update" : "Add"} Week
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  )
}
