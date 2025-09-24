import React, { useState, useEffect } from "react";
import "../styles/AdminPage2.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const COLORS = ["#2563eb", "#f97316", "#10b981", "#e11d48"];

const AdminPage2 = () => {
    const navigate = useNavigate();

    // ✅ States to store DB data
    const [stats, setStats] = useState({ users: 0, courses: 0, reports: 0 });
    const [usersPerMonth, setUsersPerMonth] = useState([]);
    const [courseCategories, setCourseCategories] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    // ✅ حماية الصفحة + جلب البيانات
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

            // 🚀 جلب بيانات الـ dashboard
            fetch("http://127.0.0.1:8000/admin/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("📊 Dashboard Data:", data);
                    setStats(data.quick_stats || {});
                    setUsersPerMonth(
                        (data.users_per_month || []).map((u) => ({
                            month: u.month,
                            count: u.new_users,
                        }))
                    );
                    setCourseCategories(
                        (data.courses_distribution || []).map((c) => ({
                            name: c.category,
                            value: c.count,
                        }))
                    );
                    setRecentActivity(
                        (data.recent_activity || []).map((act, i) => ({
                            id: i,
                            action: act.action,
                            detail: act.details,
                        }))
                    );
                })
                .catch((err) => console.error("❌ Dashboard fetch error:", err));
        } catch (err) {
            localStorage.removeItem("access_token");
            navigate("/SigninForm");
        }
    }, [navigate]);

    return (
        <div className="admin-container">
            <div className="admin-body">
                {/* Sidebar */}
                <aside className="admin-sidebar">
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
                    <p>اختر أحد الخيارات أو استعرض الإحصائيات التالية:</p>

                    {/* Quick Stats */}
                    <div className="stats-grid">
                        <div className="stat-card blue">👥 المستخدمون: {stats.users}</div>
                        <div className="stat-card orange">📚 الدورات: {stats.courses}</div>
                        <div className="stat-card green">🧾 التقارير: {stats.reports}</div>
                    </div>

                    {/* Charts */}
                    <div className="charts-grid">
                        <div className="chart-box">
                            <h3>📈 المستخدمون الجدد كل شهر</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={usersPerMonth}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#2563eb" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="chart-box">
                            <h3>📊 توزيع الدورات حسب الفئة</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={courseCategories}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        dataKey="value"
                                        label
                                    >
                                        {courseCategories.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="activity-box">
                        <h3>🕒 آخر النشاطات</h3>
                        <table className="activity-table">
                            <thead>
                                <tr>
                                    <th>العملية</th>
                                    <th>التفاصيل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentActivity.map((act) => (
                                    <tr key={act.id}>
                                        <td>{act.action}</td>
                                        <td>{act.detail}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPage2;
