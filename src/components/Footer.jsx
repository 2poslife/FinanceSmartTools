import React from "react";
import "./Styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About */}
        <div className="footer-column">
          <h3 className="footer-title">
            <span className="footer-icon">📘</span> مكتب المحاسبة المتقدم
          </h3>
          <p className="footer-text">
            نقدم أفضل الدورات المحاسبية الأونلاين والأدوات المحاسبية المتطورة
            لمساعدتك في تطوير مهاراتك المهنية
          </p>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h4 className="footer-subtitle">خدماتنا</h4>
          <ul className="footer-list">
            <li>دورات محاسبة أونلاين</li>
            <li>أدوات حاسبة متخصصة</li>
            <li>استشارات محاسبية</li>
            <li>تدقيق الحسابات</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h4 className="footer-subtitle">تواصل معنا</h4>
          <ul className="footer-list">
            <li>📧 temp</li>
            <li>📱 temp</li>
            <li>📍 temp</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} مكتب المحاسبة المتقدم. جميع الحقوق
          محفوظة.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
