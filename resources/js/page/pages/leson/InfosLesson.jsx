import React from 'react';
import { useQuery } from 'react-query';
import { getWeeks } from '../../lib/weeks';
import VideoLesson from './VideoLesson';
import WeekAccordion from './WeekAccordion';
import axiosClient from '../api/axios-client';

export default function Info(props) {
    const { idCour } = props;

    const { data: accessData, isLoading: accessLoading, isError: accessError } = useQuery(
        ['courseAccess', idCour], 
        () => axiosClient.get(`/check-course-access/${idCour}`).then(res => res.data),
        {
            enabled: !!idCour,
            retry: 1
        }
    );

    const { data: weeksData, isLoading: weeksLoading, isError: weeksError } = useQuery(
        ['weeks', idCour], 
        getWeeks,
        {
            enabled: accessData?.hasAccess || accessData?.isFree
        }
    );

    const [selectedFile, setSelectedFile] = React.useState(null);

    if (accessLoading) return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (accessError) {
        return (
            <div className="container">
                <div className="alert alert-danger" role="alert">
                    Error checking course access. Please try again.
                </div>
            </div>
        );
    }

   
    if (!accessData?.hasAccess && !accessData?.isFree) {
        return (
            <section className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className="text-center py-5">
                            <div className="locked-content bg-light p-5 rounded shadow">
                                <i className="fas fa-lock fa-3x text-muted mb-4"></i>
                                <h3 className="text-muted mb-3">This content is locked</h3>
                                <p className="text-muted mb-4">
                                    Please purchase this course to access all lessons and materials.
                                </p>
                                <div className="d-flex justify-content-center gap-3">
                                    <button 
                                        className="btn btn-primary btn-lg"
                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    >
                                        <i className="fas fa-shopping-cart me-2"></i>
                                        Purchase Course
                                    </button>
                                    <button className="btn btn-outline-secondary btn-lg">
                                        <i className="fas fa-info-circle me-2"></i>
                                        Course Info
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (weeksLoading) return (
        <div className="container">
            <div className="text-center py-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading course content...</span>
                </div>
            </div>
        </div>
    );

    if (weeksError) return (
        <div className="container">
            <div className="alert alert-warning" role="alert">
                Error loading course weeks. Please refresh the page.
            </div>
        </div>
    );

    return (
        <section className='container'>
            <div className='row'>
                <div className='col-md-4'>
                    <div className="course-content-sidebar">
                        <div className="d-flex align-items-center mb-3">
                            <i className="fas fa-unlock text-success me-2"></i>
                            <span className="text-success fw-bold">Course Unlocked</span>
                        </div>
                        {weeksData && weeksData.map((week, index) => (
                            <WeekAccordion
                                key={index}
                                week={week}
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                            />
                        ))}
                    </div>
                </div>
                <div className='col-md-8'>
                    <VideoLesson file={selectedFile} />
                </div>
            </div>
        </section>
    );
}