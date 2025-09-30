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
import NavButton from "./NavButton";

const navItems = [
  { path: "/", label: "الرئيسية", Icon: Home },
  { path: "/Courses", label: "الدورات", Icon: BookOpen },
  { path: "/articles", label: "المقالات", Icon: FileText },
  { path: "/CalculatorsPage", label: "الآلات الحاسبة", Icon: Calculator },
  { path: "/AboutUs", label: "حول المكتب", Icon: Info },
  { path: "/SigninForm", label: "تسجيل دخول", Icon: LogIn },
];

const contactInfo = [
  {
    title: "موقعنا",
    icon: MapPin,
    color: "green",
    details: "المغار | 📍 <br /> شارع",
  },
  {
    title: "راسلنا",
    icon: Mail,
    color: "blue",
    details: "info@accounting-office.com <br /> training@accounting-office.com",
  },
  {
    title: "اتصل بنا",
    icon: Phone,
    color: "orange",
    details: "+970 599 123 456 <br /> +970 567 890 123",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showContact, setShowContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
          {navItems.map(({ path, label, Icon }) => (
            <NavButton key={path} path={path} label={label} Icon={Icon} />
          ))}
        </nav>

        {/* Contact CTA */}
        <button className="cta-btn" onClick={() => setShowContact(true)}>
          <Phone className="icon" />
          <span>اتصل بنا</span>
        </button>
      </header>

      {/* Contact Modal */}
      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                {contactInfo.map(({ title, icon: Icon, color, details }) => (
                  <div key={title} className="contact-card">
                    <div className={`icon-wrapper ${color}`}>
                      <Icon className="icon" />
                    </div>
                    <h3>{title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: details }} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
