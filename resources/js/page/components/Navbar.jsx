const Navbar = () => {
    return (
    
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand fw-bolder" href="#">
          <img src="/images/logos/online-learning.png" className="mb-3" alt="E-simplified" width="40" height="40"/>
          E-Simplified</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto my-2 mx-2">
                    <li className="nav-item">
                        <a className="nav-link" href="">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Program&Degrees</a>
                    </li>
                    <li className="nav-item">
                        {" "}
                        <a className="nav-link" href="">courses</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Books</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">contact</a>
                    </li>
                </ul>
                <form class="d-flex mx-2 " >
            <button className="btn btn-outline-light text-dark " type="submit">Sign in</button>
            <button class="btn btn-success ms-2" type="submit">Register</button>
          </form>
            
          </div>
        </div>
      </nav>
      
    
   
   
    );
};

export default Navbar;


