import React, { useState } from "react";
import "../../styles/HomePage/TestimonialsSection3.css";

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
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Ahmed Hassan",
    location: "Cairo, Egypt",
    text: "The quality of work and attention to detail is outstanding. We couldn't be happier with the results and the professional approach throughout the project.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  }
];

function TestimonialsSection3() {
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
  const nextIndex = (currentIndex + 1) % testimonials.length;
  const nextTestimonial = testimonials[nextIndex];

  return (
    <section className="testimonials-section-3" dir="ltr">
      <div className="testimonials-container-3">
        
        {/* Left Heading */}
        <div className="testimonials-heading-3">
          <div className="testimonials-label-3">TESTIMONIALS</div>
          <h2 className="testimonials-title-3">What People Say About Us.</h2>

          {/* Dots Navigation */}
          <div className="testimonials-dots-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonial-dot-3 ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Cards */}
        <div className="testimonials-cards-3">
          {/* Next Card (always behind) */}
          <div className={`testimonial-card testimonial-card-next-3 ${isAnimating ? 'testimonial-card-next-animating' : ''}`}>
            <p className="testimonial-text-3">"{nextTestimonial.text}"</p>
            <div className="testimonial-author-3">
              <h4>{nextTestimonial.name}</h4>
              <span>{nextTestimonial.location}</span>
            </div>
          </div>

          {/* Current Card (on top) */}
          <div className={`testimonial-card testimonial-card-main-3 ${isAnimating ? 'testimonial-card-main-animating' : ''}`}>
            <div className="testimonial-avatar-3">
              <img 
                src={currentTestimonial.avatar} 
                alt={currentTestimonial.name} 
                className={isAnimating ? 'avatar-animating' : ''}
              />
            </div>
            <div className={`testimonial-content-3 ${isAnimating ? 'testimonial-content-animating' : ''}`}>
              <p className="testimonial-text-3">"{currentTestimonial.text}"</p>
              <div className="testimonial-author-3">
                <h4>{currentTestimonial.name}</h4>
                <span>{currentTestimonial.location}</span>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <div className="testimonials-arrows-3">
            <button 
              className="arrow-btn-3 arrow-up-3"
              onClick={() => goToTestimonial(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18,15 12,9 6,15"></polyline>
              </svg>
            </button>
            <button 
              className="arrow-btn-3 arrow-down-3"
              onClick={() => goToTestimonial((currentIndex + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection3;
