import React from "react";
import "../../styles/HomePage/TestimonialsSectionMobile.css";

function TestimonialsSectionMobile() {
  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      position: "مدير شركة",
      content: "خدمات ممتازة ومهنية عالية، أنصح الجميع بالتعامل مع مكتب زيدان",
      rating: 5
    },
    {
      id: 2,
      name: "فاطمة علي",
      position: "محاسبة",
      content: "الدورات التدريبية مفيدة جداً وساعدتني في تطوير مهاراتي المحاسبية",
      rating: 5
    },
    {
      id: 3,
      name: "محمد حسن",
      position: "رائد أعمال",
      content: "الاستشارات المالية ساعدتني في اتخاذ قرارات مهمة لعملي",
      rating: 5
    }
  ];

  return (
    <section dir="rtl" className="testimonials-section-mobile">
      <div className="testimonials-container-mobile">
        <div className="testimonials-header-mobile">
          <h2 className="testimonials-title-mobile">آراء عملائنا</h2>
          <p className="testimonials-subtitle-mobile">
            اكتشف ما يقوله عملاؤنا عن خدماتنا
          </p>
        </div>

        <div className="testimonials-grid-mobile">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card-mobile">
              <div className="testimonial-rating-mobile">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star-mobile">⭐</span>
                ))}
              </div>
              <p className="testimonial-content-mobile">"{testimonial.content}"</p>
              <div className="testimonial-author-mobile">
                <h4 className="author-name-mobile">{testimonial.name}</h4>
                <p className="author-position-mobile">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSectionMobile;
