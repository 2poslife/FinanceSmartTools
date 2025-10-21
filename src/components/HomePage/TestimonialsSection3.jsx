import React, { useState } from "react";
import "../../styles/HomePage/TestimonialsSection3.css";

const testimonials = [
  {
    name: "بانا",
    location: "מתמחה - مدققة حسابات",
    text: "يعطيكوا ألف عافية، عهيك كورس مرتب مفيد متكتك 👏 كتير المعلومات اللي فيه فادتني وخَلتني يكون عندي ثقة بنفسي إنه صح هيك الإشي معناه وهيك بنعمل ✨💪😍",
    avatar: "/logo.png"
  },
  {
    name: "ليث",
    location: "مدقق حسابات",
    text: "زيدان، من لا يشكر الناس لا يشكر الله. بِسلم إيديك يا رب، ما بعتقد في كورسات متعوب عليها مثل هذا الكورس. المتابعة تبعتك بتخدم كثير، وما بتخلي الواحد يعلق على شغلة معينة مثلاً 🙏",
    avatar: "/logo.png"
  },
  {
    name: "وسيم",
    location: "محاسب",
    text: "بالمناسبة عنجد فِش زي الكورس اللي عملتوه، كلشي واضح ومرتب، وأنا شخصياً تعلمت كثير شغلات منو واستفدت 🌹",
    avatar: "/logo.png"
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
    <section className="testimonials-section-3" dir="rtl">
      <div className="testimonials-container-3">
        
        {/* Left Heading */}
        <div className="testimonials-heading-3">
          <div className="testimonials-label-3">شهادات العملاء</div>
          <h2 className="testimonials-title-3">ماذا يقول طلابنا؟</h2>

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
