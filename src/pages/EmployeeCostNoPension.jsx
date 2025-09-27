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
import "../styles/EmployeeCostNoPension.css";

const API_BASE = "https://financesmarttools-backend.onrender.com";

export default function EmployeeCostNoPension() {
    const navigate = useNavigate();

    const [grossSalary, setGrossSalary] = useState("");
    const [creditPoints, setCreditPoints] = useState("");
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

        // validate inputs
        if (
            !grossSalary ||
            isNaN(grossSalary) ||
            parseFloat(grossSalary) <= 0 ||
            !creditPoints ||
            isNaN(creditPoints) ||
            parseFloat(creditPoints) < 0
        ) {
            alert("אנא הזן שכר ברוטו תקין ונקודות זיכוי תקינות");
            return;
        }

        setLoading(true);
        setAuthError(false);

        try {
            const res = await fetch(
                `${API_BASE}/employee-cost/no-pension?token=${encodeURIComponent(token)}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        gross_salary: parseFloat(grossSalary),
                        credit_points: parseFloat(creditPoints),
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

    const isValid =
        grossSalary &&
        !isNaN(grossSalary) &&
        parseFloat(grossSalary) > 0 &&
        creditPoints &&
        !isNaN(creditPoints) &&
        parseFloat(creditPoints) >= 0;

    return (
        <div className="calcpage" dir="rtl">


            {/* Introduction */}
            <section className="calcpage-intro">
                <h1>מחשבון מס הכנסה לעצמאי</h1>
                <p className="calcpage-tagline">
                    רוצים להבין כמה מס אתם באמת צריכים לשלם? זה הכלי שיעזור לכם.
                </p>
                <div className="calcpage-hero-box">
                    המחשבון מיועד לעצמאים שרוצים תמונה ברורה של חבות המס והביטוח הלאומי.
                    תוך שניות תקבלו הערכה מדויקת שתקל עליכם בתכנון הכלכלי.
                </div>
            </section>

            {/* Calculation Form */}
            <section className="calcpage-form">
                <h2>🧮 בצעו חישוב</h2>
                <div className="calcpage-form-grid">
                    <div className="calcpage-input-group">
                        <label>שכר ברוטו חודשי</label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={grossSalary}
                            onChange={(e) => setGrossSalary(e.target.value)}
                            placeholder="הכנס שכר ברוטו..."
                            required
                        />
                    </div>
                    <div className="calcpage-input-group">
                        <label>נקודות זיכוי</label>
                        <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={creditPoints}
                            onChange={(e) => setCreditPoints(e.target.value)}
                            placeholder="מספר נקודות זיכוי..."
                            required
                        />
                    </div>
                </div>
                <button
                    onClick={handleCalculate}
                    className="calcpage-btn submit"
                    disabled={loading || !isValid}
                >
                    {loading ? "מחשב..." : "חשב"}
                </button>
                <button onClick={() => navigate(-1)} className="calcpage-btn">
                    🔙 חזור
                </button>
                <button onClick={() => { setGrossSalary(""); setCreditPoints(""); setResult(null); }}
                    className="calcpage-btn danger">
                    🧹 נקה טופס
                </button>

                {/* Unauthorized Message */}
                {authError && (
                    <div className="auth-error">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span>
                            עליך להיות מחובר כמשתמש מורשה כדי לבצע חישוב.{" "}
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
                        {/* Summary cards */}
                        <div className="calcpage-summary-cards">
                            <div className="summary-card blue">
                                <h4>נטו לעובד</h4>
                                <p>{result.summary.employee_part.toLocaleString()} ₪</p>
                            </div>
                            <div className="summary-card red">
                                <h4>חלק המעסיק</h4>
                                <p>{result.summary.employer_part.toLocaleString()} ₪</p>
                            </div>
                            <div className="summary-card green">
                                <h4>עלות כוללת</h4>
                                <p>{result.summary.total_cost.toLocaleString()} ₪</p>
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
                                <h4>מס הכנסה</h4>
                                <ul>
                                    <li>לפני זיכוי: {result.income_tax.before_credit} ₪</li>
                                    <li>ערך נקודות זיכוי: {result.income_tax.credit_points_value} ₪</li>
                                    <li>אחרי זיכוי: {result.income_tax.after_credit} ₪</li>
                                </ul>

                                <h4>ביטוח לאומי</h4>
                                <ul>
                                    <li>עובד – חלק נמוך: {result.national_insurance.employee_low} ₪</li>
                                    <li>עובד – חלק גבוה: {result.national_insurance.employee_high} ₪</li>
                                    <li>סה"כ עובד: {result.national_insurance.employee_total} ₪</li>
                                    <li>מעסיק – חלק נמוך: {result.national_insurance.employer_low} ₪</li>
                                    <li>מעסיק – חלק גבוה: {result.national_insurance.employer_high} ₪</li>
                                    <li>סה"כ מעסיק: {result.national_insurance.employer_total} ₪</li>
                                    <li>סה"כ כולל: {result.national_insurance.total} ₪</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Description Section */}
            <section className="calcpage-description">
                <h2>מה זה בעצם המחשבון?</h2>
                <p>
                    זהו כלי אינטרנטי פשוט שמחשב עבורך את גובה המס והביטוח הלאומי כעצמאי.
                    במקום לנסות לחשב ידנית או לנחש – המחשבון נותן תוצאה מיידית וברורה.
                </p>

                <h2>למי זה מתאים?</h2>
                <ul>
                    <li>עצמאים בתחילת הדרך</li>
                    <li>פרילנסרים בתחומים שונים</li>
                    <li>עוסקים מורשים עם לקוחות קבועים</li>
                    <li>שכירים עם הכנסה צדדית כעצמאי</li>
                </ul>

                <h2>למה כדאי להשתמש?</h2>
                <ul>
                    <li>✔️ חינמי וזמין בכל זמן</li>
                    <li>✔️ מעודכן לפי מדרגות המס האחרונות</li>
                    <li>✔️ תוצאות ברורות וקלות להבנה</li>
                    <li>✔️ מאפשר תכנון מס חכם מראש</li>
                </ul>

                <h2>מה תוכלו לגלות?</h2>
                <ul>
                    <li>כמה מס תשלמו בכל חודש ובסוף השנה</li>
                    <li>האם כדאי להפקיד לקרן השתלמות או חיסכון נוסף</li>
                    <li>מתי משתלם לעבור מעוסק פטור לעוסק מורשה</li>
                    <li>איך לתכנן נכון את סוף השנה כדי לא לשלם יותר מדי</li>
                </ul>

                <h2>איך משתמשים במחשבון?</h2>
                <p>
                    פשוט הזינו את ההכנסה השנתית שלכם, את מספר נקודות הזיכוי
                    והמערכת תחשב אוטומטית את התשלום לביטוח לאומי ואת מס ההכנסה.
                </p>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    המחשבון נותן הערכה בלבד ואינו מהווה ייעוץ מס או תחליף לליווי מקצועי.
                    לפני קבלת החלטות כלכליות – מומלץ להתייעץ עם רואה חשבון מוסמך.
                </p>

                <div className="cta-box">
                    🚀 רוצים לגלות עוד? <br />
                    נסו גם את שאר המחשבונים שלנו לקבלת תמונה כלכלית מלאה.
                </div>
            </section>
        </div>
    );
}
