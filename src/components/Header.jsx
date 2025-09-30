import React, { useState, useEffect } from "react";
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
import "./Styles/Header.css";
import Logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showContact, setShowContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // threshold: 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${!scrolled ? "behind" : ""}`}>
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
          <button onClick={() => navigate("/")} className={`nav-btn ${isActive("/")}`}>
            <Home className="icon" />
            <span>الرئيسية</span>
          </button>

          <button onClick={() => navigate("/courses")} className={`nav-btn ${isActive("/courses")}`}>
            <BookOpen className="icon" />
            <span>الدورات</span>
          </button>

          <button onClick={() => navigate("/articles")} className={`nav-btn ${isActive("/articles")}`}>
            <FileText className="icon" />
            <span>المقالات</span>
          </button>

          <button onClick={() => navigate("/CalculatorsPage")} className={`nav-btn ${isActive("/CalculatorsPage")}`}>
            <Calculator className="icon" />
            <span>الآلات الحاسبة</span>
          </button>

          <button onClick={() => navigate("/AboutUs")} className={`nav-btn ${isActive("/about")}`}>
            <Info className="icon" />
            <span>حول المكتب</span>
          </button>

          <button onClick={() => navigate("/SigninForm")} className={`nav-btn ${isActive("/SigninForm")}`}>
            <LogIn className="icon" />
            <span>تسجيل دخول</span>
          </button>
        </nav>

        {/* CTA Button */}
        <button className="cta-btn" onClick={() => setShowContact(true)}>
          <Phone className="icon" />
          <span>اتصل بنا</span>
        </button>
      </header>

      {/* Contact Modal */}
      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowContact(false)}>✖</button>
            <section className="about-contact">
              <h2>تواصل معنا</h2>
              <p>نحن هنا لمساعدتك في رحلتك المحاسبية</p>

              <div className="contact-grid">
                <div className="contact-card">
                  <div className="icon-wrapper green"><MapPin className="icon" /></div>
                  <h3>موقعنا</h3>
                  <p>المغار | 📍 <br /> شارع</p>
                </div>

                <div className="contact-card">
                  <div className="icon-wrapper blue"><Mail className="icon" /></div>
                  <h3>راسلنا</h3>
                  <p>
                    info@accounting-office.com <br />
                    training@accounting-office.com
                  </p>
                </div>

                <div className="contact-card">
                  <div className="icon-wrapper orange"><Phone className="icon" /></div>
                  <h3>اتصل بنا</h3>
                  <p>
                    +970 599 123 456 <br />
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
