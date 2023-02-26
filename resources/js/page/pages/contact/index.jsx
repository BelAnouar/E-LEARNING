import Footer from "../../components/footer"
import Navbar from "../../components/Navbar"
import FeatureContact from "./featureContact"
import Form from "./Form"




const Contact =()=>{
   return(<section id="contact">
   <div className="container">
      <Navbar/>
      <FeatureContact/>
      <Form/>
      <Footer/>
   </div>

   </section>

   )
}

export default Contact