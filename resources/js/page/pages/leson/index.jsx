import Footer from "../../components/footer"
import Navbar from "../../components/Navbar"
import Info from "./InfosLesson"
import TitleLesson from "./TitleLisson"






const Lesson=()=>{
    return(
        <section id="lesson">
        <div className="container">
            <Navbar/>
            <TitleLesson/>
          
            <Info/>
            <Footer/>

        </div>
        </section>
    )
}


export default Lesson