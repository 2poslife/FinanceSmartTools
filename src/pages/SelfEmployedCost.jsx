import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LogOut,
    Home,
    Calculator,
    ChevronDown,
    ChevronUp,
    AlertTriangle,
} from "lucide-react";
import "../styles/SelfEmployedCost.css";

const API_BASE = "https://financesmarttools-backend.onrender.com";

export default function SelfEmployedCost() {
    const navigate = useNavigate();

    const [yearlyIncome, setYearlyIncome] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [authError, setAuthError] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/SigninForm");
    };

    const handleCalculate = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setAuthError(true);
            return;
        }
        if (!yearlyIncome || isNaN(yearlyIncome) || parseFloat(yearlyIncome) <= 0) {
            alert("אנא הזן הכנסה שנתית תקינה");
            return;
        }
        setLoading(true);
        setAuthError(false);

        try {
            const res = await fetch(
                `${API_BASE}/self-employed/self-employed?token=${encodeURIComponent(token)}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        yearly_income: parseFloat(yearlyIncome),
                    }),
                }
            );

            if (res.status === 401 || res.status === 403) {
                setAuthError(true);
                setResult(null);
                return;
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error("❌ Error calculating:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="calcpage" dir="rtl">


            {/* Intro */}
            <section className="calcpage-intro">
                <h1>מחשבון עצמאי</h1>
                <p className="calcpage-tagline">
                    רוצים לדעת כמה תשלמו לביטוח לאומי כעצמאים? המחשבון הזה בשבילכם.
                </p>
                <div className="calcpage-hero-box">
                    כאן תגלו את החבות החודשית והשנתית לביטוח לאומי, בהתאם להכנסה השנתית שלכם.
                    פשוט הזינו את ההכנסה השנתית ותראו את התוצאה מיד.
                </div>
            </section>

            {/* Form */}
            <section className="calcpage-form">
                <h2>🧮 בצעו חישוב</h2>
                <div className="calcpage-form-grid">
                    <div className="calcpage-input-group">
                        <label>הכנסה שנתית</label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={yearlyIncome}
                            onChange={(e) => setYearlyIncome(e.target.value)}
                            placeholder="הכנס הכנסה שנתית..."
                            required
                        />
                    </div>
                </div>

                <button
                    onClick={handleCalculate}
                    className="calcpage-btn submit"
                    disabled={loading}
                >
                    {loading ? "מחשב..." : "חשב"}
                </button>

                {/* Extra Footer Buttons */}
                <div className="calcpage-form-footer">
                    <button
                        onClick={() => navigate(-1)}
                        className="calcpage-btn home"
                    >
                        🔙 חזור
                    </button>
                    <button
                        onClick={() => {
                            setYearlyIncome("");
                            setResult(null);
                        }}
                        className="calcpage-btn danger"
                    >
                        🧹 נקה טופס
                    </button>
                </div>

                {/* Unauthorized */}
                {authError && (
                    <div className="auth-error">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span>
                            עליך להיות מחובר כדי לבצע חישוב.{" "}
                            <button
                                onClick={() => navigate("/SigninForm")}
                                className="link-btn"
                            >
                                התחבר כאן
                            </button>
                        </span>
                    </div>
                )}

                {/* Results */}
                {result && !authError && (
                    <div className="calcpage-result">
                        <h3>תוצאות החישוב</h3>

                        {/* Summary */}
                        <div className="calcpage-summary-cards">
                            <div className="summary-card blue">
                                <h4>תשלום חודשי</h4>
                                <p>{result.national_insurance.monthly_prepayment.toLocaleString()} ₪</p>
                            </div>
                            <div className="summary-card red">
                                <h4>תשלום שנתי</h4>
                                <p>{result.national_insurance.yearly_total.toLocaleString()} ₪</p>
                            </div>
                            <div className="summary-card green">
                                <h4>נטו אחרי ביטוח לאומי</h4>
                                <p>{result.summary.net_after_ni.toLocaleString()} ₪</p>
                            </div>
                        </div>

                        {/* Expand details */}
                        <button
                            className="expand-btn"
                            onClick={() => setExpanded((prev) => !prev)}
                        >
                            {expanded ? (
                                <>
                                    <ChevronUp className="w-4 h-4" /> הסתר פירוט
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-4 h-4" /> הצג פירוט
                                </>
                            )}
                        </button>

                        {expanded && (
                            <div className="details-box">
                                <h4>פירוט ביטוח לאומי</h4>
                                <ul>
                                    <li>הגדרה: {result.national_insurance.definition}</li>
                                    <li>חלק נמוך: {result.national_insurance.breakdown.low_rate_part} ₪</li>
                                    <li>חלק גבוה: {result.national_insurance.breakdown.high_rate_part} ₪</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </section>


            {/* Description */}
            <section className="calcpage-description">
                <h2>מה זה המחשבון?</h2>
                <p>
                    כלי אינטרנטי פשוט שמחשב עבורך את גובה התשלום לביטוח לאומי כעצמאי.
                    במקום לנסות לחשב ידנית או לנחש – המערכת נותנת לך תוצאה ברורה.
                </p>

                <h2>למי זה מתאים?</h2>
                <ul>
                    <li>עצמאים בתחילת הדרך</li>
                    <li>פרילנסרים בתחומים שונים</li>
                    <li>עוסקים מורשים עם לקוחות קבועים</li>
                </ul>

                <h2>מה תוכלו לגלות?</h2>
                <ul>
                    <li>מה גובה התשלום החודשי לביטוח לאומי</li>
                    <li>מה ההפרש בין מדרגת תשלום נמוכה לגבוהה</li>
                    <li>כמה נשאר נטו אחרי ניכוי ביטוח לאומי</li>
                </ul>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    המחשבון נותן הערכה בלבד ואינו מהווה ייעוץ מס. לפני החלטות כלכליות – התייעצו עם רואה חשבון מוסמך.
                </p>
            </section>
        </div>
    );
}
