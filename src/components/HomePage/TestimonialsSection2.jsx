import React, { useState } from "react";
import "../../styles/HomePage/TestimonialsSection2.css";

const testimonials = [
  {
    name: "Mike Taylor",
    location: "Lahore, Pakistan",
    text: "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "Absolutely amazing service! The team went above and beyond to help us achieve our goals. Highly recommended for anyone looking for professional excellence.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Ahmed Hassan",
    location: "Cairo, Egypt",
    text: "The quality of work and attention to detail is outstanding. We couldn't be happier with the results and the professional approach throughout the project.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

const additionalTestimonials = [
  {
    name: "Chris Thomas",
    role: "CEO of Red Button"
  },
  {
    name: "Lisa Wang",
    role: "Marketing Director"
  }
];

function TestimonialsSection2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToTestimonial = (index) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => {
        setIsAnimating(false);
      }, 150);
    }, 150);
  };

  const currentTestimonial = testimonials[currentIndex];
  const nextTestimonial = additionalTestimonials[currentIndex % additionalTestimonials.length];

  return (
    <section className="testimonials-section-2" dir="ltr">
      <div className="testimonials-container-2">
        {/* Left Side - Heading */}
        <div className="testimonials-heading-2">
          <div className="testimonials-label-2">TESTIMONIALS</div>
          <h2 className="testimonials-title-2">What People Say About Us.</h2>
          
          {/* Navigation Indicators */}
          <div className="testimonials-dots-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonial-dot-2 ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Testimonial Cards */}
        <div className="testimonials-cards-2">
          {/* Main Testimonial Card */}
          <div className={`testimonial-card-main-2 ${isAnimating ? 'testimonial-card-animating' : ''}`}>
            <div className="testimonial-avatar-2">
              <img 
                src={currentTestimonial.avatar} 
                alt={currentTestimonial.name}
                className={`avatar-image-2 ${isAnimating ? 'avatar-image-animating' : ''}`}
              />
            </div>
            
            <div className={`testimonial-content-2 ${isAnimating ? 'testimonial-content-animating' : ''}`}>
              <p className="testimonial-text-2">
                "{currentTestimonial.text}"
              </p>
              <div className="testimonial-author-2">
                <h4 className="author-name-2">{currentTestimonial.name}</h4>
                <span className="author-location-2">{currentTestimonial.location}</span>
              </div>
            </div>
          </div>

          {/* Additional Card (Stacked) */}
          <div className="testimonial-card-additional-2">
            <div className="additional-content-2">
              <h4 className="additional-name-2">{nextTestimonial.name}</h4>
              <span className="additional-role-2">{nextTestimonial.role}</span>
            </div>
          </div>

        </div>

        {/* Navigation Arrows */}
        <div className="testimonials-arrows-2">
          <button 
            className="arrow-btn-2 arrow-up-2"
            onClick={() => goToTestimonial(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18,15 12,9 6,15"></polyline>
            </svg>
          </button>
          <button 
            className="arrow-btn-2 arrow-down-2"
            onClick={() => goToTestimonial(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection2;
