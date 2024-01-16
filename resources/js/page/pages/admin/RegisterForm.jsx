


import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "../../lib/validate";
import axiosClient from "../api/axios-client";
import { toast } from "react-toastify";





const RegisterForm = () => {
    const [location,setLocation]=useState(null)
    
    const [errors, setErrors] = useState(null)
    
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            name: "",
            country:"",agree:false,role:""
        }, validate:registerValidate,
        onSubmit,
    });
    async function onSubmit(values) {
        console.log(values);
        const payload = {fullName:values.fullName,
            name: values.name,
            email: values.email,
            password:values.password,
            country:"MA",role:"admin",
            
          }
         
 
      
     
   await axiosClient.post('/signup',payload)
        .then(({data}) => {
        
        if(data){
            toast("Register",{hideProgressBar:true,autoClose:4000,type:"success",position:"top-center"})
        }
        
          
        })
        .catch(err => {
          console.log(err);
           const response = err.response;
           if (response && response.status === 422) {
             setErrors(response.data.errors)
           }
         })
        
        
    }
  
    
         async function fetchdata(){
        const request = await fetch("https://ipinfo.io/json?token=4f04535df06377")
        const datalocation = await request.json()
        setLocation(datalocation)
    }

    useEffect (() => {
       
        fetchdata()
    },[])
console.log(location);

  return (
    <section className="w-70 col-md-11 relative lg:h-80vh h-15vh m-3 p-4 border rounded-3 bg-white">
    <h2 className="mb-3 font-bold ">Register as Admin</h2>
    <form className="row "
    
    onSubmit={formik.handleSubmit}
>

    {errors&&<div className="text-danger">
    {Object.keys(errors).map(key => (
<p key={key}>{errors[key][0]}</p>
))}
    </div>}
    <div className="form-floating mb-3 col-lg-5">
        <input
            type="text"
            className="form-control border border-dark rounded-0"
            id="floatingInput"
            placeholder="Full Name"
            name="fullName"
            {...formik.getFieldProps("fullName")}
        />
          {formik.errors.fullName && formik.touched.fullName && <span className="text-danger mt-1">{formik.errors.fullName}</span>}
        <label htmlFor="floatingInput">Full Name</label>
    </div>
    <div className="form-floating mb-3 col-lg-5">
        <input
            type="email"
            className="form-control border border-dark rounded-0"
            id="floatingEmail"
            placeholder="Email"
            name="email"
            {...formik.getFieldProps("email")}
        />
          {formik.errors.email && formik.touched.email &&<span className="text-danger mt-1">{formik.errors.email}</span>}
        <label htmlFor="floatingEmail">Email</label>
    </div>

    <div className="form-floating mb-3 col-lg-5">
        <input
            type="text"
            className="form-control border border-dark rounded-0"
            id="floatingUsername"
            placeholder="Public Username"
            name="name"
            {...formik.getFieldProps("name")}
        />
          {formik.errors && <span className="text-danger mt-1">{formik.errors.name}</span>}
        <label htmlFor="floatingUsername">
            Public Username
        </label>
    </div>
 


    <div className="form-floating mb-3 col-lg-5">
        <input
             {...formik.getFieldProps('password')}
            type="password"
            className="form-control border border-dark rounded-0"
            id="floatingPassword"
            placeholder="Password"
            name="password"
        />
          {formik.errors && <span className="text-danger mt-1">{formik.errors.password}</span>}
        <label htmlFor="floatingPassword">
            Password
        </label>
    </div>

    <div className="form-floating mb-3 col-lg-5">
        <select
            className="form-select form-control border border-dark   rounded-0"
            id="selectCountry" name="country"
            aria-label="Default select example" {...formik.getFieldProps("country")}
        >
            
           {location&& <option defaultValue={location.country}>{location.country}</option>}
        </select>
        <label
            className="form-label"
            htmlFor="selectCountry"
        >
            country
        </label>
    </div>

    <div className="form-check fs-4 ms-3">
    <input
  className="form-check-input rounded-0"
  type="checkbox"
  id="defaultCheck2"
  {...formik.getFieldProps("agree")}
  defaultChecked={true} 
/>
        <label
            className="form-check-label text-muted fs-6 "
            htmlFor="defaultCheck2"
        >
            I agree
        </label>
    </div>
    {formik.errors && <span className="text-danger mt-1">{formik.errors.agree}</span>}

    <div className="pt-1 mb-4">
        <button
            className="btn-login  mt-2 
             rounded-0"
            type="submit"
        >
            Create an account
        </button>
        
        
    </div>
</form></section>
  );
};

export default RegisterForm;
