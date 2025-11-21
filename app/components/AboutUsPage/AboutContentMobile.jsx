import React from "react";
import { Lightbulb } from "lucide-react";
import "../../styles/AboutUsPage/AboutContentMobile.css";

function AboutContentMobile() {
  return (
    <div className="mobile-content-section">
      <div className="mobile-content-container">
        <div className="mobile-content-card">
          <div className="mobile-content-header">
            <p className="mobile-promo-tagline">
              وراء كل رقم قصة نجاح — ونحن هنا لنكتبها معك
            </p>
            <div className="mobile-title-decorative">
              <Lightbulb className="mobile-title-icon" />
              <h2 className="mobile-content-title">من نحن</h2>
            </div>
          </div>
          
          <div className="mobile-content-body">
            <p className="mobile-content-paragraph">
              نحن مكتب حسابات مستقل، نقدم خدمات مالية محاسبية وضريبية بجودة عالية وبمهنية تامة. 
              يجمع مكتبنا بين الخبرة العملية والمعرفة الأكاديمية، لنقدم لكل عميل خدمة دقيقة، سريعة، وشفافة.
            </p>
            
            <p className="mobile-content-paragraph">
              منذ تأسيس مكتب زيدان، لم يقتصر دورنا على تقديم الخدمات، بل أخذنا على عاتقنا مرافقة الأشخاص ودعمهم، 
              سواء في حقوقهم كموظفين، فهمهم لعالم الضرائب، أو شرح القوانين الجديدة بشكل مبسط.
            </p>
            
            <div className="mobile-highlight-box">
              <p className="mobile-highlight-text">
                إذا كنت تعرف صفحتنا في الإنستغرام، فأنت بالتأكيد تعرف حجم المعلومات التي قدمناها على مدار السنوات.
              </p>
            </div>
            
            <div className="mobile-instagram-section">
              <p className="mobile-instagram-text">
                وإذا لم تتعرف عليها بعد - حان الوقت لتزورنا وتتعرف علينا أكثر:
              </p>
              <a 
                href="https://www.instagram.com/cpa.zedan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mobile-instagram-link"
              >
                <div className="mobile-instagram-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
                  </svg>
                </div>
                <span className="mobile-instagram-handle">@cpa.zedan</span>
                <div className="mobile-instagram-arrow">→</div>
              </a>
            </div>
            
            <div className="mobile-final-message">
              <p className="mobile-message-text">
                نحن كما عودناكم دائمًا، مستمرون في مساعدتكم لتصبحوا محاسبين مستقلين ناجحين بأعمالكم. 
                أو موظفين محترفين، واثقين بأنفسهم، غير معتمدين على أحد.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutContentMobile;
