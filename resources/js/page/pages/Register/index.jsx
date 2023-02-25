import { Box, Typography } from "@mui/material";

const Register = () => {
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
                                >
                                    <a href="/" className="nav-link">
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

                                <div className="form-floating mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingInput"
                                        placeholder="Full Name"
                                    />
                                    <label for="floatingInput">Full Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingPassword"
                                        placeholder="Email"
                                    />
                                    <label for="floatingPassword">Email</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingPassword"
                                        placeholder="Public Username"
                                    />
                                    <label for="floatingPassword">
                                        Public Username
                                    </label>
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

                                <div className="form-floating mb-3">
                                    <select
                                        className="form-select form-control border border-dark   rounded-0"
                                        id="selectCountry"
                                        aria-label="Default select example"
                                    >
                                        <option selected>country</option>
                                    </select>
                                    <label
                                        className="form-label"
                                        for="selectCountry"
                                    >
                                        country
                                    </label>
                                </div>

                                <div className="form-check fs-4 ">
                                    <input
                                        className="form-check-input  rounded-0  "
                                        type="checkbox"
                                        id="defaultCheck2"
                                    />
                                    <label
                                        className="form-check-label text-muted fs-6"
                                        for="defaultCheck2"
                                    >
                                        I agree
                                    </label>
                                </div>

                                <Typography variant="caption" display="block" className="small text-muted">
                                By creating an account, you agree to the
                                <a href="#" className="text-success " >Terms of Service and Honor Code </a>
                                    and you acknowledge that E-simplified and each Member
                                    process your personal data in accordance
                                    with the <a href="#" className="text-success" > Privacy Policy </a> . 
                                </Typography>

                                <div className="pt-1 mb-4">
                                    <button
                                        className="btn-login  mt-2
                                         rounded-0"
                                        type="button"
                                    >
                                        Create an account
                                    </button>
                                </div>

                              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;







