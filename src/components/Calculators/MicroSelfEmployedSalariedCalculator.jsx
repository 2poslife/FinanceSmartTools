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
import "../../styles/Calculators/MicroSelfEmployedSalariedCalculator.css";

const API_BASE = "https://financesmarttools-backend.onrender.com";

export default function MicroSelfEmployedSalariedCalculator() {
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
                `${API_BASE}/micro-self-employed-salaried?token=${encodeURIComponent(token)}`,
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
                <h1>מחשבון עצמאי זעיר + שכיר</h1>
                <p className="calcpage-tagline">
                    בדקו את החבות שלכם כאשר אתם משלבים עבודה כשכירים עם פעילות כעצמאים.
                </p>
                <div className="calcpage-hero-box">
                    המחשבון מחשב את תשלומי הביטוח הלאומי והבריאות על ההכנסה החייבת (70% מהברוטו),
                    ומוסיף חישוב ייחודי להכנסה מעל סף מינימום במידה ואתם גם שכירים.
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
                            placeholder="לדוגמה: 90000"
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
                                    <li>
                                        הכנסה מעל סף מינימום: {fmt(result.inputs.income_above_minimum)} ₪
                                    </li>
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
                <h2>מה זה מחשבון עצמאי זעיר + שכיר?</h2>
                <p>
                    מחשבון עצמאי זעיר + שכיר הוא כלי מתמחה לחישוב תשלומי ביטוח לאומי ובריאות עבור עצמאים זעירים
                    שיש להם גם הכנסה כשכירים. המחשבון מחשב את התשלומים על בסיס ההכנסה החייבת (70% מהברוטו)
                    ומוסיף חישוב ייחודי להכנסה מעל סף המינימום במידה ואתם גם שכירים.
                </p>

                <h2>למי מתאים מחשבון עצמאי זעיר + שכיר?</h2>
                <ul>
                    <li>עצמאים שעובדים גם כשכירים במקביל</li>
                    <li>מי שרוצה לבדוק חבות משולבת מול המוסד לביטוח לאומי</li>
                    <li>עוסקים פטורים או פרילנסרים עם הכנסה נוספת כשכירים</li>
                    <li>עצמאים המעוניינים להבין את השפעת הכנסה נוספת על חבויותיהם</li>
                </ul>

                <h2>למה כדאי להשתמש במחשבון עצמאי זעיר + שכיר?</h2>
                <ul>
                    <li>✔️ חישוב משולב ומדויק לעצמאי + שכיר</li>
                    <li>✔️ חישוב אוטומטי להכנסה מעל סף מינימום</li>
                    <li>✔️ כלי עזר מתקדם לתכנון תזרים ומיסוי</li>
                    <li>✔️ מאפשר הבנה מלאה של חבויות משולבות</li>
                </ul>

                <h2>מה תוכלו לגלות במחשבון עצמאי זעיר + שכיר?</h2>
                <ul>
                    <li>תשלום חודשי ושנתי לביטוח לאומי ובריאות</li>
                    <li>השפעת הכנסה נוספת כשכיר על חבויות העצמאי</li>
                    <li>נטו שנותר לאחר ניכוי כל החבויות</li>
                    <li>פירוט מלא של חישוב ביטוח לאומי ובריאות</li>
                </ul>

                <h2>איך עובד מחשבון עצמאי זעיר + שכיר?</h2>
                <p>
                    המחשבון מקבל את ההכנסה השנתית הברוטו שלכם ומחשב את ההכנסה החייבת (70% מהברוטו).
                    הוא מוסיף חישוב ייחודי להכנסה מעל סף המינימום במידה ואתם גם שכירים,
                    ומציג את התשלום החודשי, השנתי, והנטו שנותר לאחר הניכויים.
                </p>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    מחשבון עצמאי זעיר + שכיר מספק אומדן בלבד ואינו מהווה ייעוץ מס אישי או תחליף לליווי מקצועי.
                    ייתכנו תנאים נוספים המשפיעים על התוצאה בפועל. מומלץ להתייעץ עם רואה חשבון או יועץ מס מוסמך
                    לקבלת ייעוץ מותאם אישית.
                </p>
            </section>
        </div>
    );
}
