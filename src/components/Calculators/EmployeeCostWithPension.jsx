import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LogOut,
    Home,
    Calculator,
    ChevronDown,
    ChevronUp,
    AlertTriangle,
    Lightbulb,
} from "lucide-react";
import "../../styles/Calculators/EmployeeCostWithPension.css";

const API_BASE = "https://financesmarttools-backend.onrender.com";

export default function EmployeeCostWithPension() {
    const navigate = useNavigate();

    const [grossSalary, setGrossSalary] = useState("");
    const [creditPoints, setCreditPoints] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [calculatedGrossSalary, setCalculatedGrossSalary] = useState(0);

    // Log SVG dimensions
    React.useEffect(() => {
        const guideImg = document.querySelector('.guide-icon');
        if (guideImg) {
            const logDimensions = () => {
                console.log('📏 Guide_1.svg Dimensions:');
                console.log('  - Width:', guideImg.offsetWidth + 'px');
                console.log('  - Height:', guideImg.offsetHeight + 'px');
                console.log('  - Computed Width:', window.getComputedStyle(guideImg).width);
                console.log('  - Computed Height:', window.getComputedStyle(guideImg).height);
            };
            
            // Log immediately
            logDimensions();
            
            // Log after image loads
            guideImg.addEventListener('load', logDimensions);
            
            // Log after a short delay to ensure rendering is complete
            setTimeout(logDimensions, 100);
            
            return () => guideImg.removeEventListener('load', logDimensions);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/SigninForm");
    };

    const handleCalculate = async () => {
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

        // This calculator is FREE - no authentication required
        try {
            const res = await fetch(
                `${API_BASE}/employee-cost-with-pension/with-pension`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        gross_salary: parseFloat(grossSalary),
                        credit_points: parseFloat(creditPoints),
                    }),
                }
            );

            if (!res.ok) {
                throw new Error('API calculation failed');
            }

            const data = await res.json();
            console.log("🔍 Backend Response:", data);
            setResult(data);
            setCalculatedGrossSalary(parseFloat(grossSalary));
        } catch (err) {
            console.error("❌ Error calculating:", err);
            alert("שגיאה בחישוב. אנא נסה שוב.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="calcpage" dir="rtl">

            {/* Introduction */}
            <section className="calcpage-intro">
                <h1>מחשבון עלות עובד כולל הפרשות פנסיוניות</h1>
                <p className="calcpage-tagline" style={{ fontWeight: 'bold' }}>
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
                            title="שווי נקודות הזיכוי הבסיסיות לגבר 2.25, ולאישה 2.75"
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


                {/* Results */}
                {result && (
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

                                <div className="detail-section">
                                    <h4>פנסיה</h4>
                                    <div className="detail-item">
                                        <span className="detail-label">הפקדת עובד:</span>
                                        <span className="detail-value">{result.pension.employee} ₪</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">הפקדת מעסיק:</span>
                                        <span className="detail-value">{result.pension.employer} ₪</span>
                                    </div>
                                    <div className="detail-item highlight">
                                        <span className="detail-label">סה"כ פנסיה:</span>
                                        <span className="detail-value">{result.pension.total} ₪</span>
                                    </div>
                                </div>
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
                            setCalculatedGrossSalary(0);
                        }}
                        className="calcpage-btn danger"
                    >
                        🧹 נקה טופס
                    </button>
                </div>

            </section>

            {/* Course Connection */}
            <section className="calcpage-course-connection">
                <div className="guide-icon-wrapper">
                    <img src="/Guide_1.svg" alt="Guide" className="guide-icon" />
                </div>
            </section>

            {/* Description Section */}
            <section className="calcpage-description">
                <h2>מה זה מחשבון עלות עובד כולל פנסיה?</h2>
                <p>
                    כאשר מחשבים את עלות העובד, חשוב להבין שהשכר הברוטו הוא רק חלק מהעלות הכוללת.
                    המעסיק נדרש לשלם בנוסף גם עבור:
                </p>
                <ul>
                    <li>הפרשות לפנסיה (פנסיה חובה)</li>
                    <li>פיצויי פיטורים </li>
                    <li>דמי ביטוח לאומי מעביד (תשלום למוסד לביטוח לאומי)</li>
                </ul>
                <p>
                    המחשבון נותן תמונה של העלות הכוללת של העסקת עובד חדש, בהתאם לשכר הברוטו שהוזן.
                    החישוב כולל את ההפרשות לפנסיה, פיצויי פיטורים ודמי ביטוח לאומי למעסיק, ואינו כולל רכיבים סוציאליים נוספים כגון דמי הבראה, חופשה שנתית או ימי חג.
                </p>

                <h2>לאילו שאלות המחשבון עונה?</h2>
                <ul>
                    <li>מהי העלות המלאה של העסקת עובד חדש כולל פנסיה והפרשות חובה?</li>
                    <li>מהו השכר נטו שיקבל העובד בפועל מהשכר הברוטו שהוזן?</li>
                    <li>כמה עולה למעסיק להעסיק את העובד מבחינת מיסוי + הפרשות חובה לפנסיה? (ללא הפרשות סוציאליות)?</li>
                </ul>

                <h2>איך עובד מחשבון עלות עובד כולל פנסיה?</h2>
                <p>
                    המחשבון מקבל את השכר הברוטו החודשי ואת מספר נקודות הזיכוי,
                    ומחשב את חבות המס, הביטוח הלאומי והפרשות הפנסיה. הוא מציג את הנטו לעובד,
                    את חלק המעסיק, ואת העלות הכוללת של ההעסקה, כולל גם ההפרשות הפנסיוניות.
                </p>

                <div className="notice-box">
                    <p>
                        המחשבון מחשב את עלות העובד למעסיק כולל פנסיה ופיצויי פיטורים על בסיס השכר הברוטו.
                        החישוב אינו כולל רכיבים נוספים כגון דמי הבראה, חופשה שנתית, ימי חג, ימי מחלה, בונוסים או הוצאות רכב.
                    </p>
                </div>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    מחשבון עלות עובד כולל פנסיה נותן אומדן בלבד ואינו מהווה ייעוץ מס או תחליף לליווי מקצועי.
                    הנתונים מבוססים על מדרגות מס והפרשות עדכניות, אך ייתכנו הבדלים בהתאם לנסיבות האישיות.
                    לקבלת ייעוץ מותאם אישית, מומלץ להתייעץ עם רואה חשבון מוסמך.
                </p>

                <div className="cta-box">
                     רוצים לגלות עוד? 🚀<br />
                    נסו גם את שאר המחשבונים שלנו לקבלת תמונה חשבונאית, פיננסית מלאה.
                </div>
            </section>
        </div>
    );
}
