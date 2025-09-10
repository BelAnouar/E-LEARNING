"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
  Modal,
  Spinner,
  Alert,
  Pagination,
  Dropdown,
  ButtonGroup,
  ProgressBar,
  ListGroup,
  Accordion
} from 'react-bootstrap';
import { Search, Filter, Grid, List, Heart, Star, Clock, Users, BookOpen, Award, MapPin, Calendar, DollarSign, CheckCircle, X } from 'lucide-react';

const ProgramSkeleton = () => (
  <Card className="h-100">
    <div className="position-relative" style={{ height: '200px', backgroundColor: '#f8f9fa' }}>
      <Spinner animation="border" className="position-absolute top-50 start-50 translate-middle" />
    </div>
    <Card.Body>
      <div className="mb-2" style={{ height: '24px', backgroundColor: '#e9ecef', borderRadius: '4px' }}></div>
      <div className="mb-2" style={{ height: '16px', backgroundColor: '#e9ecef', borderRadius: '4px', width: '60%' }}></div>
      <div className="mb-3" style={{ height: '60px', backgroundColor: '#e9ecef', borderRadius: '4px' }}></div>
      <div className="d-flex justify-content-between">
        <div style={{ height: '16px', backgroundColor: '#e9ecef', borderRadius: '4px', width: '40%' }}></div>
        <div style={{ height: '32px', backgroundColor: '#e9ecef', borderRadius: '4px', width: '80px' }}></div>
      </div>
    </Card.Body>
  </Card>
);

