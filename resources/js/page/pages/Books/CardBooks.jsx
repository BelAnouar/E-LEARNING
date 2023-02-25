import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"



const CardBooks=()=>{

     const [Book,setBook]=useState([])
     const BookApi= async()=>{
        const res=await fetch('https://www.dbooks.org/api/recent')
        const data=await res.json()
        setBook(data.books)
     }
   
     useEffect(()=>{
        BookApi()
    },[])
   
    console.log(Book);
   
  return ( <section id="press" >
  <div className="container col-12 mb-4 ">
    <div className=" text-info border-bottom border-info">
         <Typography>
            Most Popular
         </Typography>
         </div> </div><div className="row  ">
      {
        Book.map((item)=>{
          return   ( 
           
                
             <div className="col-lg-3 col-md-5 "> <div class="card m-2">
                <img src={item.image} class="card-img " alt={item.title}/>
            </div></div>)
        })
      }</div>
        
        

   
    
    
</section>)

}


export default CardBooks