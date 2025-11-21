import React, { useState, useEffect, useCallback } from "react";
import "../../styles/HomePage/TestimonialsSection.css";
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  Instagram,
  Sparkles
} from "lucide-react";
import { getImageUrl } from "@/lib/utils";

const testimonials = [
  {
    name: "بانا",
    role: "מתמחה - مدققة حسابات",
    text: `يعطيكوا ألف عافية، عهيك كورس مرتب مفيد متكتك 👏
    
كتير المعلومات اللي فيه فادتني وخَلتني يكون عندي ثقة بنفسي إنه صح هيك الإشي معناه وهيك بنعمل ✨💪😍

الألوان هادية والهَنفشوت برضو هادي، هادين وبنفس الوقت حركة بتخليك تضل مركز، الإشي مش ممل، بالعكس بخليك بدك تحضر وتحضر.

أنا هترشمي كتير من تعليمكوا`,
    rating: 5,
    avatar: "👩‍💼",
    color: "#d4af37",
  },
  {
    name: "ليث",
    role: "مدقق حسابات",
    text: `زيدان، من لا يشكر الناس لا يشكر الله.

بِسلم إيديك يا رب، ما بعتقد في كورسات متعوب عليها مثل هذا الكورس.

المتابعة تبعتك بتخدم كثير، وما بتخلي الواحد يعلق على شغلة معينة مثلاً.. كثير استفدت منك.

وغير هيك، فكرة إنك بتفضلك تضيف فيديوهات جديدة للكورس نفسه مش مفهومة ضمنا

عنجد يسلم إيديك على كلشي. 🙏`,
    rating: 5,
    avatar: "👨‍💼",
    color: "#b89453",
  },
  {
    name: "وسيم",
    role: "محاسب",
    text: `بالمناسبة عنجد فِش زي الكورس اللي عملتوه، كلشي واضح ومرتب، وأنا شخصياً تعلمت كثير شغلات منو واستفدت 🌹`,
    rating: 5,
    avatar: "👨‍🎓",
    color: "#8b5a2b",
  },
];

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const currentTestimonial = testimonials[currentIndex];

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection("slide-right");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setAnimationDirection("slide-in-right");
      setTimeout(() => {
        setAnimationDirection("");
        setIsAnimating(false);
      }, 600);
    }, 400);
  };

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection("slide-left");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
      setAnimationDirection("slide-in-left");
      setTimeout(() => {
        setAnimationDirection("");
        setIsAnimating(false);
      }, 600);
    }, 400);
  }, [isAnimating]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <section className="homepage-testimonials-section" dir="rtl">
      {/* Background Elements */}
      <div className="homepage-testimonials-bg">
        <div className="homepage-testimonials-overlay"></div>
        <div className="homepage-testimonials-shapes">
          <div className="homepage-testimonial-shape-1"></div>
          <div className="homepage-testimonial-shape-2"></div>
          <div className="homepage-testimonial-shape-3"></div>
        </div>
      </div>

      <div className="homepage-testimonials-container">
        {/* Header */}
        <div className="homepage-testimonials-header">
          <h2 className="homepage-testimonials-title">ماذا يقول طلابنا؟</h2>
          <p className="homepage-testimonials-subtitle">
            قصص نجاح حقيقية من طلابنا المتميزين
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="homepage-testimonial-card-container">
          <button 
            className="homepage-nav-arrow homepage-nav-left" 
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="homepage-arrow-icon" />
          </button>

          <div className="homepage-testimonial-card">
            <div className={`homepage-testimonial-content ${animationDirection}`}>
              {/* Quote Icon */}
              <div className="homepage-quote-icon">
                <Quote className="homepage-quote-symbol" />
              </div>

              {/* Logo */}
              <div className="homepage-testimonial-logo">
                <img src={getImageUrl('logo.png')} alt="Logo" className="homepage-logo-image" />
                <div className="homepage-logo-ring"></div>
              </div>

              {/* Rating */}
              <div className="homepage-testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`homepage-star ${i < currentTestimonial.rating ? 'homepage-star-filled' : 'homepage-star-empty'}`} 
                  />
                ))}
              </div>

              {/* Text */}
              <p className="homepage-testimonial-text">{currentTestimonial.text}</p>

              {/* Author */}
              <div className="homepage-testimonial-author">
                <h4 className="homepage-author-name">{currentTestimonial.name}</h4>
                <span className="homepage-author-role">{currentTestimonial.role}</span>
              </div>

              {/* Decorative Elements */}
              <div className="homepage-testimonial-sparkles">
                <Sparkles className="homepage-sparkle-1" />
                <Sparkles className="homepage-sparkle-2" />
              </div>
            </div>
          </div>

          <button 
            className="homepage-nav-arrow homepage-nav-right" 
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="homepage-arrow-icon" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="homepage-testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`homepage-dot ${index === currentIndex ? 'homepage-dot-active' : ''}`}
              onClick={() => {
                if (isAnimating) return;
                setIsAnimating(true);
                setAnimationDirection("flip");
                setTimeout(() => {
                  setCurrentIndex(index);
                  setAnimationDirection("");
                  setIsAnimating(false);
                }, 400);
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="homepage-instagram-cta">
          <div className="homepage-instagram-icon">
            <Instagram className="homepage-instagram-symbol" />
          </div>
          <a
            href="https://instagram.com/cpa.zedan"
            target="_blank"
            rel="noopener noreferrer"
            className="homepage-instagram-link"
          >
            <span>تابعنا على إنستغرام</span>
            <div className="homepage-instagram-glow"></div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
