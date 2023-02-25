import Footer from "../../components/footer"
import Navbar from "../../components/Navbar"
import CardBooks from "./CardBooks"
import TitleBooks from "./titleBooks"








const Books=()=>{
   return ( <section >
   <div className="container">
        <Navbar/>
        <TitleBooks/>
        <CardBooks/>
        <Footer/>
         </div>
     </section>
)
}


export default Books