const ProgramCard = ({ program, onViewDetails, onSave, onCompare, isSaved, isCompared }) => (
  <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
    <div className="position-relative">
      <Card.Img 
        variant="top" 
        src={program.image} 
        alt={program.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="position-absolute top-0 end-0 p-2">
        <Button
          variant="light"
          size="sm"
          className="rounded-circle p-2 me-1"
          onClick={() => onSave(program.id)}
        >
          <Heart size={16} fill={isSaved ? '#dc3545' : 'none'} color={isSaved ? '#dc3545' : '#6c757d'} />
        </Button>
      </div>
      {program.scholarships && (
        <Badge bg="success" className="position-absolute top-0 start-0 m-2">
          Scholarships Available
        </Badge>
      )}
    </div>
    <Card.Body className="d-flex flex-column">
      <div className="mb-2">
        <Badge bg="outline-primary" className="me-2">{program.level}</Badge>
        <Badge bg="outline-secondary">{program.category}</Badge>
      </div>
      <Card.Title className="h5 mb-2">{program.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        <MapPin size={14} className="me-1" />
        {program.university}
      </Card.Subtitle>
      <Card.Text className="text-muted small flex-grow-1">
        {program.description}
      </Card.Text>
      <div className="mb-3">
        <div className="d-flex align-items-center mb-1">
          <Clock size={14} className="me-2" />
          <small className="text-muted">{program.duration}</small>
        </div>
        <div className="d-flex align-items-center mb-1">
          <DollarSign size={14} className="me-2" />
          <small className="text-muted">{program.tuition}</small>
        </div>
        <div className="d-flex align-items-center">
          <Star size={14} className="me-1" fill="#ffc107" color="#ffc107" />
          <small className="text-muted">{program.rating} ({program.reviews} reviews)</small>
        </div>
      </div>
      <div className="d-flex gap-2">
        <Button variant="primary" onClick={() => onViewDetails(program)} className="flex-grow-1">
          View Details
        </Button>
        <Button
          variant={isCompared ? "success" : "outline-secondary"}
          onClick={() => onCompare(program.id)}
        >
          {isCompared ? <CheckCircle size={16} /> : "Compare"}
        </Button>
      </div>
    </Card.Body>
  </Card>
);

const ProgramListItem = ({ program, onViewDetails, onSave, onCompare, isSaved, isCompared }) => (
  <Card className="mb-3 shadow-sm border-0">
    <Row className="g-0">
      <Col md={3}>
        <Card.Img 
          src={program.image} 
          alt={program.title}
          style={{ height: '200px', objectFit: 'cover' }}
          className="rounded-start"
        />
      </Col>
      <Col md={9}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <div className="mb-2">
                <Badge bg="outline-primary" className="me-2">{program.level}</Badge>
                <Badge bg="outline-secondary">{program.category}</Badge>
                {program.scholarships && (
                  <Badge bg="success" className="ms-2">Scholarships Available</Badge>
                )}
              </div>
              <Card.Title className="h4 mb-1">{program.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <MapPin size={16} className="me-1" />
                {program.university} • {program.location}
              </Card.Subtitle>
            </div>
            <Button
              variant="light"
              size="sm"
              className="rounded-circle p-2"
              onClick={() => onSave(program.id)}
            >
              <Heart size={16} fill={isSaved ? '#dc3545' : 'none'} color={isSaved ? '#dc3545' : '#6c757d'} />
            </Button>
          </div>
          <Card.Text className="mb-3">{program.description}</Card.Text>
          <Row className="mb-3">
            <Col sm={6} md={3}>
              <div className="d-flex align-items-center mb-2">
                <Clock size={16} className="me-2 text-muted" />
                <small>{program.duration}</small>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="d-flex align-items-center mb-2">
                <DollarSign size={16} className="me-2 text-muted" />
                <small>{program.tuition}</small>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="d-flex align-items-center mb-2">
                <Star size={16} className="me-1 text-warning" fill="currentColor" />
                <small>{program.rating} ({program.reviews})</small>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="d-flex align-items-center mb-2">
                <Users size={16} className="me-2 text-muted" />
                <small>{program.format}</small>
              </div>
            </Col>
          </Row>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={() => onViewDetails(program)}>
              View Details
            </Button>
            <Button
              variant={isCompared ? "success" : "outline-secondary"}
              onClick={() => onCompare(program.id)}
            >
              {isCompared ? <CheckCircle size={16} /> : "Compare"}
            </Button>
          </div>
        </Card.Body>
      </Col>
    </Row>
  </Card>
);

const ApplicationModal = ({ show, onHide, program }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    previousEducation: '',
    motivation: '',
    startDate: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('bearer_token') : null;
      const payload = {
        programId: program?.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        previousEducation: formData.previousEducation,
        motivation: formData.motivation,
        startDate: formData.startDate,
      };
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to submit');

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onHide();
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          previousEducation: '',
          motivation: '',
          startDate: '',
          resume: null,
        });
      }, 1500);
    } catch (err) {
      // Show a simple inline error using bootstrap Alert
      setShowSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  if (showSuccess) {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center py-5">
          <CheckCircle size={64} className="text-success mb-3" />
          <h4>Application Submitted!</h4>
          <p className="text-muted mb-0">
            Thank you for your interest in {program?.title}. We'll review your application and get back to you soon.
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Apply to {program?.title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Previous Education *</Form.Label>
            <Form.Select
              name="previousEducation"
              value={formData.previousEducation}
              onChange={handleChange}
              required
            >
              <option value="">Select your highest education level</option>
              <option value="high-school">High School</option>
              <option value="associate">Associate Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="doctorate">Doctorate</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preferred Start Date</Form.Label>
            <Form.Select
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            >
              <option value="">Select start date</option>
              <option value="fall-2024">Fall 2024</option>
              <option value="spring-2025">Spring 2025</option>
              <option value="summer-2025">Summer 2025</option>
              <option value="fall-2025">Fall 2025</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Resume/CV</Form.Label>
            <Form.Control
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
            />
            <Form.Text className="text-muted">
              Accepted formats: PDF, DOC, DOCX (max 5MB)
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Why are you interested in this program? *</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              placeholder="Tell us about your goals and why this program is right for you..."
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const ProgramDetailsModal = ({ show, onHide, program, onApply }) => {
  if (!program) return null;

  // Safely access highlights and requirements with fallbacks
  const highlights = program.highlights || [];
  const requirements = program.requirements || [];

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{program.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={8}>
            <Card.Img 
              src={program.image} 
              alt={program.title}
              className="mb-4 rounded"
              style={{ height: '300px', objectFit: 'cover', width: '100%' }}
            />
            
            <div className="mb-4">
              <h5>About This Program</h5>
              <p>{program.description}</p>
            </div>

            {highlights.length > 0 && (
              <div className="mb-4">
                <h5>Program Highlights</h5>
                <ListGroup variant="flush">
                  {highlights.map((highlight, index) => (
                    <ListGroup.Item key={index} className="px-0">
                      <CheckCircle size={16} className="text-success me-2" />
                      {highlight}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}

            {requirements.length > 0 && (
              <div className="mb-4">
                <h5>Admission Requirements</h5>
                <ListGroup variant="flush">
                  {requirements.map((requirement, index) => (
                    <ListGroup.Item key={index} className="px-0">
                      <CheckCircle size={16} className="text-primary me-2" />
                      {requirement}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
          </Col>
          
          <Col lg={4}>
            <Card className="mb-4">
              <Card.Body>
                <div className="mb-3">
                  <Badge bg="outline-primary" className="me-2">{program.level}</Badge>
                  <Badge bg="outline-secondary">{program.category}</Badge>
                  {program.scholarships && (
                    <Badge bg="success" className="d-block mt-2">Scholarships Available</Badge>
                  )}
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <MapPin size={16} className="me-2 text-muted" />
                    <span>{program.location}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Clock size={16} className="me-2 text-muted" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Users size={16} className="me-2 text-muted" />
                    <span>{program.format}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <DollarSign size={16} className="me-2 text-muted" />
                    <span>{program.tuition}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Calendar size={16} className="me-2 text-muted" />
                    <span>Starts: {program.startDate}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Star size={16} className="me-2 text-warning" fill="currentColor" />
                    <span>{program.rating}/5 ({program.reviews} reviews)</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Award size={16} className="me-2 text-muted" />
                    <span>{program.accreditation}</span>
                  </div>
                </div>

                <Alert variant="info" className="small">
                  <strong>Application Deadline:</strong><br />
                  {program.applicationDeadline}
                </Alert>

                <div className="d-grid">
                  <Button variant="primary" size="lg" onClick={() => onApply(program)}>
                    Apply Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

const ComparisonModal = ({ show, onHide, programs, comparedPrograms, onRemoveFromComparison }) => {
  const comparedProgramsData = programs.filter(p => comparedPrograms.includes(p.id));

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Program Comparison ({comparedProgramsData.length})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {comparedProgramsData.length === 0 ? (
          <div className="text-center py-5">
            <BookOpen size={64} className="text-muted mb-3" />
            <h5>No programs selected for comparison</h5>
            <p className="text-muted">Add programs to your comparison to see them here.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th style={{ width: '200px' }}></th>
                  {comparedProgramsData.map(program => (
                    <th key={program.id} className="text-center">
                      <div className="position-relative">
                        <Button
                          variant="light"
                          size="sm"
                          className="position-absolute top-0 end-0 rounded-circle p-1"
                          onClick={() => onRemoveFromComparison(program.id)}
                        >
                          <X size={12} />
                        </Button>
                        <Card.Img 
                          src={program.image} 
                          alt={program.title}
                          className="mb-2 rounded"
                          style={{ height: '120px', objectFit: 'cover' }}
                        />
                        <h6 className="mb-1">{program.title}</h6>
                        <small className="text-muted">{program.university}</small>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Level</strong></td>
                  {comparedProgramsData.map(program => (
                    <td key={program.id} className="text-center">
                      <Badge bg="outline-primary">{program.level}</Badge>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Duration</strong></td>
                  {comparedProgramsData.map(program => (
                    <td key={program.id} className="text-center">{program.duration}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Format</strong></td>
                  {comparedProgramsData.map(program => (
                    <td key={program.id} className="text-center">{program.format}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Tuition</strong></td>
                  {comparedProgramsData.map(program => (
                    <td key={program.id} className="text-center">{program.tuition}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Rating</strong></td>
                  {comparedProgramsData.map(program => (
                    <td key={program.id} className="text-center">
                      <div className="d-flex align-items-center justify-content-center">
                        <Star size={14} className="text-warning me-1" fill="currentColor" />
                        {program.rating}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Scholarships</strong></td>
                  {comparedProgramsData.map(program => (
                    <td key={program.id} className="text-center">
                      {program.scholarships ? (
                        <CheckCircle size={16} className="text-success" />
                      ) : (
                        <X size={16} className="text-muted" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Part-time Available</strong></td>
                  {comparedProgramsData.map(program => (
                    <td key={program.id} className="text-center">
                      {program.partTime ? (
                        <CheckCircle size={16} className="text-success" />
                      ) : (
                        <X size={16} className="text-muted" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Online Available</strong></td>
                  {comparedProgramsData.map(program => (
                    <td key={program.id} className="text-center">
                      {program.online ? (
                        <CheckCircle size={16} className="text-success" />
                      ) : (
                        <X size={16} className="text-muted" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Application Deadline</strong></td>
                  {comparedProgramsData.map(program => (
                    <td key={program.id} className="text-center">{program.applicationDeadline}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export const ProgramsAndDegrees = () => {
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [savedPrograms, setSavedPrograms] = useState([]);
  const [comparedPrograms, setComparedPrograms] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loadError, setLoadError] = useState('');

  const itemsPerPage = 6;

  useEffect(() => {
    const controller = new AbortController();
    const token = typeof window !== 'undefined' ? localStorage.getItem('bearer_token') : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    async function fetchAll() {
      try {
        setIsLoading(true);
        setLoadError('');
        const res = await fetch('/api/programs', { headers, signal: controller.signal });
        if (!res.ok) throw new Error('Failed to load programs');
        const data = await res.json();
        setPrograms(Array.isArray(data) ? data : data.items || []);
      } catch (e) {
        // Do not fallback to mock; surface error and show empty state
        setPrograms([]);
        setLoadError('Failed to load programs.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchAll();
    return () => controller.abort();
  }, []);

  const categories = [...new Set(programs.map(p => p.category))];
  const levels = [...new Set(programs.map(p => p.level))];
  const formats = [...new Set(programs.map(p => p.format))];

  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          program.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || program.level === selectedLevel;
      const matchesFormat = selectedFormat === 'all' || program.format === selectedFormat;
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const tuition = parseInt(String(program.tuition || '').replace(/[^0-9]/g, '')) || 0;
        switch (priceRange) {
          case 'under-20k':
            matchesPrice = tuition < 20000; break;
          case '20k-40k':
            matchesPrice = tuition >= 20000 && tuition <= 40000; break;
          case '40k-60k':
            matchesPrice = tuition > 40000 && tuition <= 60000; break;
          case 'over-60k':
            matchesPrice = tuition > 60000; break;
        }
      }
      return matchesSearch && matchesCategory && matchesLevel && matchesFormat && matchesPrice;
    });
  }, [programs, searchTerm, selectedCategory, selectedLevel, selectedFormat, priceRange]);

  const sortedPrograms = useMemo(() => {
    const sorted = [...filteredPrograms];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => {
          const aPrice = parseInt(String(a.tuition || '').replace(/[^0-9]/g, '')) || 0;
          const bPrice = parseInt(String(b.tuition || '').replace(/[^0-9]/g, '')) || 0;
          return aPrice - bPrice;
        });
      case 'price-high':
        return sorted.sort((a, b) => {
          const aPrice = parseInt(String(a.tuition || '').replace(/[^0-9]/g, '')) || 0;
          const bPrice = parseInt(String(b.tuition || '').replace(/[^0-9]/g, '')) || 0;
          return bPrice - aPrice;
        });
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'name':
        return sorted.sort((a, b) => String(a.title).localeCompare(String(b.title)));
      default:
        return sorted;
    }
  }, [filteredPrograms, sortBy]);

  const totalPages = Math.ceil(sortedPrograms.length / itemsPerPage) || 1;
  const currentPrograms = sortedPrograms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setShowDetailsModal(true);
  };

  const handleApply = (program) => {
    setSelectedProgram(program);
    setShowDetailsModal(false);
    setShowApplicationModal(true);
  };

  const handleSave = (programId) => {
    setSavedPrograms(prev => 
      prev.includes(programId) 
        ? prev.filter(id => id !== programId)
        : [...prev, programId]
    );
  };

  const handleCompare = (programId) => {
    setComparedPrograms(prev => {
      if (prev.includes(programId)) {
        return prev.filter(id => id !== programId);
      } else if (prev.length < 3) {
        return [...prev, programId];
      } else {
        // Do not use browser alert; simply ignore when limit reached
        return prev;
      }
    });
  };

  const handleRemoveFromComparison = (programId) => {
    setComparedPrograms(prev => prev.filter(id => id !== programId));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedFormat('all');
    setPriceRange('all');
    setSortBy('relevance');
    setCurrentPage(1);
  };

  return (
    <Container fluid className="py-5">
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Programs & Degrees</h1>
          <p className="lead text-muted">
            Discover the perfect program to advance your career and achieve your educational goals.
          </p>
        </div>

        {/* Optional load error notice */}
        {loadError && (
          <Alert variant="warning" className="mb-4">
            {loadError}
          </Alert>
        )}

        {/* Search and Filters */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Body>
            <Row className="g-3 align-items-end">
              <Col lg={4}>
                <Form.Label>Search Programs</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <Search size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by program, university, or keyword..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>
              
              <Col lg={2} md={6}>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col lg={2} md={6}>
                <Form.Label>Level</Form.Label>
                <Form.Select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col lg={2} md={6}>
                <Form.Label>Format</Form.Label>
                <Form.Select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                >
                  <option value="all">All Formats</option>
                  {formats.map(format => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col lg={2} md={6}>
                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} className="me-2" />
                  More Filters
                </Button>
              </Col>
            </Row>

            {showFilters && (
              <Row className="g-3 mt-2 pt-3 border-top">
                <Col md={4}>
                  <Form.Label>Price Range</Form.Label>
                  <Form.Select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="all">Any Price</option>
                    <option value="under-20k">Under $20,000</option>
                    <option value="20k-40k">$20,000 - $40,000</option>
                    <option value="40k-60k">$40,000 - $60,000</option>
                    <option value="over-60k">Over $60,000</option>
                  </Form.Select>
                </Col>
                <Col md={4}>
                  <Form.Label>Sort By</Form.Label>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </Form.Select>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button variant="outline-danger" onClick={clearFilters} className="w-100">
                    Clear All Filters
                  </Button>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>

        {/* Results Header */}
        <Row className="align-items-center mb-4">
          <Col>
            <p className="text-muted mb-0">
              Showing {currentPrograms.length} of {sortedPrograms.length} programs
            </p>
          </Col>
          <Col xs="auto">
            <div className="d-flex gap-2">
              {comparedPrograms.length > 0 && (
                <Button
                  variant="outline-primary"
                  onClick={() => setShowComparisonModal(true)}
                >
                  Compare ({comparedPrograms.length})
                </Button>
              )}
              <ButtonGroup>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>

        {/* Programs Grid/List */}
        {isLoading ? (
          <Row>
            {Array(6).fill(0).map((_, index) => (
              <Col key={index} md={6} xl={4} className="mb-4">
                <ProgramSkeleton />
              </Col>
            ))}
          </Row>        ) : currentPrograms.length === 0 ? (
          <div className="text-center py-5">
            <BookOpen size={64} className="text-muted mb-3" />
            <h5>No programs found</h5>
            <p className="text-muted">Try adjusting your search criteria or filters.</p>
            <Button variant="outline-primary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <Row>
            {currentPrograms.map(program => (
              <Col key={program.id} md={6} xl={4} className="mb-4">
                <ProgramCard
                  program={program}
                  onViewDetails={handleViewDetails}
                  onSave={handleSave}
                  onCompare={handleCompare}
                  isSaved={savedPrograms.includes(program.id)}
                  isCompared={comparedPrograms.includes(program.id)}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div>
            {currentPrograms.map(program => (
              <ProgramListItem
                key={program.id}
                program={program}
                onViewDetails={handleViewDetails}
                onSave={handleSave}
                onCompare={handleCompare}
                isSaved={savedPrograms.includes(program.id)}
                isCompared={comparedPrograms.includes(program.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </Pagination>
          </div>
        )}

        {/* Modals */}
        <ProgramDetailsModal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          program={selectedProgram}
          onApply={handleApply}
        />

        <ApplicationModal
          show={showApplicationModal}
          onHide={() => setShowApplicationModal(false)}
          program={selectedProgram}
        />

        <ComparisonModal
          show={showComparisonModal}
          onHide={() => setShowComparisonModal(false)}
          programs={programs}
          comparedPrograms={comparedPrograms}
          onRemoveFromComparison={handleRemoveFromComparison}
        />
      </Container>
    </Container>
  );
};