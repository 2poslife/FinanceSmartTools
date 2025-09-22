import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserPage.css";

const UserPage = () => {
    const navigate = useNavigate();
    const [selectedTool, setSelectedTool] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/SigninForm");
    };

    return (
        <div className="user-container">
            {/* Header */}
            <header className="user-header">
                <h1>مرحبا بك 👋 – صفحة المستخدم</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    تسجيل الخروج
                </button>
            </header>

            <div className="user-body">
                {/* Sidebar with cards */}
                <aside className="user-sidebar">
                    <div
                        className={`sidebar-card ${selectedTool === "salary" ? "active" : ""}`}
                        onClick={() => setSelectedTool("salary")}
                    >
                        💼 حاسبة راتب
                    </div>
                    <div
                        className={`sidebar-card ${selectedTool === "pension" ? "active" : ""}`}
                        onClick={() => setSelectedTool("pension")}
                    >
                        🏦 التقاعد / التأمين
                    </div>
                    <div
                        className={`sidebar-card ${selectedTool === "self" ? "active" : ""}`}
                        onClick={() => setSelectedTool("self")}
                    >
                        📊 حاسبة مستقل
                    </div>
                    <div
                        className={`sidebar-card ${selectedTool === "report" ? "active" : ""}`}
                        onClick={() => setSelectedTool("report")}
                    >
                        📑 تقارير
                    </div>
                </aside>

                {/* Main content */}
                <main className="user-content">
                    {!selectedTool && <p>اختر أداة من القائمة على اليسار لبدء الحساب.</p>}

                    {selectedTool === "salary" && (
                        <div className="calc-box">
                            <h2>💼 حاسبة راتب</h2>
                            <p>أدخل راتبك الأساسي لحساب الخصومات.</p>
                            {/* Example input */}
                            <input type="number" placeholder="أدخل الراتب" />
                            <button className="calc-btn">احسب</button>
                        </div>
                    )}

                    {selectedTool === "pension" && (
                        <div className="calc-box">
                            <h2>🏦 التقاعد / التأمين</h2>
                            <p>احسب مساهمات التقاعد حسب القانون.</p>
                        </div>
                    )}

                    {selectedTool === "self" && (
                        <div className="calc-box">
                            <h2>📊 حاسبة مستقل</h2>
                            <p>أدخل دخلك كمستقل للحصول على التكلفة.</p>
                        </div>
                    )}

                    {selectedTool === "report" && (
                        <div className="calc-box">
                            <h2>📑 التقارير</h2>
                            <p>سيتم عرض تقارير المستخدم هنا.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default UserPage;
