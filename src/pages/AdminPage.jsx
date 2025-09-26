import React, { useState, useEffect } from "react";
import "../styles/AdminPage.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// ✅ جميع الأشهر
const ALL_MONTHS = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const AdminPage = () => {
    const navigate = useNavigate();

    // Add User states
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState("regular");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    // Users stats states
    const [usersPerMonth, setUsersPerMonth] = useState([]);
    const [year, setYear] = useState(2025);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    // ✅ Check token on load
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/SigninForm");
            return;
        }

        try {
            const decoded = jwtDecode(token);

            if (decoded.exp * 1000 < Date.now() || decoded.role !== "admin") {
                localStorage.removeItem("access_token");
                navigate("/SigninForm");
                return;
            }
        } catch (err) {
            console.error("❌ Invalid token:", err);
            localStorage.removeItem("access_token");
            navigate("/SigninForm");
        }
    }, [navigate]);

    // ✅ Fetch users stats
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const url = `https://financesmarttools-backend.onrender.com/admin/dashboard/users-stats?year=${year}&token=${encodeURIComponent(
            token
        )}`;

        setLoading(true);
        setErrMsg("");

        fetch(url, { headers: { Accept: "application/json" } })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || `HTTP ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const stats = ALL_MONTHS.map((m) => {
                    const found = (data.users_per_month || []).find((u) => u.month === m);
                    return { month: m, count: found ? found.new_users : 0 };
                });
                setUsersPerMonth(stats);
            })
            .catch((err) => {
                console.error("❌ Users stats fetch error:", err);
                setErrMsg("حدث خطأ أثناء جلب بيانات المستخدمين.");
            })
            .finally(() => setLoading(false));
    }, [year]);

    // Add user
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
            const url = `https://financesmarttools-backend.onrender.com/user/admin/create-user?token=${token}`;
            const body = {
                username: newUsername,
                role: newRole,
                password: newPassword,
            };

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
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
                    {/* <div className="sidebar-card">📊 التقارير</div> */}
                </aside>

                {/* Main Content */}
                <main className="admin-content">
                    <h2>مرحباً بك في لوحة الإدارة</h2>
                    <p>اختر أحد الخيارات من القائمة على اليسار.</p>

                    {/* User stats */}
                    <section style={{ marginTop: "40px" }}>
                        <h3>📈 إحصائيات المستخدمين</h3>
                        <p>عدد المستخدمين الجدد لكل شهر:</p>

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ marginRight: "8px" }}>اختر السنة:</label>
                            <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                                <option value={2025}>2025</option>
                                <option value={2026}>2026</option>
                                <option value={2027}>2027</option>
                            </select>
                        </div>

                        {loading ? (
                            <div style={{ padding: 24 }}>⏳ جارِ تحميل البيانات…</div>
                        ) : errMsg ? (
                            <div style={{ padding: 24, color: "#b91c1c" }}>{errMsg}</div>
                        ) : (
                            <div className="chart-box" style={{ maxWidth: "600px", margin: "0 auto" }}>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={usersPerMonth}>
                                        <XAxis dataKey="month" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#2563eb" barSize={25} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </section>
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
                                <button type="submit" className="submit-btn">إنشاء</button>
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
