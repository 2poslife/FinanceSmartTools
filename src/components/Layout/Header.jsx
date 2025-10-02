import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  FileText,
  Calculator,
  Info,
  Phone,
  LogIn,
  MapPin,
  Mail,
} from "lucide-react";
import "./Header.css";
import Logo from '../../assets/logo.png'
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showContact, setShowContact] = useState(false);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          <img className="logo-img" src={Logo} alt="logo" />
          <div className="logo-texts">
            <span className="logo-title">مكتب زيدان</span>
            <span className="logo-subtitle">دورات محاسبة احترافية</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <button
            onClick={() => navigate("/")}
            className={`nav-btn ${isActive("/")}`}
          >
            <Home className="icon" />
            الرئيسية
          </button>

          <button
            onClick={() => navigate("/courses")}
            className={`nav-btn ${isActive("/courses")}`}
          >
            <BookOpen className="icon" />
            الدورات
          </button>

          <button
            onClick={() => navigate("/articles")}
            className={`nav-btn ${isActive("/articles")}`}
          >
            <FileText className="icon" />
            المقالات
          </button>

          <button
            onClick={() => navigate("/CalculatorsPage")}
            className={`nav-btn ${isActive("/CalculatorsPage")}`}
          >
            <Calculator className="icon" />
            الآلات الحاسبة
          </button>

          <button
            onClick={() => navigate("/AboutUs")}
            className={`nav-btn ${isActive("/about")}`}
          >
            <Info className="icon" />
            حول المكتب
          </button>

          <button
            onClick={() => navigate("/SigninForm")}
            className={`nav-btn ${isActive("/SigninForm")}`}
          >
            <LogIn className="icon" />
            تسجيل دخول
          </button>
        </nav>

        {/* CTA Button */}
        <button className="cta-btn" onClick={() => setShowContact(true)}>
          <Phone className="icon" />
          اتصل بنا
        </button>
      </header>

      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // ✅ prevents closing when clicking inside the modal
          >
            <button
              className="modal-close"
              onClick={() => setShowContact(false)}
            >
              ✖
            </button>

            <section className="about-contact">
              <h2>تواصل معنا</h2>
              <p>نحن هنا لمساعدتك في رحلتك المحاسبية</p>

              <div className="contact-grid">
                <div className="contact-card">
                  <div className="icon-wrapper green">
                    <MapPin className="icon" />
                  </div>
                  <h3>موقعنا</h3>
                  <p>
                    {" "}
                    المغار | 📍 <br />
                    شارع{" "}
                  </p>
                </div>

                <div className="contact-card">
                  <div className="icon-wrapper blue">
                    <Mail className="icon" />
                  </div>
                  <h3>راسلنا</h3>
                  <p>
                    info@accounting-office.com
                    <br />
                    training@accounting-office.com
                  </p>
                </div>

                <div className="contact-card">
                  <div className="icon-wrapper orange">
                    <Phone className="icon" />
                  </div>
                  <h3>اتصل بنا</h3>
                  <p>
                    +970 599 123 456
                    <br />
                    +970 567 890 123
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
