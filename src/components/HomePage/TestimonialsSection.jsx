import React, { useState, useEffect } from "react";
import "./TestimonialsSection.css";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "بانا",
    role: "מתמחה - مدققة حسابات",
    text: `يعطيكوا ألف عافية، عهيك كورس مرتب مفيد متكتك 👏
    
كتير المعلومات اللي فيه فادتني وخَلتني يكون عندي ثقة بنفسي إنه صح هيك الإشي معناه وهيك بنعمل ✨💪😍

الألوان هادية والهَنفشوت برضو هادي، هادين وبنفس الوقت حركة بتخليك تضل مركز، الإشي مش ممل، بالعكس بخليك بدك تحضر وتحضر.

أنا هترشمي كتير من تعليمكوا`,
    rating: 5,
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
  },
  {
    name: "وسيم",
    role: "محاسب",
    text: `بالمناسبة عنجد فِش زي الكورس اللي عملتوه، كلشي واضح ومرتب، وأنا شخصياً تعلمت كثير شغلات منو واستفدت 🌹`,
    rating: 5,
  },
];

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("");

  const currentTestimonial = testimonials[currentIndex];

  const goToPrevious = () => {
    setAnimationDirection("slide-right");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    }, 150);
  };

  const goToNext = () => {
    setAnimationDirection("slide-left");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 150);
  };

  return (
    <section className="testimonials-slider" dir="rtl">
      <h2 className="slider-title">ماذا يقول طلابنا؟</h2>
      <div className="animated-quote-container">
        <button className="nav-arrow nav-right" onClick={goToNext}>
          →
        </button>
        <div className="quote-content">
          <div className={`testimonial-card animated ${animationDirection}`}>
            <p className="testimonial-text">{currentTestimonial.text}</p>
            <div className="testimonial-rating">
              {"★".repeat(currentTestimonial.rating)}
              {"☆".repeat(5 - currentTestimonial.rating)}
            </div>
            <h4 className="testimonial-name">{currentTestimonial.name}</h4>
            <span className="testimonial-role">{currentTestimonial.role}</span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="nav-arrow nav-left" onClick={goToPrevious}>
          ←
        </button>
      </div>

      {/* زر Instagram */}
      <div className="instagram-button">
        <a
          href="https://instagram.com/yourpage" // ضع رابط حسابك
          target="_blank"
          rel="noopener noreferrer"
        >
          تابعنا على إنستغرام
        </a>
      </div>
    </section>
  );
}

export default TestimonialsSection;
