'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    LogOut,
    Home,
    Calculator,
    ChevronDown,
    ChevronUp,
    AlertTriangle,
    Lightbulb,
} from "lucide-react";
import "../../styles/Calculators/EmployeeCostNoPension.css";

export default function EmployeeCostNoPension() {
    const router = useRouter();

    const [grossSalary, setGrossSalary] = useState("");
    const [creditPoints, setCreditPoints] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [calculatedGrossSalary, setCalculatedGrossSalary] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        router.push("/SigninForm");
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
                "/api/calculators/employee-cost-no-pension",
                {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
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

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'API calculation failed');
            }

            const data = await res.json();
            console.log("🔍 Backend Response (No Pension):", data);
            setResult(data);
            setCalculatedGrossSalary(parseFloat(grossSalary));
        } catch (err) {
            console.error("❌ Error calculating:", err);
            alert("שגיאה בחישוב. אנא נסה שוב.");
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
                <h1>מחשבון עלות עובד — ללא פנסיה</h1>
                <p className="calcpage-tagline" style={{ fontWeight: 'bold' }}>
                    רוצים לדעת כמה באמת עולה להעסיק עובד לפני הפרשות פנסיוניות? זה הכלי שיעזור לכם.
                </p>
                <div className="calcpage-hero-box">
                    המחשבון מציג את נטו לעובד, חלק המעסיק, והעלות הכוללת — כולל מס הכנסה וביטוח לאומי.
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
                            title="השכר ברוטו צריך להיות פחות מ 50,695"
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
                            title="שווי נקודות הזיכוי הבסיסיות לגבר 2.25, ולאישה 2.75"
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
                                <p>{(calculatedGrossSalary - result.summary.employee_part).toLocaleString()} ₪</p>
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
                                <div className="detail-item single">
                                    <span className="detail-label">מס הכנסה:</span>
                                    <span className="detail-value">{result.income_tax.after_credit} ₪</span>
                                </div>

                                <div className="detail-section">
                                    <h4>ביטוח לאומי</h4>
                                    <div className="detail-item">
                                        <span className="detail-label">סה"כ לעובד:</span>
                                        <span className="detail-value">{result.national_insurance.employee_total} ₪</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">סה"כ מעסיק:</span>
                                        <span className="detail-value">{result.national_insurance.employer_total} ₪</span>
                                    </div>
                                    <div className="detail-item highlight">
                                        <span className="detail-label">סה"כ כולל:</span>
                                        <span className="detail-value">{result.national_insurance.total} ₪</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer Buttons */}
                <div className="calcpage-form-footer">
                    <button onClick={() => router.back()} className="calcpage-btn home">
                        🔙 חזור
                    </button>
                    <button
                        onClick={() => {
                            setGrossSalary("");
                            setCreditPoints("");
                            setResult(null);
                            setCalculatedGrossSalary(0);
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
                    כאשר מחשבים את עלות העובד, חשוב להבין שהשכר הברוטו הוא רק חלק מהעלות הכוללת. המעסיק נדרש לשלם בנוסף גם עבור:
                </p>
                <ul>
                    <li>הפרשות לפנסיה (פנסיה חובה)</li>
                    <li>פיצויי פיטורים</li>
                    <li>דמי ביטוח לאומי מעביד (תשלום למוסד לביטוח לאומי)</li>
                </ul>
                <p>
                    המחשבון נותן תמונה של העלות המיסויית של העסקת עובד חדש, בהתאם לשכר הברוטו שהוזן.
                    החישוב כולל את דמי הביטוח הלאומי למעסיק, מס הכנסה, ואינו כולל רכיבים סוציאליים נוספים כגון דמי הבראה, חופשה שנתית או ימי חג
                </p>

                <h2>לאילו שאלות המחשבון עונה?</h2>
                <ul>
                    <li>כמה מס הכנסה וביטוח לאומי מנוכים משכר העובד?</li>
                    <li>מהו השכר נטו שיקבל העובד בפועל מהשכר הברוטו שהוזן?</li>
                    <li>כמה עולה למעסיק להעסיק את העובד מבחינת מיסוי בלבד (ללא הפרשות סוציאליות)?</li>
                </ul>


                <h2>איך עובדת בדיקת עלות עובד (רק מיסים ללא פנסיה)?</h2>
                <p>
                    המחשבון מקבל את השכר הברוטו החודשי ואת מספר נקודות הזיכוי,
                    ומחשב את חבות המס והביטוח הלאומי. הוא מציג את הנטו לעובד,
                    את חלק המעסיק, ואת העלות הכוללת של ההעסקה.
                </p>

                <div className="notice-box">
                    <p>
                        המחשבון מחשב את עלות העובד למעסיק מבחינה מיסויית בלבד על בסיס השכר הברוטו,
                        החישוב אינו כולל רכיבים נוספים כגון דמי הבראה, חופשה שנתית, ימי חג, ימי מחלה, בונוסים או הוצאות רכב.
                    </p>
                </div>

                <h2> כתב ויתור </h2>
                <p className="disclaimer">
                    בדיקת עלות עובד (רק מיסים ללא פנסיה) נותנת אומדן בלבד ואינה מהווה ייעוץ מס או תחליף לליווי מקצועי.
                    הנתונים מבוססים על מדרגות מס והפרשות עדכניות, אך ייתכנו הבדלים בהתאם לנסיבות האישיות.
                    לקבלת ייעוץ מותאם אישית, מומלץ להתייעץ עם רואה חשבון מוסמך.
                </p>


            </section>
        </div>
    );
}
