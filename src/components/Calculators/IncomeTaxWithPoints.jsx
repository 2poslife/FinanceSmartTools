import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronDown,
    ChevronUp,
    AlertTriangle,
} from "lucide-react";
import "./IncomeTaxWithPoints.css";

const API_BASE = "https://financesmarttools-backend.onrender.com";

export default function IncomeTaxWithPoints() {
    const navigate = useNavigate();

    const [grossSalary, setGrossSalary] = useState("");
    const [creditPoints, setCreditPoints] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [authError, setAuthError] = useState(false);

    const handleCalculate = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setAuthError(true);
            return;
        }

        if (
            !grossSalary || isNaN(grossSalary) || parseFloat(grossSalary) <= 0 ||
            !creditPoints || isNaN(creditPoints) || parseFloat(creditPoints) < 0
        ) {
            alert("אנא הזן שכר ברוטו ונקודות זיכוי תקינות");
            return;
        }

        setLoading(true);
        setAuthError(false);

        try {
            const res = await fetch(
                `${API_BASE}/cost/income-tax-with-points?token=${encodeURIComponent(token)}`,
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

    const formatNumber = (num) => {
        return Number(num).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <div className="calcpage" dir="rtl">
            {/* Intro */}
            <section className="calcpage-intro">
                <h1>מחשבון מס הכנסה עם נקודות זיכוי</h1>
                <p className="calcpage-tagline">
                    מחשבון זה מציג את חבות מס ההכנסה החודשית והשנתית,
                    כולל התחשבות בנקודות זיכוי אישיות.
                </p>
                <div className="calcpage-hero-box">
                    הזן שכר ברוטו ונקודות זיכוי,
                    ותקבל את חבות המס לפני ואחרי נקודות זיכוי.
                </div>
            </section>

            {/* Form */}
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
                            step="0.25"
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
                        !grossSalary || isNaN(grossSalary) || parseFloat(grossSalary) <= 0 ||
                        !creditPoints || isNaN(creditPoints) || parseFloat(creditPoints) < 0
                    }
                >
                    {loading ? "מחשב..." : "חשב"}
                </button>

                {authError && (
                    <div className="auth-error">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span>
                            עליך להיות מחובר כמשתמש מורשה כדי לבצע חישוב.{" "}
                            <button onClick={() => navigate("/SigninForm")} className="link-btn">
                                התחבר כאן
                            </button>
                        </span>
                    </div>
                )}

                {/* Results */}
                {result?.income_tax && !authError && (
                    <div className="calcpage-result">
                        <h3>תוצאות החישוב</h3>

                        <div className="calcpage-summary-cards">
                            <div className="summary-card blue">
                                <h4>לפני זיכוי</h4>
                                <p>{formatNumber(result.income_tax.before_credit)} ₪</p>
                            </div>
                            <div className="summary-card orange">
                                <h4>שווי נקודות זיכוי</h4>
                                <p>{formatNumber(result.income_tax.credit_points_value)} ₪</p>
                            </div>
                            <div className="summary-card green">
                                <h4>אחרי זיכוי</h4>
                                <p>{formatNumber(result.income_tax.after_credit)} ₪</p>
                            </div>
                            <div className="summary-card red">
                                <h4>מס שנתי</h4>
                                <p>{formatNumber(result.income_tax.yearly_total)} ₪</p>
                            </div>
                        </div>

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
                                <h4>מדרגות מס</h4>
                                <ul>
                                    {result.brackets.map((b, i) => (
                                        <li key={i}>
                                            טווח {b.range} ({(b.rate * 100).toFixed(0)}%):{" "}
                                            חייב {formatNumber(b.taxable)} ₪ → {formatNumber(b.amount)} ₪
                                        </li>
                                    ))}
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

            {/* Description */}
            <section className="calcpage-description">
                <h2>מה זה מחשבון מס הכנסה עם נקודות זיכוי?</h2>
                <p>
                    מחשבון מס הכנסה עם נקודות זיכוי הוא כלי מתקדם המחשב את חבות המס החודשית והשנתית שלכם,
                    תוך התחשבות מלאה בנקודות הזיכוי האישיות שלכם. המחשבון מציג את המס לפני ואחרי נקודות הזיכוי,
                    ומאפשר לכם לראות בדיוק כמה כסף אתם חוסכים בזכות הנקודות שלכם.
                </p>

                <h2>למי מתאים מחשבון מס הכנסה עם נקודות זיכוי?</h2>
                <ul>
                    <li>שכירים עם נקודות זיכוי אישיות (ילדים, נכות, זקנה)</li>
                    <li>עצמאים עם נקודות זיכוי רלוונטיות</li>
                    <li>יועצי מס ורואי חשבון המבקשים לחשב מס ללקוחות</li>
                    <li>עובדים המעוניינים להבין את השפעת נקודות הזיכוי על המס</li>
                </ul>

                <h2>למה כדאי להשתמש במחשבון מס הכנסה עם נקודות זיכוי?</h2>
                <ul>
                    <li>✔️ חישוב מדויק של מס הכנסה עם נקודות זיכוי</li>
                    <li>✔️ הצגה ברורה של המס לפני ואחרי נקודות זיכוי</li>
                    <li>✔️ פירוט מלא של מדרגות המס והחישוב</li>
                    <li>✔️ עוזר בתכנון מס ובהבנת החיסכון מנקודות זיכוי</li>
                </ul>

                <h2>איך עובד מחשבון מס הכנסה עם נקודות זיכוי?</h2>
                <p>
                    המחשבון מקבל את השכר הברוטו החודשי ואת מספר נקודות הזיכוי שלכם,
                    ומחשב את חבות המס בהתאם למדרגות המס המעודכנות. הוא מציג את המס לפני נקודות הזיכוי,
                    את שווי נקודות הזיכוי, ואת המס הסופי אחרי נקודות הזיכוי.
                </p>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    מחשבון מס הכנסה עם נקודות זיכוי נותן אומדן בלבד ואינו מהווה ייעוץ מס או תחליף לליווי מקצועי.
                    הנתונים מבוססים על מדרגות המס הקיימות, אך ייתכנו הבדלים בהתאם לנסיבות האישיות.
                    לקבלת ייעוץ מותאם אישית, מומלץ להתייעץ עם רואה חשבון מוסמך.
                </p>
            </section>
        </div>
    );
}
