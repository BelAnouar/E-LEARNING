import React from "react";
import { useQuery, useQueryClient } from "react-query";
import Payement from "../../components/modalPayement";
import { getPayemments } from "../../lib/payemment";
import axiosClient from "../api/axios-client";

const TitleLesson = (props) => {
    const { Cour: data, accessData, hasAccess = false, isFree = false } = props;

    const FetcherData = useQuery("payement", getPayemments);
    const queryClient = useQueryClient();

    const [showPaymentModal, setShowPaymentModal] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);

  
    if (!data || !accessData) {
        return (
            <section className="container" id="TileLesson">
                <div className="container ms-2">
                    <div className="bg-light p-3 mt-3 rounded">
                        <div className="text-center py-4">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading course information...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const handlePurchaseClick = () => {
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = async () => {
        setIsProcessing(true);
        try {
         
            const response = await axiosClient.post("/payment-success", { 
                course_id: data.idCours 
            });

            
            setShowPaymentModal(false);

       
            queryClient.invalidateQueries(['courseAccess', data.idCours]);
            queryClient.invalidateQueries("user");
            
            alert("Successfully purchased and enrolled in the course!");
            
        } catch (error) {
            console.error("Error enrolling user:", error);
            alert("Error processing enrollment. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePaymentCancel = () => {
        setShowPaymentModal(false);
    };

    const handleEnrollFree = async () => {
        setIsProcessing(true);
        try {
            await axiosClient.post("/payment-success", { 
                course_id: data.idCours,
                amount: 0 
            });
            
            queryClient.invalidateQueries(['courseAccess', data.idCours]);
            queryClient.invalidateQueries("user");
            
            alert("Successfully enrolled in the free course!");
        } catch (error) {
            console.error("Error enrolling in free course:", error);
            alert("Error enrolling in course. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const renderActionButton = () => {
      
        if (hasAccess) {
            return (
                <div className="mt-3">
                    <span className="badge bg-success fs-6 me-3">
                        <i className="fas fa-check me-1"></i>
                        Enrolled
                    </span>
                    <span className="text-success">
                        <i className="fas fa-unlock me-2"></i>
                        You have access to this course
                    </span>
                </div>
            );
        }

       
        if (isFree) {
            return (
                <button 
                    className="btn btn-success mt-3"
                    onClick={handleEnrollFree}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                <span className="visually-hidden">Processing...</span>
                            </div>
                            Enrolling...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-play me-2"></i>
                            Enroll for free
                        </>
                    )}
                </button>
            );
        }

        
        return (
            <div className="mt-3">
                <span className="badge bg-warning text-dark fs-6 me-3">
                    ${data.prix}
                </span>
                <button 
                    className="btn btn-primary"
                    onClick={handlePurchaseClick}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                <span className="visually-hidden">Processing...</span>
                            </div>
                            Processing...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-shopping-cart me-2"></i>
                            Purchase Course
                        </>
                    )}
                </button>
            </div>
        );
    };

    return (
        <section className="container" id="TileLesson">
            <div className="container ms-2">
                <div className="bg-light p-3 mt-3 rounded shadow-sm">
                    <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1 me-4">
                            <h1 className="mt-5 fw-bold text-primary">{data.titre}</h1>
                            <h3 className="my-3 text-secondary">
                                <i className="fas fa-user-tie me-2"></i>
                                {data.enseignant}
                            </h3>
                            <h5 className="text-muted small mb-4">
                                <i className="fas fa-quote-left me-2"></i>
                                {data.description}
                            </h5>
                            
                            {renderActionButton()}
                        </div>
                        <img 
                            src={"/" + data.image} 
                            className="w-25 rounded-4 my-2 shadow-sm" 
                            alt="course"
                            style={{ minWidth: '200px', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>

            {showPaymentModal && (
                <Payement
                    courseData={data}
                    onSuccess={handlePaymentSuccess}
                    onCancel={handlePaymentCancel}
                    show={showPaymentModal}
                />
            )}
        </section>
    )
}

export default TitleLesson;