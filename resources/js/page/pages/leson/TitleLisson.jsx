import { useQuery } from "react-query";
import Payement from "../../components/modalPayement";
import { getPayemments } from "../../lib/payemment";





const TitleLesson=(props)=>{
    const  data = props.Cour;
    const FetcherData= useQuery("payement",getPayemments);
     

    return(
        <section className="container"  id="TileLesson">
        
            {/* <div class="p-5 mb-4 ">
      <div class="container ">
      <div className="d-flex">
      <div>
        <h1 class="fw-bold">Custom jumbotron</h1>
        <p class="col-md-8 fs-5">Major</p>
        <button class="btn btn-primary btn-lg" type="button">Example button</button></div>
     <img src=  className="img-fluid"  alt="school"  />
     </div> </div>
    </div> */}
    <div className="container ms-2 ">
    <div className=" bg-light  p-3 mt-3">
    <div className="d-flex justify-content-between">
    <div className="">
     <h1 className="mt-5 fw-bold" >{data.titre}</h1>
     <h3 className="my-3 ">{data.enseignant}</h3>
     <h5 className="text-muted small">“{data.description}”</h5>
     <button className="button text-light mt-3">Enroll for free</button>
     </div>
     <img src={"/"+data.image} className=" w-25 rounded-4 my-2  ms"  alt="course" /></div>
</div>
        </div>
    

    </section>
    
    )
}

export default TitleLesson