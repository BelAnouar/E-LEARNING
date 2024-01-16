import Footer from "../../components/footer"
import Navbar from "../../components/Navbar"

import Categorise from "./Categorise"
import TitleCourses from "./titleCouses"








const Courses=()=>{
   return ( <section>
   <div className="container">
        <Navbar/>
        <TitleCourses/>
        <Categorise/>
        <Footer/>
        </div>
     </section>
)
}


export default Courses