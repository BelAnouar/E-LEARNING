import { Outlet } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddchartIcon from "@mui/icons-material/Addchart";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { NavLink } from "react-router-dom";
import {
    School as SchoolIcon,
    Category as CategoryIcon,
    People as PeopleIcon,
} from "@mui/icons-material";
const Sidbar = () => {
    return (
        <div className="d-flex">
            <div className="h-100 p-4 bg-white dark:bg-black border-end d-flex flex-column justify-content-between">
                <div className="d-flex flex-column align-items-center">
                    <nav className="sidebar-nav">
                        <div className="p-3 rounded-lg inline-block">
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
                        <ul
                            id="sidebarnav"
                            className="navbar-nav ms-3 my-2 mx-2"
                        >
                            <li className="nav-item mb-1">
                                <NavLink
                                    to="/admin"
                                    className={({ isActive }) =>
                                        `nav-link fw-bold fs-5 ${
                                            isActive ? "text-primary" : ""
                                        }`
                                    }
                                >
                                    <DashboardIcon sx={{ m: 0.75 }} />
                                    <span className="d-none d-sm-inline">
                                        Dashboard
                                    </span>
                                </NavLink>
                            </li>

                            <li className="nav-item mb-1">
                                <NavLink
                                    to="/admin/programs"
                                    className={({ isActive }) =>
                                        `nav-link fw-bold fs-5 ${
                                            isActive ? "text-primary" : ""
                                        }`
                                    }
                                >
                                    <SchoolIcon sx={{ m: 0.75 }} />
                                    <span className="d-none d-sm-inline">
                                        Programs
                                    </span>
                                </NavLink>
                            </li>

                            <li className="nav-item mb-1">
                                <NavLink
                                    to="/admin/categories"
                                    className={({ isActive }) =>
                                        `nav-link fw-bold fs-5 ${
                                            isActive ? "text-primary" : ""
                                        }`
                                    }
                                >
                                    <CategoryIcon sx={{ m: 0.75 }} />
                                    <span className="d-none d-sm-inline">
                                        Categories
                                    </span>
                                </NavLink>
                            </li>

                            <li className="nav-item mb-1">
                                <NavLink
                                    to="/admin/applications"
                                    className={({ isActive }) =>
                                        `nav-link fw-bold fs-5 ${
                                            isActive ? "text-primary" : ""
                                        }`
                                    }
                                >
                                    <PeopleIcon sx={{ m: 0.75 }} />
                                    <span className="d-none d-sm-inline">
                                        Apps
                                    </span>
                                </NavLink>
                            </li>

                            <li className="nav-item mb-1">
                                <NavLink
                                    to="/admin/addcours"
                                    className={({ isActive }) =>
                                        `nav-link fw-semibold fs-5 ${
                                            isActive ? "text-primary" : ""
                                        }`
                                    }
                                >
                                    <AddchartIcon sx={{ m: 1 }} />
                                    <span className="d-none d-sm-inline">
                                        AddCours
                                    </span>
                                </NavLink>
                            </li>

                            <li className="nav-item mb-1">
                                <span className="nav-link fw-semibold fs-5 text-muted disabled">
                                    <FolderCopyIcon sx={{ m: 1 }} />
                                    <span className="d-none d-sm-inline">
                                        Content
                                    </span>
                                </span>
                            </li>

                            <li className="nav-item mb-1">
                                <span className="nav-link fw-semibold fs-5 text-muted disabled">
                                    <PermMediaIcon sx={{ m: 1 }} />
                                    <span className="d-none d-sm-inline">
                                        Media
                                    </span>
                                </span>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/admin/register"
                                    className={({ isActive }) =>
                                        `nav-link fw-semibold fs-5 ${
                                            isActive ? "text-primary" : ""
                                        }`
                                    }
                                >
                                    <LockOpenIcon sx={{ m: 1 }} />
                                    <span className="d-none d-sm-inline">
                                        Register
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className=" w-100">
                <Outlet />
            </div>
        </div>
    );
};

export default Sidbar;
