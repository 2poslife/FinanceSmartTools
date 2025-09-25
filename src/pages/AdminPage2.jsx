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
} from "recharts";

// ✅ جميع الأشهر
const ALL_MONTHS = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const AdminPage2 = () => {
    const navigate = useNavigate();

    const [usersPerMonth, setUsersPerMonth] = useState([]);
    const [year, setYear] = useState(2025); // ✅ افتراضي
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

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

            // ✅ fetch with year
            const url = `http://127.0.0.1:8000/admin/dashboard/users-stats?year=${year}&token=${encodeURIComponent(
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
                    // دمج الأشهر مع الصفر
                    const stats = ALL_MONTHS.map((m) => {
                        const found = (data.users_per_month || []).find(
                            (u) => u.month === m
                        );
                        return { month: m, count: found ? found.new_users : 0 };
                    });
                    setUsersPerMonth(stats);
                })
                .catch((err) => {
                    console.error("❌ Users stats fetch error:", err);
                    setErrMsg("حدث خطأ أثناء جلب بيانات المستخدمين.");
                })
                .finally(() => setLoading(false));
        } catch (err) {
            console.error("❌ Token decode error:", err);
            localStorage.removeItem("access_token");
            navigate("/SigninForm");
        }
    }, [navigate, year]);

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
                    <h2>📈 إحصائيات المستخدمين</h2>
                    <p>عدد المستخدمين الجدد لكل شهر:</p>

                    {/* Year Selector */}
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
                </main>
            </div>
        </div>
    );
};

export default AdminPage2;
