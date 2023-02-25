






const TitleLesson=()=>{
    return(
        <section className="container"  id="TileLesson">
            {/* <div class="p-5 mb-4 ">
      <div class="container ">
      <div className="d-flex">
      <div>
        <h1 class="fw-bold">Custom jumbotron</h1>
        <p class="col-md-8 fs-5">Major</p>
        <button class="btn btn-primary btn-lg" type="button">Example button</button></div>
     <img src="images/title/course.jpg"  className="img-fluid"  alt="school"  />
     </div> </div>
    </div> */}
<div className="container ms-2 ">
    <div className=" bg-light  p-3 mt-3">
    <div className="d-flex">
    <div className="">
     <h1 className="mt-5 fw-bold" >Lorem ipsum dolor sit amet.</h1>
     <h3 className="my-3 ">Major</h3>
     <h5 className="text-muted small">“Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore 
  magna aliqua.Ut enim ad minim veniam.”</h5>
     <button className="button text-light mt-3">Enroll for free</button>
     </div>
     <img src="images/title/course.jpg" className=" w-50 rounded-4 my-2 "  alt="course" /></div>
</div>
        </div>
    </section>
    
    )
}

export default TitleLesson