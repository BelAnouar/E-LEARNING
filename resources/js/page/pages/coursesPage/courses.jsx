import { Typography, Card, CardContent, CardMedia, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"


const Course = ({ Cours: data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <Typography variant="h6" color="text.secondary">
          No courses available
        </Typography>
      </div>
    )
  }

  return (
    <section id="press" className="py-5">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <Typography
            variant="h3"
            component="h2"
            className="fw-bold mb-4"
            sx={{ color: "#1a1a1a", fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            Browse online Computer Programming courses
          </Typography>

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4">
            <Typography variant="h6" color="text.secondary" className="mb-3 mb-sm-0">
              Find new interests and advance your career opportunities
            </Typography>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Explore All Courses →
            </Button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="row g-4">
          {data.map((course, index) => (
            <div key={course.idCours || index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <Link to={`/lesson/${course.idCours}`} style={{ textDecoration: "none" }} className="d-block h-100">
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={course.image || "/placeholder.svg"}
                    alt={course.titre}
                    sx={{
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        minHeight: "3rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        color: "#1a1a1a",
                      }}
                    >
                      {course.titre}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
                      {course.enseignant}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pt: 2,
                        borderTop: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Courses
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#1976d2",
                        }}
                      >
                        ${course.prix}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Course
