'use client'

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    Home,
    Calculator,
    User,
    LogOut,
} from "lucide-react";
import "../../styles/Layout/Header.css";

const PrivateHeader = () => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path) => (pathname === path ? "active" : "");

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        router.push("/SigninForm");
    };

    return (
        <header className="header">
            <div className="logo" onClick={() => router.push("/")}>
                <User className="logo-icon" />
                <div className="logo-texts">
                    <span className="logo-title">منطقة المستخدم</span>
                    <span className="logo-subtitle">مرحباً بك</span>
                </div>
            </div>

            <nav className="nav">
                <button onClick={() => router.push("/")} className={`nav-btn ${isActive("/")}`}>
                    <Home className="icon" /> الرئيسية
                </button>
                <button onClick={() => router.push("/CalculatorsPage")} className={`nav-btn ${isActive("/CalculatorsPage")}`}>
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
