import { useQuery } from "react-query"
import Footer from "../../components/footer"
import Navbar from "../../components/Navbar"
import CardBooks from "./CardBooks"
import TitleBooks from "./titleBooks"
import { Dna } from "react-loader-spinner"








const Books=()=>{
     const BookApi= async()=>{
        const res=await fetch('https://www.dbooks.org/api/recent')
        const data=await res.json()
       return data
     }
     const { isLoading, isError, data, error } = useQuery("Books", BookApi);

     

     if (isLoading)
     return (
         <div class="position-absolute top-50 start-50 translate-middle">
             <Dna
                 visible={true}
                 height="
100"
                 width="100"
                 ariaLabel="dna-loading"
                 wrapperStyle={{}}
                 wrapperClass="dna-wrapper"
             />
         </div>
     );
 if (isError) return <div>Got Error{error}</div>;


   
   
      
   return ( <section >
   <div className="container">
        <Navbar/>
        <TitleBooks/>
        <CardBooks Book={data}/>
        <Footer/>
         </div>
     </section>
)
}


export default Books