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

                {/* Footer Buttons */}
                <div className="calcpage-form-footer">
                    <button onClick={() => navigate(-1)} className="calcpage-btn home">
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
                <h2>מה זה בדיקת עלות עובד (רק מיסים ללא פנסיה)?</h2>
                <p>
                    בדיקת עלות עובד (רק מיסים ללא פנסיה) הוא כלי מתמחה לחישוב העלות הכוללת של העסקת עובד,
                    תוך התמקדות במיסים בלבד ללא הפרשות פנסיוניות. המחשבון מחשב את חלק העובד, חלק המעסיק,
                    והעלות הכוללת של העובד, כולל מס הכנסה וביטוח לאומי.
                </p>

                <h2>למי מתאימה בדיקת עלות עובד (רק מיסים ללא פנסיה)?</h2>
                <ul>
                    <li>מעסיקים המעוניינים להבין את עלות ההעסקה הבסיסית</li>
                    <li>מנהלי כספים המכינים תקציבי שכר</li>
                    <li>עובדים המעוניינים להבין את ההבדל בין עלות המעסיק לשכר הנטו</li>
                    <li>חברות סטארטאפ בתחילת הדרך</li>
                </ul>

                <h2>למה כדאי להשתמש בבדיקת עלות עובד (רק מיסים ללא פנסיה)?</h2>
                <ul>
                    <li>✔️ מספק תמונה ברורה של עלות ההעסקה הבסיסית</li>
                    <li>✔️ מציג את ההבדל בין שכר ברוטו, נטו ועלות מעסיק</li>
                    <li>✔️ עוזר בתכנון תקציבי ובניהול משאבי אנוש</li>
                    <li>✔️ מאפשר הבנה מלאה של חבויות המעסיק</li>
                </ul>

                <h2>מה תוכלו לגלות בבדיקת עלות עובד (רק מיסים ללא פנסיה)?</h2>
                <ul>
                    <li>כמה יקבל העובד נטו לאחר מס והפרשות</li>
                    <li>מה חלקו של המעסיק בביטוח לאומי</li>
                    <li>מהי העלות הכוללת של העובד עבור העסק</li>
                    <li>פירוט מלא של מס הכנסה וביטוח לאומי</li>
                </ul>

                <h2>איך עובדת בדיקת עלות עובד (רק מיסים ללא פנסיה)?</h2>
                <p>
                    המחשבון מקבל את השכר הברוטו החודשי ואת מספר נקודות הזיכוי,
                    ומחשב את חבות המס והביטוח הלאומי. הוא מציג את הנטו לעובד,
                    את חלק המעסיק, ואת העלות הכוללת של ההעסקה.
                </p>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    בדיקת עלות עובד (רק מיסים ללא פנסיה) נותנת אומדן בלבד ואינה מהווה ייעוץ מס או תחליף לליווי מקצועי.
                    הנתונים מבוססים על מדרגות מס והפרשות עדכניות, אך ייתכנו הבדלים בהתאם לנסיבות האישיות.
                    לקבלת ייעוץ מותאם אישית, מומלץ להתייעץ עם רואה חשבון מוסמך.
                </p>

                <div className="cta-box">
                    🚀 רוצים לגלות עוד? <br />
                    נסו גם את שאר המחשבונים שלנו לקבלת תמונה כלכלית מלאה.
                </div>
            </section>
        </div>
    );
}
