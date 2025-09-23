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
import "../styles/EmployeeCostWithPension.css";

const API_BASE = "http://127.0.0.1:8000";

export default function EmployeeCostWithPension() {
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
            alert("אנא הזן שכר ברוטו ונקודות זיכוי תקינות");
            return;
        }

        setLoading(true);
        setAuthError(false);

        try {
            const res = await fetch(
                `${API_BASE}/employee-cost-with-pension/with-pension?token=${encodeURIComponent(token)}`,
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

    return (
        <div className="calcpage" dir="rtl">
            {/* Header */}
            <header className="calcpage-header">
                <div className="calcpage-logo" onClick={() => navigate("/")}>
                    <Calculator className="calcpage-logo-icon" />
                    <span className="calcpage-logo-text">FinanceSmartTools</span>
                </div>
                <div className="calcpage-actions">
                    <button onClick={() => navigate("/")} className="calcpage-btn home">
                        <Home className="w-5 h-5" /> דף הבית
                    </button>
                    <button onClick={handleLogout} className="calcpage-btn danger">
                        <LogOut className="w-5 h-5" /> התנתק
                    </button>
                </div>
            </header>

            {/* Introduction */}
            <section className="calcpage-intro">
                <h1>מחשבון עלות עובד כולל פנסיה</h1>
                <p className="calcpage-tagline">
                    רוצים לדעת כמה באמת עולה לכם להעסיק עובד? זה המחשבון בשבילכם.
                </p>
                <div className="calcpage-hero-box">
                    המחשבון הזה מחשב את כלל העלויות – מס הכנסה, ביטוח לאומי והפרשות פנסיוניות.
                    כך תוכלו לקבל תמונה מלאה של עלות העובד מול הנטו שהוא מקבל.
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
                    disabled={
                        loading ||
                        !grossSalary ||
                        isNaN(grossSalary) ||
                        parseFloat(grossSalary) <= 0 ||
                        !creditPoints ||
                        isNaN(creditPoints) ||
                        parseFloat(creditPoints) < 0
                    }
                >
                    {loading ? "מחשב..." : "חשב"}
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
                                    <li>זיכוי הפקדת עובד לפנסיה: {result.income_tax.pension_employee_tax_credit} ₪</li>
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

                                <h4>פנסיה</h4>
                                <ul>
                                    <li>הפקדת עובד: {result.pension.employee} ₪</li>
                                    <li>הפקדת מעסיק: {result.pension.employer} ₪</li>
                                    <li>סה"כ פנסיה: {result.pension.total} ₪</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                {/* Footer Buttons */}
                <div className="calcpage-form-footer">
                    <button
                        onClick={() => navigate(-1)}
                        className="calcpage-btn home"
                    >
                        🔙 חזור
                    </button>
                    <button
                        onClick={() => {
                            setGrossSalary("");
                            setCreditPoints("");
                            setResult(null);
                        }}
                        className="calcpage-btn danger"
                    >
                        🧹 נקה טופס
                    </button>
                </div>

            </section>

            {/* Description Section */}
            <section className="calcpage-description">
                <h2>מה זה בעצם המחשבון?</h2>
                <p>
                    המחשבון נועד להציג את העלות המלאה של העסקת עובד, כולל כל החלקים הנלווים –
                    מס הכנסה, ביטוח לאומי והפרשות לפנסיה. כך תוכלו להבין לא רק כמה נטו יקבל העובד,
                    אלא גם כמה כסף המעסיק מוציא בפועל על כל עובד.
                </p>

                <h2>למי זה מתאים?</h2>
                <ul>
                    <li>מעסיקים שרוצים לדעת את העלות הכוללת של העסקת עובדים</li>
                    <li>מנהלי כספים שמכינים תקציב או חישובי שכר</li>
                    <li>עובדים שמעוניינים להבין את ההבדל בין עלות המעסיק לשכר הנטו</li>
                    <li>יזמים וחברות סטארטאפ בתחילת הדרך</li>
                </ul>

                <h2>למה כדאי להשתמש?</h2>
                <ul>
                    <li>✔️ מספק תמונה מלאה של עלות ההעסקה</li>
                    <li>✔️ כולל חישוב פנסיה עדכני לפי החוק</li>
                    <li>✔️ מראה בצורה ברורה את ההבדל בין ברוטו, נטו ועלות מעסיק</li>
                    <li>✔️ עוזר בתכנון תקציבי ובניהול משאבי אנוש</li>
                </ul>

                <h2>מה תוכלו לגלות?</h2>
                <ul>
                    <li>כמה יקבל העובד נטו לאחר מס והפרשות</li>
                    <li>מה חלקו של המעסיק בביטוח לאומי ובפנסיה</li>
                    <li>כמה כסף מועבר לפנסיה ולחיסכון ארוך טווח</li>
                    <li>מהי העלות הכוללת של העובד עבור העסק</li>
                </ul>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    המחשבון נותן אומדן בלבד ואינו מהווה ייעוץ מס או תחליף לליווי מקצועי.
                    הנתונים מבוססים על מדרגות מס והפרשות עדכניות, אך ייתכנו הבדלים בהתאם לנסיבות האישיות.
                    לקבלת ייעוץ מותאם – פנו לרואה חשבון מוסמך.
                </p>
            </section>
        </div>
    );
}
