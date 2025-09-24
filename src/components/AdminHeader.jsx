import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Settings, LogOut, Users, BarChart } from "lucide-react";
import "./Styles/Header.css";

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
                    className={`nav-btn ${isActive("/AdminPage")}`}
                >
                    <Home className="icon" /> الصفحة الرئيسية
                </button>
                <button
                    onClick={() => navigate("/AdminConsts")}
                    className={`nav-btn ${isActive("/AdminConsts")}`}
                >
                    <BarChart className="icon" /> الثوابت
                </button>

            </nav>

            <button className="cta-btn danger" onClick={handleLogout}>
                <LogOut className="icon" /> تسجيل خروج
            </button>
        </header>
    );
};

export default AdminHeader;
