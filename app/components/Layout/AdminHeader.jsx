'use client'

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Settings, LogOut, Users, BarChart, Calculator, Info, FileText, BookOpen, Monitor } from "lucide-react";
import "../../styles/Layout/Header.css";

const AdminHeader = () => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path) => (pathname === path ? "active" : "");

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("access_token");
        }
        router.push("/SigninForm");
    };

    return (
        <header className="header admin-header">
            <div className="logo" onClick={() => router.push("/AdminPage")}>
                <Settings className="logo-icon" />
                <div className="logo-texts">
                    <span className="logo-title">منطقة الإدارة</span>
                    <span className="logo-subtitle">لوحة التحكم</span>
                </div>
            </div>

            <nav className="nav">
                <button
                    onClick={() => router.push("/AdminPage")}
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
                    onClick={() => router.push("/")}
                    className={`nav-btn ${isActive("/")}`}
                >
                    <Home className="icon" /> الرئيسية
                </button>
                <button
                    onClick={() => router.push("/courses")}
                    className={`nav-btn ${isActive("/courses")}`}
                >
                    <BookOpen className="icon" /> الدورات
                </button>
                <button
                    onClick={() => router.push("/articles")}
                    className={`nav-btn ${isActive("/articles")}`}
                >
                    <FileText className="icon" /> المقالات
                </button>
                <button
                    onClick={() => router.push("/CalculatorsPage")}
                    className={`nav-btn ${isActive("/CalculatorsPage")}`}
                >
                    <Calculator className="icon" /> الآلات الحاسبة
                </button>
                <button
                    onClick={() => router.push("/AboutUs")}
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
