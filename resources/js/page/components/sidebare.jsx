
import { Outlet } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AddchartIcon from '@mui/icons-material/Addchart';
import PermMediaIcon from '@mui/icons-material/PermMedia';
const Sidbar=()=>{
    return(
<div className="d-flex">
   <div className="h-100 p-4 bg-white dark:bg-black border-end d-flex flex-column justify-content-between">
    <div className="d-flex flex-column align-items-center">
    <nav className="sidebar-nav">
    <div className='p-3 rounded-lg inline-block'>
    <a className="navbar-brand fw-bolder" href="/admin">
                                <img
                                    src="/images/logos/online-learning.png"
                                    className="mb-3"
                                    alt="E-simplified"
                                    width="40"
                                    height="40"
                                />
                                E-Simplified
                            </a>
                </div>
                <ul id="sidebarnav" className="navbar-nav ms-3 my-2 mx-2">
    <li className="nav-item mb-1">
        <a className="nav-link fw-bold fs-5" href="/admin" aria-expanded="false">
            <DashboardIcon sx={{m:0.75}} />
            <span className="d-none d-sm-inline">Dashboard</span>
        </a>
    </li>
    <li className="nav-item mb-1">
        <a className="nav-link fw-semibold fs-5" href="/addcours" >
            <AddchartIcon sx={{m:1}}/>
            <span className="d-none d-sm-inline">AddCours</span>
        </a>
    </li>
    <li className="nav-item mb-1">
        <a className="nav-link fw-semibold fs-5" href="/Content" aria-expanded="false">
            <FolderCopyIcon sx={{m:1}}/>
            <span className="d-none d-sm-inline">Content</span>
        </a>
    </li>
    <li className="nav-item mb-1">
        <a className="nav-link fw-semibold fs-5 "  disabled href="/Media" aria-expanded="false">
            <PermMediaIcon sx={{m:1}}/>
            <span className="d-none d-sm-inline">Media</span>
        </a>
    </li>
    
    <li className="nav-item">
        <a className="nav-link fw-semibold fs-5" href="/admin/Register" aria-expanded="false">
            <LockOpenIcon sx={{m:1}}/>
            <span className="d-none d-sm-inline">Register</span>
        </a>
    </li>
    <li className="text-center p-40 upgrade-btn mt-5">
        <a href='#' className="btn btn-outline-dark text-secondary-emphasis" >Upgrade to Pro</a>
    </li>
</ul>


                </nav>
    </div>
   </div>
     <div className=" w-100">
      <Outlet/>
   </div>

</div>

)
}


export default Sidbar;