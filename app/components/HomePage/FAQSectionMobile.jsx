import React, { useState } from "react";
import "../../styles/HomePage/FAQSectionMobile.css";

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

function FAQSectionMobile() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openContactModal = (e) => {
    e.preventDefault();
    console.log('Opening contact modal from mobile FAQ');
    
    // Method 1: Try to find and click the mobile header contact button
    const mobileContactButton = document.querySelector('.contact-btn');
    if (mobileContactButton) {
      console.log('Found mobile header contact button, clicking it');
      mobileContactButton.click();
      return;
    }
    
    // Method 2: Try desktop header contact button
    const desktopContactButton = document.querySelector('.cta-btn');
    if (desktopContactButton) {
      console.log('Found desktop header contact button, clicking it');
      desktopContactButton.click();
      return;
    }
    
    // Method 3: Try multiple selectors for mobile header
    const mobileSelectors = [
      '.contact-btn',
      '.mobile-nav-btn.contact-btn',
      'button:contains("اتصل بنا")',
      '.mobile-nav button:last-child'
    ];
    
    for (const selector of mobileSelectors) {
      const button = document.querySelector(selector);
      if (button) {
        console.log(`Found mobile button with selector: ${selector}`);
        button.click();
        return;
      }
    }
    
    // Method 4: Dispatch custom event (will be caught by MobileHeader)
    console.log('Dispatching openContactModal event');
    const event = new CustomEvent('openContactModal');
    window.dispatchEvent(event);
    
    console.log('Event dispatched - mobile header should open contact modal');
  };

  return (
    <section dir="rtl" className="faq-section-mobile">
      <div className="faq-container-mobile">
        <div className="faq-content-mobile">
          <h2 className="faq-title-mobile">الأسئلة الشائعة</h2>
          <div className="faq-list-mobile">
            {faqs.map((item, index) => (
              <div key={index} className="faq-item-mobile">
                <button
                  className="faq-question-mobile"
                  onClick={() => toggleFAQ(index)}
                >
                  {item.question}
                  <span>{activeIndex === index ? "−" : "+"}</span>
                </button>
                {activeIndex === index && (
                  <p className="faq-answer-mobile">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="faq-contact-section-mobile">
        <div className="faq-contact-container-mobile">
          <div className="faq-contact-header-mobile">
            <div className="contact-header-icon-mobile">
              <span className="help-icon-mobile">❓</span>
            </div>
            <div className="contact-header-text-mobile">
              <h3>لا تجد إجابة لسؤالك؟</h3>
              <p>نحن هنا لمساعدتك - <a 
                href="#" 
                className="contact-link-mobile"
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

export default FAQSectionMobile;
