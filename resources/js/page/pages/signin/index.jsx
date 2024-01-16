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
   const navigate=useNavigate()
  const [message, setMessage] = useState(null)
    const formik=useFormik({
        initialValues:{
            email:"",password:""
        },validate:login_validate
        ,onSubmit
    })
    
    console.log(formik.errors);
   async function onSubmit(values){
    const payload = {
        email: values.email,
        password: values.password,
      }
     await axiosClient.post('/login', payload)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token);
          if(data.user.role=="user") return navigate("/");
          return  navigate("/admin")

        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setMessage(response.data.message)
          }
        })
        
     
    }
       
    
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
                            <form style={{ width: "23rem" }} onSubmit={formik.handleSubmit}>
                                <div className="d-flex flex-row navbar-nav fs-5 border-bottom border-2 mb-4">
                                    <a href="/Register" className="nav-link me-2 ">Register</a>
                                    <a href="/SignIn" className="nav-link">Sign in</a>
                                </div>

                    {message &&<p>{message}</p>}
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingPassword"
                                        placeholder="Username or Email" name="email"  {...formik.getFieldProps('email')}
                                    />
                                    {formik.errors && <span className="text-danger mt-1">{formik.errors.email}</span>}
                                    <label htmlFor="floatingPassword">Username or Email</label>
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
                                    {formik.errors && <span className="text-danger mt-1">{formik.errors.password}</span>}
                                    <label htmlFor="floatingPassword">
                                        Password
                                    </label>
                                </div>


                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with:</p>
            <button type="button" className="btn  btn-outline-danger me-2">
             Google  <GoogleIcon fontSize="medium"/>
            </button>

            <button type="button" className="btn btn-outline-dark me-2">
            GitHub <GitHubIcon fontSize="medium"/>
            </button>

            
          </div>

                                
                          
                           <div className="d-flex flex-row ">
                                <div className="me-3">
                                    <button
                                        className="btn-login  mt-2
                                         rounded-0"
                                        type="submit"
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


