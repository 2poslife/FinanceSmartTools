import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Pencil, Save, Loader2, LogOut, Home, ChevronDown, ChevronUp } from "lucide-react";
import "../../styles/Admin/AdminConsts.css";

const API_BASE = "https://financesmarttools-backend.onrender.com";

const groups = [
    {
        title: "ביטוח לאומי (מעסיק)",
        fields: [
            { key: "BTL_EMPLOYER_LOW", label: "ביטוח לאומי (מעסיק) – שיעור נמוך" },
            { key: "BTL_EMPLOYER_HIGH", label: "ביטוח לאומי (מעסיק) – שיעור גבוה" },
        ],
    },
    {
        title: "ביטוח לאומי (עובד)",
        fields: [
            { key: "BTL_THRESHOLD", label: "סף ביטוח לאומי" },
            { key: "BTL_EMPLOYEE_LOW", label: "ביטוח לאומי (עובד) – שיעור נמוך" },
            { key: "BTL_EMPLOYEE_HIGH", label: "ביטוח לאומי (עובד) – שיעור גבוה" },
        ],
    },
    {
        title: "מס הכנסה",
        fields: [
            { key: "CREDIT_POINT_VALUE", label: "ערך נקודת זיכוי" },
            { key: "INCOME_TAX_BRACKETS", label: "מדרגות מס הכנסה (JSON)" },
        ],
    },
    {
        title: "פנסיה",
        fields: [
            { key: "PENSION_EMPLOYEE", label: "ניכוי פנסיה (עובד)" },
            { key: "PENSION_EMPLOYER", label: "הפרשת פנסיה (מעסיק)" },
            { key: "PENSION_EMPLOYEE_TAX_CREDIT_FACTOR", label: "מקדם זיכוי מס לפנסיה" },
        ],
    },
];

export default function AdminConsts() {
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const navigate = useNavigate();
    const [consts, setConsts] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [expanded, setExpanded] = useState(false); // toggle JSON

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) return navigate("/SigninForm");

        try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now() || decoded.role !== "admin") {
                localStorage.removeItem("access_token");
                return navigate("/SigninForm");
            }
            fetchConsts(token);
        } catch {
            localStorage.removeItem("access_token");
            navigate("/SigninForm");
        }
    }, [navigate]);

    const fetchConsts = async (token) => {
        setLoading(true);
        const res = await fetch(`${API_BASE}/consts?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        setConsts(data);
        setLoading(false);
    };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        const token = localStorage.getItem("access_token");
        await fetch(`${API_BASE}/consts/update?token=${encodeURIComponent(token)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ field: editing.key, value: editing.value }),
        });
        setConsts((prev) => ({ ...prev, [editing.key]: editing.value }));
        setEditing(null);
        setSaving(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/SigninForm");
    };

    return (
        <div className="admin-consts-container" dir="rtl">


            <p className="admin-consts-subtitle">
                تعديل القيم المستخدمة في حاسبات الضرائب والمعاشات.
            </p>

            {loading ? (
                <p className="admin-consts-loading">⏳ جاري التحميل...</p>
            ) : (
                <div className="admin-consts-grid">
                    {groups.map((group) => (
                        <div
                            key={group.title}
                            className={`admin-consts-card ${group.fields.some((f) => f.key === "INCOME_TAX_BRACKETS") ? "admin-consts-json-card" : ""
                                }`}
                        >
                            <div className="admin-consts-card-header">{group.title}</div>
                            <div className="admin-consts-card-body">
                                {group.fields.map((f) => (
                                    <div key={f.key} className="admin-consts-field">
                                        <div className="admin-consts-field-info">
                                            <p className="admin-consts-field-label">{f.label}</p>
                                            {f.key === "INCOME_TAX_BRACKETS" ? (
                                                <div>
                                                    <pre
                                                        className={`admin-consts-json-wrapper ${expanded ? "admin-consts-expanded" : ""}`}
                                                    >
                                                        {JSON.stringify(consts[f.key], null, 2)}
                                                    </pre>
                                                    <button
                                                        className="admin-consts-toggle"
                                                        onClick={() => setExpanded((prev) => !prev)}
                                                    >
                                                        {expanded ? "إخفاء" : "عرض المزيد"}
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="admin-consts-field-value">{String(consts[f.key])}</p>
                                            )}

                                        </div>
                                        <button
                                            className="admin-consts-edit-btn"
                                            onClick={() =>
                                                setEditing({
                                                    key: f.key,
                                                    label: f.label,
                                                    value:
                                                        f.key === "INCOME_TAX_BRACKETS"
                                                            ? JSON.stringify(consts[f.key], null, 2)
                                                            : consts[f.key],
                                                })
                                            }
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {editing && (
                <div className="admin-consts-modal">
                    <div className="admin-consts-modal-box">
                        <h2>{editing.label}</h2>
                        <textarea
                            value={editing.value}
                            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                            className="admin-consts-input"
                            rows={6}
                        />
                        <div className="admin-consts-modal-actions">
                            <button className="admin-consts-cancel" onClick={() => setEditing(null)}>
                                إلغاء
                            </button>
                            <button
                                className="admin-consts-save"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                                حفظ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
