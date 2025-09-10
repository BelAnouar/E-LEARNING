import { Link } from "react-router-dom";
import MenuAccount from "./Menuaccount";
import { useStateContext } from "../pages/contexts/contextProvider";

const Navbar = () => {
  const { user, token, loading } = useStateContext();
  console.log(token);
  console.log(Object.keys(user));

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand fw-bolder" to="/">
          <img 
            src="/images/logos/online-learning.png" 
            className="mb-3" 
            alt="E-simplified" 
            width="40" 
            height="40"
          />
          E-Simplified
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
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
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Books">Books</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          
          <div className="d-flex mx-2">
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : !token || Object.keys(user).length === 0 ? (
              <>
                <Link to="/SignIn" className="btn btn-outline-light text-dark">
                  Sign in
                </Link>
                <Link to="/Register" className="btn btn-success ms-2">
                  Register
                </Link>
              </>
            ) : (
              <MenuAccount user={user} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;