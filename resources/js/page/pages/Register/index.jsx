import { Box, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "../../lib/validate";
import axiosClient from "../api/axios-client";
import { useStateContext } from "../contexts/contextProvider";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
    const [location, setLocation] = useState(null);
    const { setUser, setToken, token } = useStateContext();
    const [errors, setErrors] = useState(null);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            name: "",
            country: "",
            agree: false,
            role: "",
        },
        validate: registerValidate,
        onSubmit,
    });
    async function onSubmit(values) {
        console.log(values);
        const payload = {
            fullName: values.fullName,
            name: values.name,
            email: values.email,
            password: values.password,
            country: values.country,
            role: "user",
        };

        await axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                console.log(data);
                setUser(data.user);
                setToken(data.token);

                return navigate("/SignIn");
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }

    async function fetchdata() {
        const request = await fetch(
            "https://ipinfo.io/json?token=4f04535df06377"
        );
        const datalocation = await request.json();
        setLocation(datalocation);
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <section className="vh-100" style={{ minHeight: "100vh" }}>
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
                                >
                                    <a href="/" className="nav-link">
                                        E-Simplifed
                                    </a>
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
                        <div
                            className="w-100 px-3 ms-xl-4"
                            style={{ maxHeight: "100vh", overflowY: "auto" }}
                        >
                            <form
                                style={{ width: "29rem", margin: "0 auto" }}
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="d-flex flex-row align-items-center navbar-nav fs-5 border-bottom border-2 mb-4">
                                    <a
                                        href="/Register"
                                        className="nav-link me-2"
                                        style={{
                                            color:
                                                window.location.pathname ===
                                                "/Register"
                                                    ? "#6f42c1"
                                                    : "inherit",
                                        }}
                                    >
                                        Register
                                    </a>
                                    <span className="me-2">/</span>
                                    <a
                                        href="/SignIn"
                                        className="nav-link"
                                        style={{
                                            color:
                                                window.location.pathname ===
                                                "/SignIn"
                                                    ? "#6f42c1"
                                                    : "inherit",
                                        }}
                                    >
                                        Sign in
                                    </a>
                                </div>
                                {errors && (
                                    <div className="text-danger">
                                        {Object.keys(errors).map((key) => (
                                            <p key={key}>{errors[key][0]}</p>
                                        ))}
                                    </div>
                                )}
                                <div className="form-floating mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingInput"
                                        placeholder="Full Name"
                                        name="fullName"
                                        {...formik.getFieldProps("fullName")}
                                    />
                                    {formik.errors.fullName &&
                                        formik.touched.fullName && (
                                            <span className="text-danger mt-1">
                                                {formik.errors.fullName}
                                            </span>
                                        )}
                                    <label htmlFor="floatingInput">
                                        Full Name
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingEmail"
                                        placeholder="Email"
                                        name="email"
                                        {...formik.getFieldProps("email")}
                                    />
                                    {formik.errors.email &&
                                        formik.touched.email && (
                                            <span className="text-danger mt-1">
                                                {formik.errors.email}
                                            </span>
                                        )}
                                    <label htmlFor="floatingEmail">Email</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingUsername"
                                        placeholder="Public Username"
                                        name="name"
                                        {...formik.getFieldProps("name")}
                                    />
                                    {formik.errors && (
                                        <span className="text-danger mt-1">
                                            {formik.errors.name}
                                        </span>
                                    )}
                                    <label htmlFor="floatingUsername">
                                        Public Username
                                    </label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        {...formik.getFieldProps("password")}
                                        type="password"
                                        className="form-control border border-dark rounded-0"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        name="password"
                                    />
                                    {formik.errors && (
                                        <span className="text-danger mt-1">
                                            {formik.errors.password}
                                        </span>
                                    )}
                                    <label htmlFor="floatingPassword">
                                        Password
                                    </label>
                                </div>

                                <div className="form-floating mb-3">
                                    <select
                                        className="form-select form-control border border-dark   rounded-0"
                                        id="selectCountry"
                                        name="country"
                                        aria-label="Default select example"
                                        {...formik.getFieldProps("country")}
                                    >
                                        {location && (
                                            <option
                                                defaultValue={location.country}
                                            >
                                                {location.country}
                                            </option>
                                        )}
                                    </select>
                                    <label
                                        className="form-label"
                                        htmlFor="selectCountry"
                                    >
                                        country
                                    </label>
                                </div>

                                <div className="form-check fs-4 ">
                                    <input
                                        className="form-check-input rounded-0"
                                        type="checkbox"
                                        id="defaultCheck2"
                                        {...formik.getFieldProps("agree")}
                                        defaultChecked={true}
                                    />
                                    <label
                                        className="form-check-label text-muted fs-6"
                                        htmlFor="defaultCheck2"
                                    >
                                        I agree
                                    </label>
                                </div>
                                {formik.errors && (
                                    <span className="text-danger mt-1">
                                        {formik.errors.agree}
                                    </span>
                                )}

                                <Typography
                                    variant="caption"
                                    display="block"
                                    className="small text-muted mb-3"
                                >
                                    By creating an account, you agree to the
                                    <a href="#" className="text-success ">
                                        Terms of Service and Honor Code{" "}
                                    </a>
                                    and you acknowledge that E-simplified and
                                    each Member process your personal data in
                                    accordance with the{" "}
                                    <a href="#" className="text-success">
                                        {" "}
                                        Privacy Policy{" "}
                                    </a>{" "}
                                    .
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
