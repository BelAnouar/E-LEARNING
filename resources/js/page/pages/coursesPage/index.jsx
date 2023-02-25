import Footer from "../../components/footer"
import Navbar from "../../components/Navbar"
import Certification from "./certification"
import Course from "./courses"
import TitleCourses from "./titleCouses"








const Courses=()=>{
   return ( <section>
   <div className="container">
        <Navbar/>
        <TitleCourses/>
        <Certification/>
        <Course/>
        <Footer/>
        </div>
     </section>
)
}


export default Courses