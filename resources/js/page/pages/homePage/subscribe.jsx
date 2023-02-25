const Subscribe = () => {
    return (
        <section id="subcribe" className="rounded">
        <div className="row">
        <div className="col-sm-12">
        <div className="content">
            <h2 className="fs-1">Subscribe for get update evey new couses </h2>
           
            <div className="input-group   ">
                <input
                    type="text"
                    className="form-control"
                    placeholder="entrer your email"
                    aria-label="Recipient's username"
                 aria-describedby="button-subscribe"
                />
                <button
                    className="btn  "
                    type="button"
                    id="button-subscribe"
                    
                >
                    Subscribe
                </button></div></div>
            </div></div>
        </section>
    );
};

export default Subscribe;
