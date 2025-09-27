import React, { useState } from "react";
import "./FAQSection.css";
import faqImg from "../../assets/faq1.png";

const faqs = [
    {
        question: "هل الرسوم تدفع لمرة واحدة أم بشكل دوري شهري؟",
        answer: "يتم الدفع لمرة واحدة فقط، وستحصل بعدها على وصول غير محدود لجميع الدروس"
    },
    {
        question: "كيف يمكنني الوصول إلى الدورة بعد إتمام الدفع؟",
        answer: "فور إتمام الدفع، سيصلك بريد إلكتروني يحتوي على رابط الدخول مع اسم المستخدم وكلمة المرور الخاصة بك"
    },
    {
        question: "هل ستكون الدروس مباشرة عبر الإنترنت أم مسجلة مسبقًا؟",
        answer: "الدورة مسجّلة بالكامل، وتبقى متاحة لك مدى الحياة لتعود إليها وقت الحاجة"
    },
    {
        question: "هل يوجد دعم في حال واجهت مشكلة بالدخول أو أثناء متابعة الدروس؟",
        answer: "نعم، بإمكانك التواصل مع فريق الدعم من خلال الإيميل أو الواتساب لحل أي مشكلة أو استفسار"
    },
];

function FAQSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section dir="rtl" className="faq-section">
            <div className="faq-container">
                {/* Right side: title + accordion */}
                <div className="faq-content">
                    <h2 className="faq-title">الأسئلة الشائعة</h2>
                    <div className="faq-list">
                        {faqs.map((item, index) => (
                            <div key={index} className="faq-item">
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    {item.question}
                                    <span>{activeIndex === index ? "−" : "+"}</span>
                                </button>
                                {activeIndex === index && (
                                    <p className="faq-answer">{item.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Left side: image */}
                <div className="faq-image">
                    <img src={faqImg} alt="FAQ Illustration" />
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
