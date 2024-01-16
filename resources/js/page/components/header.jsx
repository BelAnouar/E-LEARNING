import { Avatar } from "@mui/material";
import { useStateContext } from "../pages/contexts/contextProvider";
import LogoutIcon from '@mui/icons-material/Logout';
import axiosClient from "../pages/api/axios-client";
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
const Header = () => {
    const { user, token } = useStateContext();
    const LogoutAccout  =()=>{
        axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
    }

    return (
        <div
            className=" px-4 pt-4 bg-light mb-3"
            style={{ backgroundColor: "slateblue" }}
        >
            <header className="topbar" data-navbarbg="skin6">
                <nav className="navbar top-navbar navbar-expand-md navbar-light ">
                    <div className="navbar-header" data-logobg="skin6">
                        <b className="logo-icon">
                        
      <div className="row ">
        <div className="col-md-12">
          <input type="text" className="form-control rounded-3" placeholder="Search..." />
        </div>
      </div>
  
                        </b>
                    </div>

                    <div
                        className="navbar-collapse collapse d-flex flex-row-reverse"
                        id="navbarSupportedContent"
                        data-navbarbg="skin5"
                    >
                        <ul className="navbar-nav ml-0">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                ><Avatar sx={{ width: 35, height: 35 ,display:"inline-flex"}}>{user.name?.charAt(0)}
              
            </Avatar>
                                    
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end user-dd animated"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <a className="dropdown-item">
                                        <SupervisedUserCircleIcon sx={{mr:2}}/>
                                        My Profile
                                    </a>
                                    
                                    <a className="dropdown-item">
                                        <AllInboxIcon sx={{mr:2}}/>
                                        Inbox
                                    </a>
                                    <a className="dropdown-item" onClick={LogoutAccout}>
                                        <LogoutIcon sx={{mr:2}} />
                                        Logout
                                    </a>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
};
export default Header;
