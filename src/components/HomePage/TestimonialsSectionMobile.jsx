import React, { useState } from "react";
import "../../styles/HomePage/TestimonialsSectionMobile.css";
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  Instagram,
  Sparkles
} from "lucide-react";

const testimonials = [
  {
    name: "بانا",
    role: "מתמחה - مدققة حسابات",
    text: `يعطيكوا ألف عافية، عهيك كورس مرتب مفيد متكتك 👏
    
كتير المعلومات اللي فيه فادتني وخَلتني يكون عندي ثقة بنفسي إنه صح هيك الإشي معناه وهيك بنعمل ✨💪😍

الألوان هادية والهَنفشوت برضو هادي، هادين وبنفس الوقت حركة بتخليك تضل مركز، الإشي مش ممل، بالعكس بخليك بدك تحضر وتحضر.

أنا هترشمي كتير من تعليمكوا`,
    rating: 5,
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
    color: "#b89453",
  },
  {
    name: "وسيم",
    role: "محاسب",
    text: `بالمناسبة عنجد فِش زي الكورس اللي عملتوه، كلشي واضح ومرتب، وأنا شخصياً تعلمت كثير شغلات منو واستفدت 🌹`,
    rating: 5,
    color: "#8b5a2b",
  },
];

function TestimonialsSectionMobile() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTestimonial = testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="homepage-testimonials-section-mobile" dir="rtl">
      {/* Background Elements */}
      <div className="homepage-testimonials-bg-mobile">
        <div className="homepage-testimonials-overlay-mobile"></div>
        <div className="homepage-testimonials-shapes-mobile">
          <div className="homepage-testimonial-shape-1-mobile"></div>
          <div className="homepage-testimonial-shape-2-mobile"></div>
          <div className="homepage-testimonial-shape-3-mobile"></div>
        </div>
      </div>

      <div className="homepage-testimonials-container-mobile">
        {/* Header */}
        <div className="homepage-testimonials-header-mobile">
          <h2 className="homepage-testimonials-title-mobile">ماذا يقول طلابنا؟</h2>
          <p className="homepage-testimonials-subtitle-mobile">
            قصص نجاح حقيقية من طلابنا المتميزين
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="homepage-testimonial-card-container-mobile">
          <button 
            className="homepage-nav-arrow-mobile homepage-nav-left-mobile" 
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="homepage-arrow-icon-mobile" />
          </button>

          <div className="homepage-testimonial-card-mobile">
            <div className="homepage-testimonial-content-mobile">
              {/* Quote Icon */}
              <div className="homepage-quote-icon-mobile">
                <Quote className="homepage-quote-symbol-mobile" />
              </div>

              {/* Logo */}
              <div className="homepage-testimonial-logo-mobile">
                <img src="/logo.png" alt="Logo" className="homepage-logo-image-mobile" />
                <div className="homepage-logo-ring-mobile"></div>
              </div>

              {/* Rating */}
              <div className="homepage-testimonial-rating-mobile">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`homepage-star-mobile ${i < currentTestimonial.rating ? 'homepage-star-filled-mobile' : 'homepage-star-empty-mobile'}`} 
                  />
                ))}
              </div>

              {/* Text */}
              <p className="homepage-testimonial-text-mobile">{currentTestimonial.text}</p>

              {/* Author */}
              <div className="homepage-testimonial-author-mobile">
                <h4 className="homepage-author-name-mobile">{currentTestimonial.name}</h4>
                <span className="homepage-author-role-mobile">{currentTestimonial.role}</span>
              </div>

              {/* Decorative Elements */}
              <div className="homepage-testimonial-sparkles-mobile">
                <Sparkles className="homepage-sparkle-1-mobile" />
                <Sparkles className="homepage-sparkle-2-mobile" />
              </div>
            </div>
          </div>

          <button 
            className="homepage-nav-arrow-mobile homepage-nav-right-mobile" 
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="homepage-arrow-icon-mobile" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="homepage-testimonials-dots-mobile">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`homepage-dot-mobile ${index === currentIndex ? 'homepage-dot-active-mobile' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="homepage-instagram-cta-mobile">
          <div className="homepage-instagram-icon-mobile">
            <Instagram className="homepage-instagram-symbol-mobile" />
          </div>
          <a
            href="https://instagram.com/cpa.zedan"
            target="_blank"
            rel="noopener noreferrer"
            className="homepage-instagram-link-mobile"
          >
            <span>تابعنا على إنستغرام</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSectionMobile;
