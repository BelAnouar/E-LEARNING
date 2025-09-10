import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCours } from "../../lib/helper";
import { useState } from "react";

const CardCourses = ({ Cours }) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    if (!Cours || Cours.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-content">
                    <div className="empty-icon">📚</div>
                    <h3>No courses available</h3>
                    <p>Check back later for new courses!</p>
                </div>
            </div>
        );
    }

    return (
        <section id="press" className="courses-section">
            <div className="container">
              
                <div className="section-header text-center mb-5">
                    <div className="featured-badge">
                        <span className="badge-icon">⭐</span>
                        Featured Courses
                    </div>
                    <h1 className="section-title">
                        Explore Top{" "}
                        <span className="gradient-text">Courses</span>
                    </h1>
                    <p className="section-subtitle">
                        Discover world-class courses from expert instructors and
                        advance your skills
                    </p>
                </div>

                
                <div className="row g-4 mb-5">
                    {Cours.map((course, index) => (
                        <div
                            key={course.idCours || index}
                            className="col-lg-3 col-md-6 col-sm-12"
                        >
                            <Link
                                to={`/lesson/${course.idCours}`}
                                className="course-link"
                            >
                                <div
                                    className={`course-card ${
                                        hoveredCard === index ? "hovered" : ""
                                    }`}
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Course Image */}
                                    <div className="course-image-container">
                                        <div className="course-image">
                                            {course.image &&
                                            course.image !==
                                                "/placeholder.svg" ? (
                                                <img
                                                    src={
                                                        course.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={course.titre}
                                                    className="course-img"
                                                    onError={(e) => {
                                                        e.target.style.display =
                                                            "none";
                                                        e.target.nextSibling.style.display =
                                                            "flex";
                                                    }}
                                                />
                                            ) : null}

                                            <div
                                                className="placeholder-image"
                                                style={{
                                                    display:
                                                        course.image &&
                                                        course.image !==
                                                            "/placeholder.svg"
                                                            ? "none"
                                                            : "flex",
                                                }}
                                            >
                                                <div className="placeholder-content">
                                                    <span className="placeholder-icon">
                                                        {course.category ===
                                                        "Programming"
                                                            ? "💻"
                                                            : course.category ===
                                                              "Web Dev"
                                                            ? "🌐"
                                                            : course.category ===
                                                              "Database"
                                                            ? "🗄️"
                                                            : course.category ===
                                                              "AI/ML"
                                                            ? "🤖"
                                                            : course.category ===
                                                              "Frontend"
                                                            ? "⚛️"
                                                            : course.category ===
                                                              "Data Science"
                                                            ? "📊"
                                                            : "🧠"}
                                                    </span>
                                                    <span className="placeholder-text">
                                                        {course.category ||
                                                            "Course"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="image-overlay"></div>

                                            {/* Category Badge */}
                                            {course.category && (
                                                <span className="category-badge">
                                                    {course.category}
                                                </span>
                                            )}

                                            {/* Rating */}
                                            {course.rating && (
                                                <div className="rating-badge">
                                                    <span className="star">
                                                        ⭐
                                                    </span>
                                                    <span>{course.rating}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Course Content */}
                                    <div className="course-content">
                                        <h5 className="course-title">
                                            {course.titre}
                                        </h5>
                                        <p className="course-instructor">
                                            by {course.enseignant}
                                        </p>

                                        {/* Course Stats */}
                                        <div className="course-stats">
                                            {course.students && (
                                                <div className="stat-item">
                                                    <span className="stat-icon">
                                                        👥
                                                    </span>
                                                    <span>
                                                        {course.students?.toLocaleString() ||
                                                            "1,200"}
                                                    </span>
                                                </div>
                                            )}
                                            {course.duration && (
                                                <div className="stat-item">
                                                    <span className="stat-icon">
                                                        🕒
                                                    </span>
                                                    <span>
                                                        {course.duration ||
                                                            "8 weeks"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Price and Arrow */}
                                        <div className="course-footer">
                                            <div className="price-container">
                                                <span className="current-price">
                                                    {course.prix}
                                                </span>
                                                {course.prix !== "Free" && (
                                                    <span className="original-price">
                                                        $
                                                        {Math.round(
                                                            Number.parseInt(
                                                                course.prix.replace(
                                                                    "$",
                                                                    ""
                                                                )
                                                            ) * 1.5
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="arrow-icon">→</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/courses" className="btn btn-explore">
                        Explore All Courses
                        <span className="btn-arrow">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CardCourses;
