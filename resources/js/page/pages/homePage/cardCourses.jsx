import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCours } from "../../lib/helper";

const CardCourses = (props) => {
       const data=props.Cours;
     if (Object.keys(data).length === 0) return <div>data is Empty</div>;
  
   
     return (
        <section id="press">
            <h1 className="mb-5 ">Explore top courses </h1>
            <div className="row  ">
                {/* first Card */}
    
             
               {data.map((Objitem,index) => { 
                    
              return  (<div key={index} className="col-lg-3 col-md-5 "><Link to={`/lesson/${Objitem.idCours}`}  className="nav-link">
                <div className="card shadow-lg">
                    <img src={Objitem.image} className="card-img-top" alt="..." />
                    <div className="card-body my-2">
                        <h5 className="card-title w-75">{Objitem.titre}</h5>
                        <p className="card-text fs-5 my-1 ">
                        {Objitem.enseignant}
                        </p>
                        <div href="#" className="card-text mt-4 d-flex justify-content-between">
                            <small className="text-dark fs-6">Courses</small>
                            <small className="text-dark fs-6 ">{Objitem.prix}</small>

                           
                        </div>
                    </div>
                </div></Link>
            </div>  )
      })} 


            <div className="col-lg-3 col-md-5 "><Link to="/lesson" className="nav-link">
                <div className="card shadow-lg">
                    <img src="images/title/course.jpg" className="card-img-top" alt="..." />
                    <div className="card-body my-2">
                        <h5 className="card-title w-75">Lorem ipsum dolor sit amet.</h5>
                        <p className="card-text fs-5 my-1 ">
                            Major
                        </p>
                        <div href="#" className="card-text mt-4">
                            <small className="text-dark fs-6">Courses</small>
                        </div>
                    </div>
                </div></Link>
            </div>  

            <div className="col-lg-3 col-md-5 "><Link to="/lesson" className="nav-link">
                <div className="card shadow-lg">
                    <img src="images/title/course.jpg" className="card-img-top" alt="..." />
                    <div className="card-body my-2">
                        <h5 className="card-title w-75">Lorem ipsum dolor sit amet.</h5>
                        <p className="card-text fs-5 my-1 ">
                            Major
                        </p>
                        <div href="#" className="card-text mt-4">
                            <small className="text-dark fs-6">Courses</small>
                        </div>
                    </div>
                </div></Link>
            </div>  





            <div className="col-lg-3 col-md-5 "><Link to="/lesson" className="nav-link">
                <div className="card shadow-lg">
                    <img src="images/title/course.jpg" className="card-img-top" alt="..." />
                    <div className="card-body my-2">
                        <h5 className="card-title w-75">Lorem ipsum dolor sit amet.</h5>
                        <p className="card-text fs-5 my-1 ">
                            Major
                        </p>
                        <div href="#" className="card-text mt-4">
                            <small className="text-dark fs-6">Courses</small>
                        </div>
                    </div>
                </div></Link>
            </div>  



            <div className="col-lg-3 col-md-5 "><Link to="/lesson" className="nav-link">
                <div className="card shadow-lg">
                    <img src="images/title/course.jpg" className="card-img-top" alt="..." />
                    <div className="card-body my-2">
                        <h5 className="card-title w-75">Lorem ipsum dolor sit amet.</h5>
                        <p className="card-text fs-5 my-1 ">
                            Major
                        </p>
                        <div href="#" className="card-text mt-4">
                            <small className="text-dark fs-6">Courses</small>
                        </div>
                    </div>
                </div></Link>
            </div>  
            
            
            
            </div>

            <div className="text-center mt-5">
                <button type="button" className="btn btn-light btn-lg  ">
                 <Link to="/lesson" className="nav-link">
                 Explore more</Link></button>
            </div>
        </section>
    );
};

export default CardCourses;
