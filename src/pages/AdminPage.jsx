import React, { useState, useEffect } from "react";
import "../styles/AdminPage.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminPage = () => {
    const navigate = useNavigate();
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState("regular");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    // ✅ Check token on page load
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/SigninForm");
            return;
        }

        try {
            const decoded = jwtDecode(token);

            // check expiry
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem("access_token");
                navigate("/SigninForm");
                return;
            }

            // check role
            if (decoded.role !== "admin") {
                navigate("/SigninForm");
                return;
            }
        } catch (err) {
            console.error("❌ Invalid token:", err);
            localStorage.removeItem("access_token");
            navigate("/SigninForm");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/SigninForm");
    };

    const resetFields = () => {
        setNewUsername("");
        setNewPassword("");
        setNewRole("regular");
        setMessage("");
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setMessage("");

        if (newPassword.length < 6) {
            setMessage("❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل");
            return;
        }

        try {
            const token = localStorage.getItem("access_token");
            const url = `http://127.0.0.1:8000/user/admin/create-user?token=${token}`;
            const body = {
                username: newUsername,
                role: newRole,
                password: newPassword,
            };

            console.log("==== Frontend Request ====");
            console.log("URL:", url);
            console.log("Headers:", {
                Accept: "application/json",
                "Content-Type": "application/json",
            });
            console.log("Body:", body);
            console.log("==========================");

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            console.log("📥 Response:", data);

            if (!response.ok) {
                throw new Error(data.detail || "فشل في إنشاء المستخدم");
            }

            setMessage("✅ تم إنشاء المستخدم بنجاح");
            resetFields();
            setShowAddUser(false);
        } catch (err) {
            console.error("❌ Error during request:", err);
            setMessage(`❌ ${err.message}`);
        }
    };

    return (
        <div className="admin-container">
            {/* Header */}
            <header className="admin-header">
                <h1>لوحة الإدارة – FinanceSmartTools</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    تسجيل الخروج
                </button>
            </header>

            <div className="admin-body">
                {/* Sidebar */}
                <aside className="admin-sidebar">
                    <div className="sidebar-card" onClick={() => setShowAddUser(true)}>
                        ➕ إضافة مستخدم
                    </div>
                    <div className="sidebar-card" onClick={() => navigate("/AdminConsts")}>
                        ⚙️ تعديل الثوابت
                    </div>
                    <div className="sidebar-card" onClick={() => navigate("/CalculatorsPage")}>
                        🧮 المحاسبات والضرائب
                    </div>
                    <div className="sidebar-card">📊 التقارير</div>
                </aside>

                {/* Main Content */}
                <main className="admin-content">
                    <h2>مرحباً بك في لوحة الإدارة</h2>
                    <p>اختر أحد الخيارات من القائمة على اليسار.</p>
                </main>
            </div>

            {/* Add User Panel */}
            {showAddUser && (
                <div className="overlay">
                    <div className="panel-box">
                        <h3>➕ إضافة مستخدم جديد</h3>
                        <form onSubmit={handleAddUser}>
                            <div className="form-group">
                                <label>اسم المستخدم</label>
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group password-field">
                                <label>كلمة المرور</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </div>

                            <div className="form-group">
                                <label>الدور</label>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                >
                                    <option value="regular">مستخدم</option>
                                    <option value="admin">أدمِن</option>
                                </select>
                            </div>

                            <div className="panel-actions">
                                <button type="submit" className="submit-btn">
                                    إنشاء
                                </button>
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => {
                                        resetFields();
                                        setShowAddUser(false);
                                    }}
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                        {message && <p className="message">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
