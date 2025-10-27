import React, { useState } from "react";
import "../../styles/HomePage/TestimonialsSection3Mobile.css";

const testimonials = [
  {
    name: "بانا",
    location: "مستشارة مالية - مدققة حسابات",
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

function TestimonialsSection3Mobile() {
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

  return (
    <section className="testimonials-section-3-mobile" dir="rtl">
      <div className="testimonials-container-3-mobile">
        
        {/* Heading */}
        <div className="testimonials-heading-3-mobile">
          <div className="testimonials-label-3-mobile">شهادات العملاء</div>
          <h2 className="testimonials-title-3-mobile">ماذا يقول طلابنا؟</h2>
        </div>

        {/* Testimonial Card */}
        <div className="testimonials-cards-3-mobile">
          <div className={`testimonial-card-mobile ${isAnimating ? 'testimonial-card-animating' : ''}`}>
            <div className="testimonial-avatar-3-mobile">
              <img 
                src={currentTestimonial.avatar} 
                alt={currentTestimonial.name} 
                className={isAnimating ? 'avatar-animating' : ''}
              />
            </div>
            <div className={`testimonial-content-3-mobile ${isAnimating ? 'testimonial-content-animating' : ''}`}>
              <p className="testimonial-text-3-mobile">"{currentTestimonial.text}"</p>
              <div className="testimonial-author-3-mobile">
                <h4>{currentTestimonial.name}</h4>
                <span>{currentTestimonial.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="testimonials-navigation-3-mobile">
          {/* Dots */}
          <div className="testimonials-dots-3-mobile">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonial-dot-3-mobile ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="testimonials-arrows-3-mobile">
            <button 
              className="arrow-btn-3-mobile arrow-left-3-mobile"
              onClick={() => goToTestimonial(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button 
              className="arrow-btn-3-mobile arrow-right-3-mobile"
              onClick={() => goToTestimonial((currentIndex + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection3Mobile;
