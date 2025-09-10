"use client";

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const HeroBanner = () => {
  const [showCatalogForm, setShowCatalogForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBrowsePrograms = () => {
    const programsSection = document.getElementById('programs-section');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestCatalog = () => {
    setShowCatalogForm(!showCatalogForm);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Catalog request submitted successfully! You will receive it via email shortly.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setFormData({ name: '', email: '' });
      setShowCatalogForm(false);
      
    } catch (error) {
      toast.error('Failed to submit catalog request. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-light py-5">
        <div className="container">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-body p-0">
              <div className="row g-0 min-vh-75">
             
                <div className="col-lg-6 d-flex align-items-center">
                  <div className="p-4 p-md-5">
                    <h1 className="display-3 fw-bold text-dark mb-4" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                      Programs & Degrees
                    </h1>
                    <p className="lead text-muted mb-4" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
                      Discover our comprehensive range of academic programs designed to prepare you for success in today's competitive landscape. From undergraduate degrees to advanced certifications, find the perfect path to achieve your career goals.
                    </p>
                    
                    <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                      <button 
                        className="btn btn-dark btn-lg px-4 py-3 rounded-3 fw-semibold"
                        onClick={handleBrowsePrograms}
                        style={{ minWidth: '160px' }}
                      >
                        Browse Programs
                      </button>
                      <button 
                        className="btn btn-outline-dark btn-lg px-4 py-3 rounded-3 fw-semibold"
                        onClick={handleRequestCatalog}
                        style={{ minWidth: '160px' }}
                      >
                        Request Catalog
                      </button>
                    </div>

                    <div className={`collapse ${showCatalogForm ? 'show' : ''}`}>
                      <div className="card border rounded-3 mt-4">
                        <div className="card-header bg-light border-bottom-0">
                          <h5 className="card-title mb-0 fw-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                            Request Course Catalog
                          </h5>
                        </div>
                        <div className="card-body">
                          <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                              <label htmlFor="catalogName" className="form-label fw-medium">
                                Full Name
                              </label>
                              <input
                                type="text"
                                className={`form-control rounded-2 ${formErrors.name ? 'is-invalid' : ''}`}
                                id="catalogName"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                disabled={isSubmitting}
                              />
                              {formErrors.name && (
                                <div className="invalid-feedback">
                                  {formErrors.name}
                                </div>
                              )}
                            </div>
                            
                            <div className="mb-4">
                              <label htmlFor="catalogEmail" className="form-label fw-medium">
                                Email Address
                              </label>
                              <input
                                type="email"
                                className={`form-control rounded-2 ${formErrors.email ? 'is-invalid' : ''}`}
                                id="catalogEmail"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                disabled={isSubmitting}
                              />
                              {formErrors.email && (
                                <div className="invalid-feedback">
                                  {formErrors.email}
                                </div>
                              )}
                            </div>
                            
                            <div className="d-flex gap-2">
                              <button
                                type="submit"
                                className="btn btn-dark rounded-2 fw-semibold px-4"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Submitting...
                                  </>
                                ) : (
                                  'Submit Request'
                                )}
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-secondary rounded-2 fw-semibold px-4"
                                onClick={() => setShowCatalogForm(false)}
                                disabled={isSubmitting}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              
                <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="text-center p-5">
                    <div 
                      className="bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-center mx-auto"
                      style={{ width: '300px', height: '300px' }}
                    >
                      <div className="text-center">
                        <div className="mb-3">
                          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="#0f1420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h4 className="fw-bold text-dark mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                          Academic Excellence
                        </h4>
                        <p className="text-muted mb-0">
                          Comprehensive programs designed for your success
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </>
  );
};

export default HeroBanner;