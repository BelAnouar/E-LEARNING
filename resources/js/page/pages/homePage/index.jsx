import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/Navbar";
import CardCourses from "./cardCourses";
import CardDev from "./cardDev";
import Feature from "./feature";
import Subscribe from "./subscribe";
import Title from "./title";

export default function Home() {
 
    return ( <section id="homePage">
    <div className="container">
      <Navbar/>
      <Title/>
      <Feature/>
      <CardDev/>
      <CardCourses/>
      <Subscribe/>
      <Footer/>
    </div></section>
    )
}