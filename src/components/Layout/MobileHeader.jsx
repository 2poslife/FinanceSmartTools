'use client'

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  Menu,
  X,
  Monitor,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import "../../styles/Layout/MobileHeader.css";
import { getImageUrl } from "@/lib/utils";
const Logo = getImageUrl('logo.png');

const MobileHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const isActive = (path) => (pathname === path ? "active" : "");

  // Function to check and update login status
  const checkLoginStatus = () => {
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLoggedIn(false);
      setUserRole(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      
      if (isExpired) {
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
        setUserRole(null);
      } else {
        setIsLoggedIn(true);
        setUserRole(decoded.role);
      }
    } catch (err) {
      console.error("❌ Invalid token:", err);
      localStorage.removeItem("access_token");
      setIsLoggedIn(false);
      setUserRole(null);
    }
  };

  // Check if user is logged in (client-side only)
  useEffect(() => {
    checkLoginStatus();
    
    // Listen for storage changes (when token is set/removed from other tabs)
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    
    // Listen for custom auth event (when token is set/removed in same tab)
    const handleAuthChange = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [pathname]); // Re-check when pathname changes

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    setUserRole(null);
    setShowMenu(false);
    // Trigger auth change event
    window.dispatchEvent(new Event('authChange'));
    router.push("/SigninForm");
  };

  const handleNavigate = (path) => {
    router.push(path);
    setShowMenu(false);
  };

  // Listen for custom event to open contact modal
  useEffect(() => {
    const handleOpenContactModal = () => {
      console.log('MobileHeader received openContactModal event');
      setShowContact(true);
    };

    window.addEventListener('openContactModal', handleOpenContactModal);

    return () => {
      window.removeEventListener('openContactModal', handleOpenContactModal);
    };
  }, []);

  return (
    <>
      <header className="mobile-header">
        {/* Logo */}
        <div className="mobile-logo" onClick={() => handleNavigate("/")}>
          <img className="mobile-logo-img" src={Logo} alt="logo" />
          <span className="mobile-logo-title">زيدان - مكتب تدقيق حسابات</span>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle menu"
        >
          {showMenu ? (
            <X className="menu-icon" />
          ) : (
            <Menu className="menu-icon" />
          )}
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav-overlay ${showMenu ? "show" : ""}`}>
        <nav className="mobile-nav">
          <button
            onClick={() => handleNavigate("/")}
            className={`mobile-nav-btn ${isActive("/")}`}
          >
            <Home className="mobile-icon" />
            <span>الرئيسية</span>
          </button>

          {isLoggedIn && userRole === "admin" && (
            <button
              onClick={() => handleNavigate("/AdminPage")}
              className={`mobile-nav-btn control-panel-btn ${isActive("/AdminPage")}`}
              style={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                color: '#ffffff',
                fontWeight: '600',
                border: '2px solid #ff6b35'
              }}
            >
              <Monitor className="mobile-icon" />
              <span>لوحة التحكم</span>
            </button>
          )}

          <button
            onClick={() => handleNavigate("/courses")}
            className={`mobile-nav-btn ${isActive("/courses")}`}
          >
            <BookOpen className="mobile-icon" />
            <span>الدورات</span>
          </button>

          <button
            onClick={() => handleNavigate("/articles")}
            className={`mobile-nav-btn ${isActive("/articles")}`}
          >
            <FileText className="mobile-icon" />
            <span>المقالات</span>
          </button>

          <button
            onClick={() => handleNavigate("/CalculatorsPage")}
            className={`mobile-nav-btn ${isActive("/CalculatorsPage")}`}
          >
            <Calculator className="mobile-icon" />
            <span>الآلات الحاسبة</span>
          </button>

          <button
            onClick={() => handleNavigate("/AboutUs")}
            className={`mobile-nav-btn ${isActive("/about")}`}
          >
            <Info className="mobile-icon" />
            <span>حول المكتب</span>
          </button>

          <button
            onClick={() => {
              setShowContact(true);
              setShowMenu(false);
            }}
            className="mobile-nav-btn contact-btn"
          >
            <Phone className="mobile-icon" />
            <span>اتصل بنا</span>
          </button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="mobile-nav-btn logout-btn"
            >
              <LogOut className="mobile-icon" />
              <span>تسجيل خروج</span>
            </button>
          ) : (
            <button
              onClick={() => handleNavigate("/SigninForm")}
              className={`mobile-nav-btn ${isActive("/SigninForm")}`}
            >
              <LogIn className="mobile-icon" />
              <span>تسجيل دخول</span>
            </button>
          )}
        </nav>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div
          className="mobile-modal-overlay"
          onClick={() => setShowContact(false)}
        >
          <div
            className="mobile-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mobile-modal-close"
              onClick={() => setShowContact(false)}
            >
              ✖
            </button>

            <section className="mobile-about-contact">
              <h2>تواصل معنا</h2>
              <p>نحن دائمًا هنا لمساعدتك</p>

              <div className="mobile-contact-grid">
                <div className="mobile-contact-card">
                  <div className="mobile-icon-wrapper green">
                    <MapPin className="mobile-contact-icon" />
                  </div>
                  <h3>موقعنا</h3>
                  <p dir="rtl">
                    <strong>📍 المغار</strong>
                  </p>
                </div>

                <div className="mobile-contact-card">
                  <div className="mobile-icon-wrapper blue">
                    <Mail className="mobile-contact-icon" />
                  </div>
                  <h3>راسلنا</h3>
                  <p>
                    <strong>zedan.cpa@gmail.com</strong>
                  </p>
                </div>

                <div className="mobile-contact-card">
                  <div className="mobile-icon-wrapper orange">
                    <Phone className="mobile-contact-icon" />
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

export default MobileHeader;
