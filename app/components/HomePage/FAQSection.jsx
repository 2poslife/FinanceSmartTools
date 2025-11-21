import React, { useState } from "react";
import "../../styles/HomePage/FAQSection.css";

const faqs = [
  {
    question: "هل الرسوم تدفع لمرة واحدة أم بشكل دوري شهري؟",
    answer:
      "يتم الدفع لمرة واحدة فقط، وستحصل بعدها على وصول غير محدود لجميع الدروس",
  },
  {
    question: "كيف يمكنني الوصول إلى الدورة بعد إتمام الدفع؟",
    answer:
      "فور إتمام الدفع، سيصلك بريد إلكتروني يحتوي على رابط الدخول مع اسم المستخدم وكلمة المرور الخاصة بك",
  },
  {
    question: "هل ستكون الدروس مباشرة عبر الإنترنت أم مسجلة مسبقًا؟",
    answer:
      "الدورة مسجّلة بالكامل، يمكنك أن تعود إليها وقت الحاجة لمدة سنتين من موعد الاشتراك ",
  },
  {
    question: "هل يوجد دعم في حال واجهت مشكلة بالدخول أو أثناء متابعة الدروس؟",
    answer:
      "نعم، بإمكانك التواصل مع فريق الدعم من خلال الإيميل أو الواتساب لحل أي مشكلة أو استفسار",
  },
];

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openContactModal = (e) => {
    e.preventDefault();
    // Dispatch a custom event to trigger the header contact modal
    window.dispatchEvent(new CustomEvent('openContactModal'));
  };

  return (
    <section dir="rtl" className="homepage-faq-section">
      <div className="homepage-faq-container">
        <div className="homepage-faq-content">
          <h2 className="homepage-faq-title">الأسئلة الشائعة</h2>
          <div className="homepage-faq-list">
            {faqs.map((item, index) => (
              <div key={index} className="homepage-faq-item">
                <button
                  className="homepage-faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {item.question}
                  <span>{activeIndex === index ? "−" : "+"}</span>
                </button>
                {activeIndex === index && (
                  <p className="homepage-faq-answer">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="homepage-faq-contact-section">
        <div className="homepage-faq-contact-container">
          <div className="homepage-faq-contact-header">
            <div className="homepage-contact-header-icon">
              <span className="homepage-help-icon">❓</span>
            </div>
            <div className="homepage-contact-header-text">
              <h3>لا تجد إجابة لسؤالك؟</h3>
              <p>نحن هنا لمساعدتك - <a 
                href="#" 
                className="homepage-contact-link"
                onClick={openContactModal}
              >
                تواصل معنا مباشرة
              </a></p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
