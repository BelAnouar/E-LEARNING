import { Typography, Card, CardContent, CardMedia, Button, Box, Container, Chip } from "@mui/material"


const Certification = () => {
  const courses = [
    {
      id: "1",
      image: "/placeholder.svg?height=200&width=300",
      title: "Introduction to Programming",
      instructor: "Dr. Smith",
      price: "49.99",
      category: "Programming",
      students: "2.5k",
    },
    {
      id: "2",
      image: "/placeholder.svg?height=200&width=300",
      title: "Web Development",
      instructor: "Prof. Johnson",
      price: "59.99",
      category: "Web Dev",
      students: "3.2k",
    },
    {
      id: "3",
      image: "/placeholder.svg?height=200&width=300",
      title: "Database Design",
      instructor: "Dr. Lee",
      price: "69.99",
      category: "Database",
      students: "1.8k",
    },
    {
      id: "4",
      image: "/placeholder.svg?height=200&width=300",
      title: "Advanced JavaScript",
      instructor: "Prof. Wilson",
      price: "79.99",
      category: "JavaScript",
      students: "4.1k",
    },
  ]

  const testimonialCourses = [
    {
      id: "5",
      image: "/placeholder.svg?height=200&width=300",
      title: "React Development Mastery",
      instructor: "Sarah Johnson",
      price: "89.99",
      testimonial: "I supported the motion 'EDUCATION IS BETTER THAN MONEY'",
      category: "React",
    },
    {
      id: "6",
      image: "/placeholder.svg?height=200&width=300",
      title: "Python for Data Science",
      instructor: "Mike Chen",
      price: "94.99",
      testimonial: "I supported the motion 'EDUCATION IS BETTER THAN MONEY'",
      category: "Python",
    },
  ]

  return (
    <div>
      

      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <Typography
              variant="h6"
              sx={{
                color: "#3455AC",
                fontWeight: "bold",
                mb: 2,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Professional Certificates
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "#1a1a1a",
              }}
            >
              Get job-ready for an in-demand career
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Break into a new field like information technology or data science. No prior experience necessary to get
              started
            </Typography>
          </div>
        </Container>
      </section>

   
    </div>
  )
}

export default Certification
