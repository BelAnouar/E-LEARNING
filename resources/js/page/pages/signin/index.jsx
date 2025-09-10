import { Box, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useFormik } from "formik";
import login_validate from "../../lib/validate";
import { toast } from "react-toastify";
import { useStateContext } from "../contexts/contextProvider";
import { useState } from "react";
import axiosClient from "../api/axios-client";
import {Navigate, useNavigate} from "react-router-dom"

const SingIn = () => {
    const { setUser, setToken } = useStateContext()
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    
    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validate: login_validate,
        onSubmit
    })
    
    console.log(formik.errors);
    
    async function onSubmit(values){
        const payload = {
            email: values.email,
            password: values.password,
        }
        
        try {
            const {data} = await axiosClient.post('/login', payload);
            
            
            setUser(data.user);
            setToken(data.token);
        
            localStorage.setItem('USER_ROLE', data.user.role);
            
           
            if(data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
            
           
            toast.success(`Welcome back, ${data.user.name || data.user.email}!`);
            
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setMessage(response.data.message);
            } else {
                setMessage("Login failed. Please try again.");
            }
            toast.error("Login failed. Please check your credentials.");
        }
    }
       
    
    return (
        <section className="vh-100" style={{ minHeight: '100vh' }}>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <div className="col-md-7 h-100">
                        <div className="img h-100 d-flex flex-column">
                            <div className="p-4 flex-grow-1 d-flex flex-column">
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
                                    className="ms-5 flex-grow-1 d-flex flex-column justify-content-center"
                                    component="div"
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
                    <div className="col-md-5 h-100 d-flex align-items-center">
                        <div className="w-100 px-5 ms-xl-4">
                            <form style={{ width: "29rem", margin: "0 auto" }} onSubmit={formik.handleSubmit}>
                                <div className="d-flex flex-row align-items-center navbar-nav fs-5 border-bottom border-2 mb-4">
                                    <a 
                                        href="/Register" 
                                        className="nav-link me-2"
                                        style={{ color: window.location.pathname === '/Register' ? '#6f42c1' : 'inherit' }}
                                    >
                                        Register
                                    </a>
                                    <span className="me-2">/</span>
                                    <a 
                                        href="/SignIn" 
                                        className="nav-link"
                                        style={{ color: window.location.pathname === '/SignIn' ? '#6f42c1' : 'inherit' }}
                                    >
                                        Sign in
                                    </a>
                                </div>

                                {message && (
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                )}

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingEmail"
                                        placeholder="Username or Email" 
                                        name="email"  
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.errors.email && formik.touched.email && (
                                        <span className="text-danger mt-1">{formik.errors.email}</span>
                                    )}
                                    <label htmlFor="floatingEmail">Username or Email</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        name="password"
                                        {...formik.getFieldProps('password')}
                                    />
                                    {formik.errors.password && formik.touched.password && (
                                        <span className="text-danger mt-1">{formik.errors.password}</span>
                                    )}
                                    <label htmlFor="floatingPassword">
                                        Password
                                    </label>
                                </div>

                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-3">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with:</p>
                                    <button type="button" className="btn btn-outline-danger me-2">
                                        Google <GoogleIcon fontSize="medium"/>
                                    </button>

                                    <button type="button" className="btn btn-outline-dark me-2">
                                        GitHub <GitHubIcon fontSize="medium"/>
                                    </button>
                                </div>
                           
                                <div className="d-flex flex-row ">
                                    <div className="me-3">
                                        <button
                                            className="btn-login mt-2 rounded-0"
                                            type="submit"
                                            disabled={formik.isSubmitting}
                                        >
                                            {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
                                        </button>
                                    </div>

                                    <p className="small mt-3 ">
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