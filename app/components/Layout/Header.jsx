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
  Monitor,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import "../../styles/Layout/Header.css";
import { getImageUrl } from "@/lib/utils";
const Logo = getImageUrl('logo.png');
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
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
    
    // Also check on pathname change (in case login happens on same page)
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [pathname]); // Re-check when pathname changes

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    setUserRole(null);
    // Trigger auth change event
    window.dispatchEvent(new Event('authChange'));
    router.push("/SigninForm");
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
        <div className="logo" onClick={() => router.push("/")}>
          <img className="logo-img" src={Logo} alt="logo" />
          <div className="logo-texts">
            <span className="logo-title">زيدان - مكتب تدقيق حسابات</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav">
          {isLoggedIn && userRole === "admin" && (
            <button
              onClick={() => router.push("/AdminPage")}
              className={`nav-btn control-panel-btn ${isActive("/AdminPage")}`}
            >
              <Monitor className="icon" />
              لوحة التحكم
            </button>
          )}

          <button
            onClick={() => router.push("/")}
            className={`nav-btn ${isActive("/")}`}
          >
            <Home className="icon" />
            الرئيسية
          </button>

          <button
            onClick={() => router.push("/courses")}
            className={`nav-btn ${isActive("/courses")}`}
          >
            <BookOpen className="icon" />
            الدورات
          </button>

          <button
            onClick={() => router.push("/articles")}
            className={`nav-btn ${isActive("/articles")}`}
          >
            <FileText className="icon" />
            المقالات
          </button>

          <button
            onClick={() => router.push("/CalculatorsPage")}
            className={`nav-btn ${isActive("/CalculatorsPage")}`}
          >
            <Calculator className="icon" />
            الآلات الحاسبة
          </button>

          <button
            onClick={() => router.push("/AboutUs")}
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
              onClick={() => router.push("/SigninForm")}
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
