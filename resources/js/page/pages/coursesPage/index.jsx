import { useQuery } from "react-query"
import Footer from "../../components/footer"
import Navbar from "../../components/Navbar"
import Certification from "./certification"
import Course from "./courses"
import TitleCourses from "./titleCouses"
import { getCours } from "../../lib/helper"
import { Dna } from "react-loader-spinner"








const Courses=()=>{

   const { isLoading, isError, data, error } = useQuery("Cours",getCours);
     
   
   if(isLoading) return <div class="position-absolute top-50 start-50 translate-middle"><Dna
   visible={true} 
   height="
   100"
   width="100"
   ariaLabel="dna-loading"
   wrapperStyle={{}}
   wrapperClass="dna-wrapper"
 /></div>
   if (isError) return <div>Got Error{error}</div>;
   return ( <section>
   <div className="container">
        <Navbar/>
        <TitleCourses/>
        <Certification/>
        <Course Cours={data}/>
        <Footer/>
        </div>
     </section>
)
}


export default Courses