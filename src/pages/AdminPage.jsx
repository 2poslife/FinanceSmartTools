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

// ✅ Public API base (Render deployment)
const API_BASE = "https://financesmarttools-backend.onrender.com";

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

        const url = `${API_BASE}/admin/dashboard/users-stats?year=${year}&token=${encodeURIComponent(token)}`;

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

    // ✅ Create user
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
            const url = `${API_BASE}/user/admin/create-user?token=${token}`;
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
            {/* rest of your JSX unchanged */}
        </div>
    );
};

export default AdminPage;
