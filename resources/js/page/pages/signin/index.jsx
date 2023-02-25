import { Box, Typography } from "@mui/material";

const SingIn = () => {
    return (
        <section className="">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7">
                        <div className="img  ">
                            <div className="p-4">
                                <Typography
                                    color="#fff"
                                    className="fw-bold mb-5"
                                    variant="h5"
                                    gutterBottom
                                ><a href="/" className="nav-link">
                                    E-Simplifed</a>
                                </Typography>
                                <Box
                                    color="#fff"
                                    className="ms-5"
                                    component="h3"
                                    sx={{
                                        pt: "7rem",
                                        
                                    }}
                                >
                                    <Typography
                                        className="fw-bold w-25"
                                        variant="h3"
                                        sx={{ fontSize: "4rem" }}
                                    >
                                        {" "}
                                        Start learning
                                    </Typography>
                                    <Typography
                                        className="fw-bold"
                                        variant="h3"
                                        sx={{ fontSize: "4rem" }}
                                    >
                                        with E-Simplified
                                    </Typography>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className=" align-items-center  px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                            <form style={{ width: "23rem" }}>
                                <div className="d-flex flex-row navbar-nav fs-5 border-bottom border-2 mb-4">
                                    <a href="/Register" className="nav-link me-2 ">Register</a>
                                    <a href="/SignIn" className="nav-link">Sign in</a>
                                </div>


                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingPassword"
                                        placeholder="Username or Email"
                                    />
                                    <label for="floatingPassword">Username or Email</label>
                                </div>

                             

                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingPassword"
                                        placeholder="Password"
                                    />
                                    <label for="floatingPassword">
                                        Password
                                    </label>
                                </div>

                                
                          
                           <div className="d-flex flex-row ">
                                <div className="me-3">
                                    <button
                                        className="btn-login  mt-2
                                         rounded-0"
                                        type="button"
                                    >
                                        sign in
                                    </button>
                                </div>

                                 <p className="small  mt-3 ">
                                    <a className="text-muted " href="#!">
                                        Forgot password?
                                    </a>
                                </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingIn;


