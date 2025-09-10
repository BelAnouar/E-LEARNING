import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/Navbar";
import { useStateContext } from "../contexts/contextProvider";
import CardCourses from "./cardCourses";
import CardDev from "./cardDev";
import Feature from "./feature";
import Subscribe from "./subscribe";
import Title from "./title";
import { useQuery } from "react-query";
import { getCours } from "../../lib/helper";
import { Dna } from "react-loader-spinner";

export default function Home() {
    const { user, token } = useStateContext();

    const { isLoading, isError, data, error } = useQuery("Cours", getCours);

    if (isLoading)
        return (
            <div className="position-absolute top-50 start-50 translate-middle">
                <Dna
                    visible={true}
                    height="
   100"
                    width="100"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        );
    if (isError) return <div>Got Error{error}</div>;
   

    return (
        <section id="homePage">
            <div className="container">
                <Navbar />
                <Title />
                <Feature />
                <CardDev />
                <CardCourses Cours={data} />
                <Subscribe />
                <Footer />
            </div>
        </section>
    );
}
