import { useParams } from "react-router-dom"
import Footer from "../../components/footer"
import Navbar from "../../components/Navbar"
import Info from "./InfosLesson"
import TitleLesson from "./TitleLisson"
import { getCour } from "../../lib/helper"
import { useQuery } from "react-query"
import { Dna } from "react-loader-spinner"
import axiosClient from "../api/axios-client"


const Lesson = () => {
    const { idCours } = useParams()
    
  
    const { isLoading: courseLoading, isError: courseError, data: courseData, error } = useQuery(
        ["Cours", idCours], 
        () => getCour(idCours)
    )

    const { data: accessData, isLoading: accessLoading, isError: accessError } = useQuery(
        ['courseAccess', idCours], 
        () => axiosClient.get(`/check-course-access/${idCours}`).then(res => res.data),
        {
            enabled: !!idCours && !!courseData,
            retry: 1
        }
    )

    if (courseLoading) {
        return (
            <div className="position-absolute top-50 start-50 translate-middle">
                <Dna
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        )
    }

    if (accessLoading) {
        return (
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Checking access...</span>
                    </div>
                    <p className="mt-2 text-muted">Checking course access...</p>
                </div>
            </div>
        )
    }


    if (courseError) {
        return (
            <section id="lesson">
                <div className="container">
                    <Navbar />
                    <div className="alert alert-danger mt-4" role="alert">
                        <h4 className="alert-heading">Course Not Found</h4>
                        <p>The course you're looking for doesn't exist or has been removed.</p>
                        <hr />
                        <p className="mb-0">Please check the URL or go back to the courses list.</p>
                    </div>
                    <Footer />
                </div>
            </section>
        )
    }

    if (accessError) {
        return (
            <section id="lesson">
                <div className="container">
                    <Navbar />
                    <div className="alert alert-warning mt-4" role="alert">
                        <h4 className="alert-heading">Access Check Failed</h4>
                        <p>Unable to verify your access to this course. Please try refreshing the page.</p>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </button>
                    </div>
                    <Footer />
                </div>
            </section>
        )
    }

    
    const hasAccess = accessData ? (accessData.hasAccess || accessData.isFree) : false;
    const isFree = accessData ? accessData.isFree : (!courseData?.prix || courseData?.prix === "0" || courseData?.prix == 0);

    return (
        <section id="lesson">
            <div className="container">
                <Navbar />
               
                {courseData && accessData && (
                    <>
                       
                        <TitleLesson 
                            Cour={courseData} 
                            accessData={accessData}
                            hasAccess={hasAccess}
                            isFree={isFree}
                        />
                        
                
                        <Info 
                            idCour={courseData.idCours} 
                            accessData={accessData}
                            hasAccess={hasAccess}
                            isFree={isFree}
                        />
                    </>
                )}
                
                <Footer />
            </div>
        </section>
    )
}

export default Lesson