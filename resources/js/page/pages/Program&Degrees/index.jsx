import Footer from "../../components/footer"
import Navbar from "../../components/Navbar"

import HeroBanner from "./HeroBanner"

import { ProgramsAndDegrees } from "./ProgramsAndDegrees"









const Courses=()=>{
   return ( <section>
   <div className="container">
        <Navbar/>
        <HeroBanner/>
        <ProgramsAndDegrees/>
        <Footer/>
        </div>
     </section>
)
}


export default Courses