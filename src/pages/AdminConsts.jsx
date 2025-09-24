import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Pencil, Save, Loader2, LogOut, Home, ChevronDown, ChevronUp } from "lucide-react";
import "../styles/AdminConsts.css";

const API_BASE = "http://127.0.0.1:8000";

const groups = [
    {
        title: "التأمين الوطني (صاحب العمل)",
        fields: [
            { key: "BTL_EMPLOYER_LOW", label: "تأمين وطني (صاحب عمل) – معدل منخفض" },
            { key: "BTL_EMPLOYER_HIGH", label: "تأمين وطني (صاحب عمل) – معدل مرتفع" },
        ],
    },
    {
        title: "التأمين الوطني (موظف)",
        fields: [
            { key: "BTL_THRESHOLD", label: "عتبة التأمين الوطني" },
            { key: "BTL_EMPLOYEE_LOW", label: "تأمين وطني (موظف) – معدل منخفض" },
            { key: "BTL_EMPLOYEE_HIGH", label: "تأمين وطني (موظف) – معدل مرتفع" },
        ],
    },
    {
        title: "ضريبة الدخل",
        fields: [
            { key: "CREDIT_POINT_VALUE", label: "قيمة نقطة الائتمان" },
            { key: "INCOME_TAX_BRACKETS", label: "مدرجات ضريبة الدخل (JSON)" },
        ],
    },
    {
        title: "التقاعد",
        fields: [
            { key: "PENSION_EMPLOYEE", label: "اقتطاع التقاعد (موظف)" },
            { key: "PENSION_EMPLOYER", label: "مساهمة التقاعد (صاحب عمل)" },
            { key: "PENSION_EMPLOYEE_TAX_CREDIT_FACTOR", label: "معامل الائتمان الضريبي للتقاعد" },
        ],
    },
];

export default function AdminConsts() {
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
        <div className="adminconsts-container" dir="rtl">


            <p className="adminconsts-subtitle">
                تعديل القيم المستخدمة في حاسبات الضرائب والمعاشات.
            </p>

            {loading ? (
                <p className="adminconsts-loading">⏳ جاري التحميل...</p>
            ) : (
                <div className="adminconsts-grid">
                    {groups.map((group) => (
                        <div
                            key={group.title}
                            className={`adminconsts-card ${group.fields.some((f) => f.key === "INCOME_TAX_BRACKETS") ? "json-card" : ""
                                }`}
                        >
                            <div className="adminconsts-card-header">{group.title}</div>
                            <div className="adminconsts-card-body">
                                {group.fields.map((f) => (
                                    <div key={f.key} className="adminconsts-field">
                                        <div className="adminconsts-field-info">
                                            <p className="adminconsts-field-label">{f.label}</p>
                                            {f.key === "INCOME_TAX_BRACKETS" ? (
                                                <div>
                                                    <pre
                                                        className={`adminconsts-json-wrapper ${expanded ? "expanded" : ""}`}
                                                    >
                                                        {JSON.stringify(consts[f.key], null, 2)}
                                                    </pre>
                                                    <button
                                                        className="adminconsts-toggle"
                                                        onClick={() => setExpanded((prev) => !prev)}
                                                    >
                                                        {expanded ? "إخفاء" : "عرض المزيد"}
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="adminconsts-field-value">{String(consts[f.key])}</p>
                                            )}

                                        </div>
                                        <button
                                            className="adminconsts-edit-btn"
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
                <div className="adminconsts-modal">
                    <div className="adminconsts-modal-box">
                        <h2>{editing.label}</h2>
                        <textarea
                            value={editing.value}
                            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                            className="adminconsts-input"
                            rows={6}
                        />
                        <div className="adminconsts-modal-actions">
                            <button className="adminconsts-cancel" onClick={() => setEditing(null)}>
                                إلغاء
                            </button>
                            <button
                                className="adminconsts-save"
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
