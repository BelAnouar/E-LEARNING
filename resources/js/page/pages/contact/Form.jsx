const Form = () => {
    return (
        <section>
            <h2 class="h1-responsive font-weight-bold text-center my-4">
                Contact us
            </h2>

            <p class="text-center w-responsive mx-auto mb-5">
                Do you have any questions? Please do not hesitate to contact us
                directly. Our team will come back to you within a matter of
                hours to help you.
            </p>

            <div className="container">
                <div className="row ">
                    <div className=" col-md-6 col-sm-12">
                        <div className="left">
                            <img
                                src="images/title/Contact_us.png"
                                width="100%"
                                alt="Contact-us" 
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <div className="right">
                            <form>
                            <div class="mb-3">
                                    <label
                                         class="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        
                                        placeholder="Name"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label
                                         class="form-label"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        
                                        placeholder="name@example.com"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label
                                         class="form-label"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        
                                        placeholder="+212 6***********"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label
                                        for="exampleFormControlTextarea1"
                                        class="form-label"
                                    >
                                        Example textarea
                                    </label>
                                    <textarea
                                        class="form-control"
                                         rows="4" cols="4"
                                  />
                                </div>
                                <button type="submit" class="btn btn-primary mb-3">Send Messege</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Form;
