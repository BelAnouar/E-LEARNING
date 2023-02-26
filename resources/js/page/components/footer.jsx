import { Box, IconButton } from "@mui/joy";
import { FormControl, InputLabel, Select } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-4 container ">
            <div className="col mb-3">
                <Link
                    to="/"
                    className="d-flex align-items-center mb-3 link-dark text-decoration-none"
                >
                    <h5>E-Simplified</h5>
                </Link>
                <div className="country mb-4">
                    <FormControl
                        variant="standard"
                        sx={{ display: "flex", minWidth: 120 }}
                    >
                        <InputLabel>
                            {" "}
                            <LanguageIcon /> Language
                        </InputLabel>

                        <Select></Select>
                    </FormControl>
                </div>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        variant="outlined"
                        component="a"
                        className="rounded-circle"
                        href="https://www.facebook.com/"
                    >
                        <FacebookOutlinedIcon />
                    </IconButton>

                    <IconButton
                        variant="outlined"
                        component="a"
                        className="rounded-circle"
                    >
                        <TwitterIcon />
                    </IconButton>
                    <IconButton
                        variant="outlined"
                        component="a"
                        className="rounded-circle"
                    >
                        <LinkedInIcon />
                    </IconButton>

                    <IconButton
                        variant="outlined"
                        component="a"
                        className="rounded-circle"
                    >
                        <InstagramIcon />
                    </IconButton>
                </Box>
            </div>

            <div className="col mb-3"></div>

            <div className="col mb-3">
                <h5 className="text-capitalize">links</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/" className="nav-link p-0 text-muted">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/courses" className="nav-link p-0 text-muted">
                            courses
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/Books" className="nav-link p-0 text-muted">
                            Books
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="#" className="nav-link p-0 text-muted">
                            About us
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="col mb-3">
                <h5 className="text-capitalize">commutiny</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="#" className="nav-link p-0 text-muted">
                            Go premium
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/contact" className="nav-link p-0 text-muted">
                            contact
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="#" className="nav-link p-0 text-muted">
                            Pricing
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="#" className="nav-link p-0 text-muted">
                            Blog
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="col mb-3">
                <h5 className="text-capitalize">resources</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="#" className="nav-link p-0 text-muted">
                            Susport
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/contact" className="nav-link p-0 text-muted">
                            Contact
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/FAQ" className="nav-link p-0 text-muted">
                            FAQ
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
