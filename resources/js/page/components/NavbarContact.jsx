
import { Link } from "react-router-dom";

const NavbarContact=()=>{
    return(<nav>
          <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container">
          <a className="navbar-brand fw-bolder" href="#">
          <img src="/images/logos/online-learning.png" className="mb-3" alt="E-simplified" width="40" height="40"/>
          E-Simplified</a>
          <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto my-2 mx-2">
                 
                    <li className="nav-item me-5 fs-4 ">
                        <Link className="nav-link text-primary fw-bold" to="/contact">contact</Link>
                    </li>
                </ul>
         
            
          </div>
        </div>
      </nav>
      
    </nav>)
}


export default NavbarContact