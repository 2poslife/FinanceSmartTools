import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  FileText,
  Calculator,
  Info,
  Phone,
} from "lucide-react";
import "./Styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <BookOpen className="logo-icon" />
        <div className="logo-texts">
          <span className="logo-title">مكتب المحاسبة المتقدم</span>
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
          onClick={() => navigate("/calculators")}
          className={`nav-btn ${isActive("/calculators")}`}
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
      </nav>

      {/* CTA Button */}
      <button className="cta-btn">
        <Phone className="icon" />
        اتصل بنا
      </button>
    </header>
  );
};

export default Header;
