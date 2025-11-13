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
  LogOut,
  MapPin,
  Mail,
  Monitor,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import "../../styles/Layout/Header.css";
const Logo = 'https://d3egla0dyi6qxn.cloudfront.net/public/logo.png';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showContact, setShowContact] = useState(false);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  // Check if user is logged in
  const token = localStorage.getItem("access_token");
  let isLoggedIn = false;
  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isLoggedIn = decoded.exp * 1000 > Date.now();
      userRole = decoded.role;
    } catch (err) {
      console.error("❌ Invalid token:", err);
      localStorage.removeItem("access_token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  // Listen for custom event to open contact modal
  useEffect(() => {
    const handleOpenContactModal = () => {
      console.log('Header received openContactModal event');
      setShowContact(true);
    };

    window.addEventListener('openContactModal', handleOpenContactModal);

    return () => {
      window.removeEventListener('openContactModal', handleOpenContactModal);
    };
  }, []);

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          <img className="logo-img" src={Logo} alt="logo" />
          <div className="logo-texts">
            <span className="logo-title">زيدان - مكتب تدقيق حسابات</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav">
          {isLoggedIn && userRole === "admin" && (
            <button
              onClick={() => navigate("/AdminPage")}
              className={`nav-btn control-panel-btn ${isActive("/AdminPage")}`}
            >
              <Monitor className="icon" />
              لوحة التحكم
            </button>
          )}

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

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="nav-btn"
            >
              <LogOut className="icon" />
              تسجيل خروج
            </button>
          ) : (
            <button
              onClick={() => navigate("/SigninForm")}
              className={`nav-btn ${isActive("/SigninForm")}`}
            >
              <LogIn className="icon" />
              تسجيل دخول
            </button>
          )}
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
              <p>نحن دائمًا هنا لمساعدتك</p>

              <div className="contact-grid">
                <div className="contact-card">
                  <div className="icon-wrapper green">
                    <MapPin className="icon" />
                  </div>
                  <h3>موقعنا</h3>
                  <p dir="rtl">
                  <strong>📍 المغار</strong>
                  <br />
                </p>

                </div>

                <div className="contact-card">
                  <div className="icon-wrapper blue">
                    <Mail className="icon" />
                  </div>
                  <h3>راسلنا</h3>
                  <p>
                  <strong>zedan.cpa@gmail.com</strong>
                  <br />
                  </p>
                </div>

                <div className="contact-card">
                  <div className="icon-wrapper orange">
                    <Phone className="icon" />
                  </div>
                  <h3>اتصل بنا</h3>
                  <p dir="rtl">
                    <strong>0528092596</strong> 
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
