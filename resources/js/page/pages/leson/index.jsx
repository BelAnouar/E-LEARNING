import { useParams } from "react-router-dom"
import Footer from "../../components/footer"
import Navbar from "../../components/Navbar"
import Info from "./InfosLesson"
import TitleLesson from "./TitleLisson"
import { getCour } from "../../lib/helper"
import { useQuery } from "react-query"
import { useEffect, useState } from "react"
import axiosClient from "../api/axios-client"
import { Audio, Dna ,} from "react-loader-spinner"






const Lesson=()=>{
    
    const {idCours}=useParams()
    const  {isLoading, isError, data, error}=useQuery(["Cours",idCours],()=>getCour(idCours))

    if(isLoading) return <div class="position-absolute top-50 start-50 translate-middle"><Dna
    visible={true} 
    height="
    100"
    width="100"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
  /></div>
    if(isError) return <div>Error</div>

   
    return(
        <section id="lesson">
        <div className="container">
            <Navbar/>
            <TitleLesson Cour={data}/>
          
            <Info idCour={data.idCours}/>
            <Footer/>

        </div>
        </section>
    )
}


export default Lesson