import { Link } from "react-router-dom";

const Navbar = () => {
    return (
    
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
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Program&Degrees">Program&Degrees</Link>
                    </li>
                    <li className="nav-item">
                        {" "}
                        <Link className="nav-link" to="/courses">courses</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Books">Books</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">contact</Link>
                    </li>
                </ul>
                <form className="d-flex mx-2 " >
            <button className="btn btn-outline-light text-dark " type="submit">
          <Link to='/SignIn' className="nav-link"> Sign in </Link> </button>
            <button className="btn btn-success ms-2" type="submit">
            <Link to='/Register' className="nav-link">  Register  </Link>  </button>
          </form>
            
          </div>
        </div>
      </nav>
      
    
   
  
    );
};

export default Navbar;


