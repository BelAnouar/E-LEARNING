import { HashRouter as Router,Routes,Route, Link } from "react-router-dom";
import CardCourses from "./components/homePage/cardCourses";
import CardDev from "./components/homePage/cardDev";
import Feature from "./components/homePage/feature";
import Title from "./components/homePage/title";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
export default function App() {
    return (


    
      
      // <Router  hi>
      //   <Routes >
      //     <Route path="/" element={<Navbar/>}/>
      //     <Route path="*" element={<Error/>}/>
      //   </Routes>
      // </Router>
      
      <section>
    <div className="container">
      <Navbar/>
      <Title/>
      <Feature/>
      <CardDev/>
      <CardCourses/>
    </div></section>
    )
}