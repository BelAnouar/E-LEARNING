



const FormRegister =()=>{

    
    
    return(
        <div className=" align-items-center  px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
        <form style={{ width: "23rem" }} onSubmit={Submit} >
            <div className="d-flex flex-row navbar-nav fs-5 border-bottom border-2 mb-4">
                <a href="/Register" className="nav-link me-2 ">Register</a>
                <a href="/SignIn" className="nav-link">Sign in</a>
            </div>

            <div className="form-floating mb-3 ">
                <input onChange={handleChange}
                    type="text"
                    className="form-control border border-dark rounded-0"
                    id="floatingInput"
                    placeholder="Full Name"
                    value={values.fullName}  name="fullName"
                    
                />
                <label for="floatingInput">Full Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange}
                    type="email"
                    className="form-control border border-dark rounded-0"
                    id="floatingEmail"
                    placeholder="Email" value={values.email} name="email"
                />
                <label for="floatingEmail">Email</label>
            </div>

            <div className="form-floating mb-3">
                <input onChange={handleChange}
                    type="text"
                    className="form-control border border-dark rounded-0"
                    id="floatingUsername"
                    placeholder="Public Username" name="name" value={values.name}
                />
                <label for="floatingUsername">
                    Public Username
                </label>
            </div>

            <div className="form-floating mb-3">
                <input onChange={handleChange}
                    type="password"
                    className="form-control border border-dark rounded-0"
                    id="floatingPassword"
                    placeholder="Password" value={values.password} name="password"
                />
                <label for="floatingPassword">
                    Password
                </label>
            </div>


<div className="form-floating mb-3">
    <input
        type="text"
        className="form-control border border-dark rounded-0"
        id="floatingCountry"
        placeholder="Country"
        name="country"
        value={location ? location.country : ""}
        disabled
        {...formik.getFieldProps("country")}
    />
    {formik.errors.country && formik.touched.country && (
        <span className="text-danger mt-1">
            {formik.errors.country}
        </span>
    )}
    <label htmlFor="floatingCountry">
        Country
    </label>
</div>

            <div className="form-check fs-4 ">
                <input onChange={handleChange}
                    className="form-check-input  rounded-0  "
                    type="checkbox"
                    id="defaultCheck2" 
                />
                <label
                    className="form-check-label text-muted fs-6"
                    htmlFor="defaultCheck2"
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
                     type="submit"
                >
                    Create an account
                </button>
            </div>

          
        </form>
    </div>

    )
}



export default FormRegister