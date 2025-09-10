"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useMemo } from 'react';
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
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPrograms } from '../../lib/programs';
import axiosClient from '../../pages/api/axios-client';

// API functions for applications
const submitApplication = async (applicationData) => {
  const response = await axiosClient.post('/applications', applicationData);
  return response.data;
};

export const ProgramsAndDegrees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [savedPrograms, setSavedPrograms] = useState([]);
  const [comparedPrograms, setComparedPrograms] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const queryClient = useQueryClient();

  const itemsPerPage = 6;

  const queryParams = {
    search: searchTerm.trim() || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    level: selectedLevel !== 'all' ? selectedLevel : undefined,
    format: selectedFormat !== 'all' ? selectedFormat : undefined,
  };

  const { data: programs = [], isLoading, isError, error } = useQuery(
    ['programs', queryParams],
    () => getPrograms(queryParams),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, 
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );

  const applicationMutation = useMutation(
    (applicationData) => addApplication(applicationData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['applications']);
       
        console.log('Application submitted successfully:', data);
      },
      onError: (error) => {
        console.error('Application submission error:', error);
   
      },
    }
  );

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

  // Updated ApplicationModal component using the mutation
  const ApplicationModalWithMutation = ({ show, onHide, program }) => {
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
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
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

      try {
        await applicationMutation.mutateAsync(payload);
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
      } catch (error) {
        // Error is handled by react-query and the mutation's onError callback
        console.error('Submission failed:', error);
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
            {applicationMutation.isError && (
              <Alert variant="danger" className="mb-3">
                {applicationMutation.error?.response?.data?.message || 
                 applicationMutation.error?.message || 
                 'Failed to submit application. Please try again.'}
              </Alert>
            )}
            
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
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
                <Form.Group>
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
              <Col md={6}>
                <Form.Group>
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
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Previous Education</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="previousEducation"
                    value={formData.previousEducation}
                    onChange={handleChange}
                    placeholder="Describe your educational background..."
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Motivation *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Why are you interested in this program? What are your goals?"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Preferred Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Resume/CV</Form.Label>
                  <Form.Control
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                  />
                  <Form.Text className="text-muted">
                    Upload your resume in PDF, DOC, or DOCX format
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide} disabled={applicationMutation.isLoading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={applicationMutation.isLoading}>
              {applicationMutation.isLoading ? (
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

  // Skeleton loader component for loading states
  const ProgramSkeleton = () => (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <div className="bg-light rounded" style={{width: '60%', height: '20px'}}></div>
          <div className="bg-light rounded" style={{width: '30px', height: '30px'}}></div>
        </div>
        <div className="bg-light rounded mb-2" style={{width: '40%', height: '16px'}}></div>
        <div className="bg-light rounded mb-3" style={{width: '100%', height: '60px'}}></div>
        <div className="d-flex gap-2 mb-3">
          <div className="bg-light rounded" style={{width: '60px', height: '20px'}}></div>
          <div className="bg-light rounded" style={{width: '80px', height: '20px'}}></div>
        </div>
        <div className="bg-light rounded mb-3" style={{width: '50%', height: '16px'}}></div>
        <div className="d-flex gap-2">
          <div className="bg-light rounded" style={{width: '100%', height: '36px'}}></div>
          <div className="bg-light rounded" style={{width: '40px', height: '36px'}}></div>
        </div>
      </Card.Body>
    </Card>
  );

  // Placeholder components (you'll need to implement these based on your needs)
  const ProgramCard = ({ program, onViewDetails, onSave, onCompare, isSaved, isCompared }) => (
    <Card className="h-100 border-0 shadow-sm program-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{program.title}</h5>
          <Button
            variant="link"
            size="sm"
            className="p-0 text-muted"
            onClick={() => onSave(program.id)}
          >
            <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
          </Button>
        </div>
        <p className="text-muted small mb-2">{program.university}</p>
        <p className="card-text text-muted small">{program.description}</p>
        <div className="d-flex gap-2 mb-3">
          <Badge bg="primary">{program.level}</Badge>
          <Badge bg="secondary">{program.format}</Badge>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" onClick={() => onViewDetails(program)}>
            View Details
          </Button>
          <Button
            variant={isCompared ? 'warning' : 'outline-warning'}
            size="sm"
            onClick={() => onCompare(program.id)}
          >
            Compare
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  const ProgramListItem = ({ program, onViewDetails, onSave, onCompare, isSaved, isCompared }) => (
    <Card className="mb-3 border-0 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={8}>
            <div className="d-flex align-items-start gap-3">
              <div className="flex-grow-1">
                <h5 className="mb-1">{program.title}</h5>
                <p className="text-muted small mb-1">{program.university}</p>
                <p className="text-muted small mb-2">{program.description}</p>
                <div className="d-flex gap-2">
                  <Badge bg="primary">{program.level}</Badge>
                  <Badge bg="secondary">{program.format}</Badge>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="link"
                size="sm"
                className="p-2"
                onClick={() => onSave(program.id)}
              >
                <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
              </Button>
              <Button
                variant={isCompared ? 'warning' : 'outline-warning'}
                size="sm"
                onClick={() => onCompare(program.id)}
              >
                Compare
              </Button>
              <Button variant="primary" onClick={() => onViewDetails(program)}>
                View Details
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  // Placeholder modal components (implement based on your needs)
  const ProgramDetailsModal = ({ show, onHide, program, onApply }) => (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{program?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>University:</strong> {program?.university}</p>
        <p><strong>Level:</strong> {program?.level}</p>
        <p><strong>Format:</strong> {program?.format}</p>
        <p><strong>Description:</strong> {program?.description}</p>
        {program?.tuition && <p><strong>Tuition:</strong> {program.tuition}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={() => onApply(program)}>Apply Now</Button>
      </Modal.Footer>
    </Modal>
  );

  const ComparisonModal = ({ show, onHide, programs, comparedPrograms, onRemoveFromComparison }) => (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Program Comparison</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {comparedPrograms.map(programId => {
            const program = programs.find(p => p.id === programId);
            return program ? (
              <Col key={programId} md={4}>
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <h6 className="mb-0">{program.title}</h6>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0"
                      onClick={() => onRemoveFromComparison(programId)}
                    >
                      <X size={16} />
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <p><strong>University:</strong> {program.university}</p>
                    <p><strong>Level:</strong> {program.level}</p>
                    <p><strong>Format:</strong> {program.format}</p>
                    {program.tuition && <p><strong>Tuition:</strong> {program.tuition}</p>}
                  </Card.Body>
                </Card>
              </Col>
            ) : null;
          })}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

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

        {/* Error handling */}
        {isError && (
          <Alert variant="danger" className="mb-4">
            Error loading programs: {error.message}
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
          </Row>
        ) : currentPrograms.length === 0 ? (
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

        <ApplicationModalWithMutation
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