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
import "../styles/MicroSelfEmployedCalculator.css";

const API_BASE = "https://financesmarttools-backend.onrender.com";

export default function MicroSelfEmployedCalculator() {
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

        // ✅ validate input
        if (!yearlyIncome || isNaN(yearlyIncome) || parseFloat(yearlyIncome) <= 0) {
            alert("אנא הזן הכנסה שנתית תקינה");
            return;
        }

        setLoading(true);
        setAuthError(false);
        setExpanded(false);

        try {
            const res = await fetch(
                `${API_BASE}/micro-self-employed?token=${encodeURIComponent(token)}`,
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

    const fmt = (n) =>
        typeof n === "number"
            ? n.toLocaleString("he-IL", { maximumFractionDigits: 2 })
            : n;

    return (
        <div className="calcpage" dir="rtl">


            {/* Intro */}
            <section className="calcpage-intro">
                <h1>מחשבון עצמאי זעיר</h1>
                <p className="calcpage-tagline">
                    כלי מהיר ופשוט לבדיקת תשלומי ביטוח לאומי ובריאות לעצמאי זעיר.
                </p>
                <div className="calcpage-hero-box">
                    המחשבון מחשב באופן מיידי את ההפרשות על בסיס הכנסה חייבת (לפי 70% מהברוטו),
                    ומציג לכם כמה תשלמו בחודש ובשנה — ומה נשאר נטו לאחר הניכויים.
                </div>
            </section>

            {/* Form */}
            <section className="calcpage-form">
                <h2>🧮 בצעו חישוב</h2>
                <div className="calcpage-form-grid">
                    <div className="calcpage-input-group">
                        <label>הכנסה שנתית (ברוטו)</label>
                        <input
                            type="number"
                            min="0"
                            value={yearlyIncome}
                            onChange={(e) => setYearlyIncome(e.target.value)}
                            placeholder="לדוגמה: 120000"
                            required
                        />
                    </div>
                </div>

                <button
                    onClick={handleCalculate}
                    className="calcpage-btn submit"
                    disabled={loading || !yearlyIncome}
                >
                    {loading ? "מחשב..." : "חשב"}
                </button>

                {/* Footer buttons */}
                <div className="calcpage-form-footer">
                    <button onClick={() => navigate(-1)} className="calcpage-btn home">
                        🔙 חזור
                    </button>
                    <button
                        onClick={() => {
                            setYearlyIncome("");
                            setResult(null);
                            setExpanded(false);
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
                            <button onClick={() => navigate("/SigninForm")} className="link-btn">
                                התחבר כאן
                            </button>
                        </span>
                    </div>
                )}

                {/* Results */}
                {result && !authError && (
                    <div className="calcpage-result">
                        <h3>תוצאות החישוב</h3>

                        {/* Summary cards */}
                        <div className="calcpage-summary-cards">
                            <div className="summary-card blue">
                                <h4>סה״כ חודשי</h4>
                                <p>{fmt(result.summary.monthly_prepayment)} ₪</p>
                            </div>
                            <div className="summary-card red">
                                <h4>סה״כ שנתי</h4>
                                <p>{fmt(result.summary.yearly_total)} ₪</p>
                            </div>
                            <div className="summary-card green">
                                <h4>נטו אחרי ניכויים</h4>
                                <p>{fmt(result.summary.net_after_deductions)} ₪</p>
                            </div>
                        </div>

                        {/* Expand details */}
                        <button
                            className="expand-btn"
                            onClick={() => setExpanded((p) => !p)}
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
                                <h4>קלט</h4>
                                <ul>
                                    <li>הכנסה שנתית: {fmt(result.inputs.yearly_income)} ₪</li>
                                    <li>הכנסה חייבת (70%): {fmt(result.inputs.taxable_income)} ₪</li>
                                </ul>

                                <h4>פירוט ניכויים</h4>
                                <ul>
                                    <li>ביטוח לאומי: {fmt(result.breakdown.national_insurance)} ₪</li>
                                    <li>ביטוח בריאות: {fmt(result.breakdown.health_insurance)} ₪</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Description */}
            <section className="calcpage-description">
                <h2>מה זה מחשבון עצמאי זעיר?</h2>
                <p>
                    מחשבון עצמאי זעיר הוא כלי מתמחה לחישוב תשלומי ביטוח לאומי ובריאות עבור עצמאים זעירים.
                    המחשבון מחשב את התשלומים על בסיס ההכנסה החייבת (70% מהברוטו) ומציג תשלום חודשי,
                    תשלום שנתי, ונטו לאחר הניכויים. זהו כלי חיוני לכל עצמאי זעיר המעוניין להבין את חבויותיו.
                </p>

                <h2>למי מתאים מחשבון עצמאי זעיר?</h2>
                <ul>
                    <li>עוסקים פטורים בתחילת הדרך</li>
                    <li>פרילנסרים עם הכנסה נמוכה עד בינונית</li>
                    <li>עצמאים זעירים המעוניינים לתכנן את תשלומיהם</li>
                    <li>יועצים המסייעים לעצמאים זעירים</li>
                </ul>

                <h2>למה כדאי להשתמש במחשבון עצמאי זעיר?</h2>
                <ul>
                    <li>✔️ חישוב מהיר ומדויק של תשלומי ביטוח לאומי ובריאות</li>
                    <li>✔️ תצוגה ברורה של תשלום חודשי ושנתי</li>
                    <li>✔️ עוזר בתכנון תזרים מזומנים</li>
                    <li>✔️ מאפשר הבנה מלאה של חבויות העצמאי הזעיר</li>
                </ul>

                <h2>איך עובד מחשבון עצמאי זעיר?</h2>
                <p>
                    המחשבון מקבל את ההכנסה השנתית הברוטו שלכם ומחשב את ההכנסה החייבת (70% מהברוטו).
                    על בסיס זה הוא מחשב את תשלומי הביטוח הלאומי והבריאות, ומציג לכם את התשלום החודשי,
                    השנתי, והנטו שנותר לאחר הניכויים.
                </p>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    מחשבון עצמאי זעיר מספק אומדן בלבד ואינו מהווה ייעוץ מס או תחליף לליווי מקצועי.
                    שיעורי הביטוח הלאומי והבריאות משתנים לפי חוק, והחישוב אינו כולל כל התנאים האישיים.
                    מומלץ להתייעץ עם רואה חשבון או יועץ מס מוסמך לקבלת ייעוץ מותאם אישית.
                </p>
            </section>
        </div>
    );
}
