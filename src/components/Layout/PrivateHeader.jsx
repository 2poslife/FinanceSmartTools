import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Home,
    Calculator,
    User,
    LogOut,
} from "lucide-react";
import "./Header.css";

const PrivateHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => (location.pathname === path ? "active" : "");

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/SigninForm");
    };

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate("/")}>
                <User className="logo-icon" />
                <div className="logo-texts">
                    <span className="logo-title">منطقة المستخدم</span>
                    <span className="logo-subtitle">مرحباً بك</span>
                </div>
            </div>

            <nav className="nav">
                <button onClick={() => navigate("/UserPage")} className={`nav-btn ${isActive("/UserPage")}`}>
                    <Home className="icon" /> الرئيسية
                </button>
                <button onClick={() => navigate("/CalculatorsPage")} className={`nav-btn ${isActive("/CalculatorsPage")}`}>
                    <Calculator className="icon" /> الآلات الحاسبة
                </button>
            </nav>

            <button className="cta-btn danger" onClick={handleLogout}>
                <LogOut className="icon" /> تسجيل خروج
            </button>
        </header>
    );
};

export default PrivateHeader;
