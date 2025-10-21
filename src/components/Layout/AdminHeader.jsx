import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Settings, LogOut, Users, BarChart, Calculator, Info, FileText, BookOpen, Monitor } from "lucide-react";
import "../../styles/Layout/Header.css";

const AdminHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => (location.pathname === path ? "active" : "");

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/SigninForm");
    };

    return (
        <header className="header admin-header">
            <div className="logo" onClick={() => navigate("/AdminPage")}>
                <Settings className="logo-icon" />
                <div className="logo-texts">
                    <span className="logo-title">منطقة الإدارة</span>
                    <span className="logo-subtitle">لوحة التحكم</span>
                </div>
            </div>

            <nav className="nav">
                <button
                    onClick={() => navigate("/AdminPage")}
                    className={`nav-btn control-panel-btn ${isActive("/AdminPage")}`}
                    style={{
                        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                        color: '#ffffff',
                        fontWeight: '600',
                        border: '2px solid #ff6b35',
                        boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
                    }}
                >
                    <Monitor className="icon" /> لوحة التحكم
                </button>
                <button
                    onClick={() => navigate("/")}
                    className={`nav-btn ${isActive("/")}`}
                >
                    <Home className="icon" /> الرئيسية
                </button>
                <button
                    onClick={() => navigate("/courses")}
                    className={`nav-btn ${isActive("/courses")}`}
                >
                    <BookOpen className="icon" /> الدورات
                </button>
                <button
                    onClick={() => navigate("/articles")}
                    className={`nav-btn ${isActive("/articles")}`}
                >
                    <FileText className="icon" /> المقالات
                </button>
                <button
                    onClick={() => navigate("/CalculatorsPage")}
                    className={`nav-btn ${isActive("/CalculatorsPage")}`}
                >
                    <Calculator className="icon" /> الآلات الحاسبة
                </button>
                <button
                    onClick={() => navigate("/AboutUs")}
                    className={`nav-btn ${isActive("/AboutUs")}`}
                >
                    <Info className="icon" /> حول المكتب
                </button>
            </nav>

            <button className="cta-btn danger" onClick={handleLogout}>
                <LogOut className="icon" /> تسجيل خروج
            </button>
        </header>
    );
};

export default AdminHeader;
