import React, { useState, useEffect } from "react";
import "../../styles/Admin/AdminPage.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
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

    // Dashboard stats
    const [dashboardStats, setDashboardStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        newUsersToday: 0,
        totalCalculations: 0
    });

    // Mock data for demonstration
    const pieData = [
        { name: 'مستخدمين عاديين', value: 85, color: '#3B82F6' },
        { name: 'مدراء', value: 15, color: '#10B981' }
    ];

    const recentActivity = [
        { id: 1, action: 'مستخدم جديد', user: 'أحمد محمد', time: 'منذ 5 دقائق', type: 'user' },
        { id: 2, action: 'حساب ضريبي', user: 'فاطمة علي', time: 'منذ 12 دقيقة', type: 'calculation' },
        { id: 3, action: 'تسجيل دخول', user: 'محمد حسن', time: 'منذ 25 دقيقة', type: 'login' },
        { id: 4, action: 'مستخدم جديد', user: 'سارة أحمد', time: 'منذ ساعة', type: 'user' },
        { id: 5, action: 'حساب راتب', user: 'علي محمود', time: 'منذ ساعتين', type: 'calculation' }
    ];

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
                
                // Update dashboard stats with mock data for demonstration
                setDashboardStats({
                    totalUsers: 1247,
                    activeUsers: 892,
                    newUsersToday: 23,
                    totalCalculations: 15678
                });
            })
            .catch((err) => {
                console.error("❌ Users stats fetch error:", err);
                setErrMsg("حدث خطأ أثناء جلب بيانات المستخدمين.");
                
                // Set mock data on error for demonstration
                setDashboardStats({
                    totalUsers: 1247,
                    activeUsers: 892,
                    newUsersToday: 23,
                    totalCalculations: 15678
                });
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
                {/* Left Sidebar */}
                <aside className="admin-sidebar">
                    <div className="sidebar-header">
                        <h3>لوحة الإدارة</h3>
                    </div>
                    
                    <nav className="sidebar-nav">
                        <div className="nav-item active" onClick={() => window.location.reload()}>
                            <span className="nav-icon">📊</span>
                            <span className="nav-text">لوحة التحكم</span>
                        </div>
                        <div className="nav-item" onClick={() => setShowAddUser(true)}>
                            <span className="nav-icon">👥</span>
                            <span className="nav-text">إضافة مستخدم</span>
                        </div>
                        <div className="nav-item" onClick={() => navigate("/AdminConsts")}>
                            <span className="nav-icon">⚙️</span>
                            <span className="nav-text">تعديل الثوابت</span>
                        </div>
                        <div className="nav-item" onClick={() => navigate("/CalculatorsPage")}>
                            <span className="nav-icon">🧮</span>
                            <span className="nav-text">إدارة الحاسبات</span>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="admin-content">
                    <div className="content-header">
                        <h1>لوحة الإدارة</h1>
                    </div>

                    {/* Simple Stats */}
                    <div className="simple-stats">
                        <div className="stat-item">
                            <h3>{dashboardStats.totalUsers}</h3>
                            <p>إجمالي المستخدمين</p>
                        </div>
                    </div>

                    {/* Simple Chart */}
                    <div className="simple-chart">
                        <div className="year-selector">
                            <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                                <option value={2025}>2025</option>
                                <option value={2026}>2026</option>
                                <option value={2027}>2027</option>
                            </select>
                        </div>
                        
                        {loading ? (
                            <div className="loading">جاري التحميل...</div>
                        ) : errMsg ? (
                            <div className="error">{errMsg}</div>
                        ) : (
                            <div className="chart">
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={usersPerMonth}>
                                        <XAxis dataKey="month" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#2563eb" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
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
