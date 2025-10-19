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
//const API_BASE = "http://127.0.0.1:8000";
export default function MicroSelfEmployedSalariedCalculator() {
    const navigate = useNavigate();

    const [yearlyIncome, setYearlyIncome] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [isSalaried, setIsSalaried] = useState(false); // Flag for עצמאי ושכיר

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
            // Choose endpoint based on flag
            const endpoint = isSalaried 
                ? `${API_BASE}/micro-self-employed-salaried/atsmaee-and-sakher`
                : `${API_BASE}/micro-self-employed-salaried`;
            
            const res = await fetch(endpoint, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
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
            console.log("🔍 API Response:", data);
            console.log("📊 Endpoint used:", isSalaried ? "atsmaee-and-sakher" : "atsmaee-only");
            console.log("✅ Flag state (isSalaried):", isSalaried);
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
                <h1>מחשבון ביטוח לאומי עצמאי ושכיר</h1>
                <p className="calcpage-tagline">
                    חשבו את חבות הביטוח הלאומי והבריאות עבור עצמאים זעירים - עצמאי בלבד או עצמאי ושכיר.
                </p>
                <div className="calcpage-hero-box">
                    המחשבון מחשב את תשלומי הביטוח הלאומי והבריאות על ההכנסה החייבת.
                    בחרו בין עצמאי בלבד (תעריפים רגילים) או עצמאי ושכיר (תעריפים מיוחדים).
                </div>
            </section>

            {/* Form */}
            <section className="calcpage-form">
                <h2>🧮 בצעו חישוב</h2>
                
                {/* Flag for endpoint selection */}
                <div className="calcpage-input-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={isSalaried}
                            onChange={(e) => setIsSalaried(e.target.checked)}
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                            האם יש לך גם הכנסה כשכיר? (עצמאי ושכיר)
                        </span>
                    </label>
                    <p style={{ fontSize: '14px', color: '#666', marginTop: '8px', marginRight: '30px', textAlign: 'right' }}>
                        {isSalaried 
                            ? 'החישוב יכלול תעריפים מיוחדים עבור עצמאי ושכיר'
                            : 'החישוב יכלול תעריפים רגילים עבור עצמאי בלבד'
                        }
                    </p>
                </div>

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
                            setIsSalaried(false);
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
                            <div className="summary-card red">
                                <h4>סה״כ שנתי</h4>
                                <p>{fmt(isSalaried ? result.totals.yearly_total : result.totals?.yearly_total)} ₪</p>
                            </div>
                            <div className="summary-card green">
                                <h4>נטו אחרי ניכויים</h4>
                                <p>{fmt(isSalaried ? result.summary.net_after_deductions : result.summary?.net_after_deductions)} ₪</p>
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
                                <h4>פירוט ניכויים</h4>
                                <ul>
                                    <li>ביטוח לאומי: {fmt(isSalaried ? result.totals.national_insurance : result.totals?.national_insurance)} ₪</li>
                                    <li>ביטוח בריאות: {fmt(isSalaried ? result.totals.health_tax : result.totals?.health_tax)} ₪</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Description */}
            <section className="calcpage-description">
                <h2>מה זה מחשבון ביטוח לאומי עצמאי ושכיר?</h2>
                <p>
                    מחשבון ביטוח לאומי עצמאי ושכיר הוא כלי מתמחה לחישוב תשלומי ביטוח לאומי ובריאות עבור עצמאים זעירים.
                    המחשבון מאפשר לכם לבחור בין שני מצבים: עצמאי בלבד או עצמאי ושכיר, ומחשב את התשלומים בהתאם.
                    המחשבון מחשב את התשלומים על בסיס ההכנסה החייבת ומציג את החבות השנתית והנטו שנותר.
                </p>

                <h2>למי מתאים מחשבון זה?</h2>
                <ul>
                    <li>עצמאים זעירים שרוצים לחשב את חבות הביטוח הלאומי והבריאות</li>
                    <li>עצמאים שעובדים גם כשכירים במקביל</li>
                    <li>מי שרוצה להבין את ההבדל בין חבות עצמאי בלבד לבין חבות עצמאי ושכיר</li>
                    <li>עוסקים פטורים או פרילנסרים המעוניינים לתכנן את תשלומי הביטוח הלאומי</li>
                </ul>

                <h2>למה כדאי להשתמש במחשבון?</h2>
                <ul>
                    <li>✔️ חישוב מדויק של תשלומי ביטוח לאומי ובריאות</li>
                    <li>✔️ אפשרות לבחור בין עצמאי בלבד לעצמאי ושכיר</li>
                    <li>✔️ הצגה ברורה של החבות השנתית והנטו שנותר</li>
                    <li>✔️ פירוט מלא של ביטוח לאומי וביטוח בריאות</li>
                </ul>

                <h2>מה תוכלו לגלות במחשבון?</h2>
                <ul>
                    <li>סה"כ שנתי לתשלומי ביטוח לאומי ובריאות</li>
                    <li>נטו שנותר לאחר ניכוי כל החבויות</li>
                    <li>פירוט מלא של ביטוח לאומי וביטוח בריאות</li>
                    <li>ההבדל בין חבות עצמאי בלבד לחבות עצמאי ושכיר</li>
                </ul>

                <h2>איך עובד המחשבון?</h2>
                <p>
                    המחשבון מקבל את ההכנסה השנתית הברוטו שלכם ומחשב את ההכנסה החייבת.
                    בהתאם לבחירה שלכם (עצמאי בלבד או עצמאי ושכיר), המחשבון מחשב את תשלומי הביטוח הלאומי והבריאות
                    ומציג את הסה"כ השנתי והנטו שנותר לאחר הניכויים.
                </p>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    מחשבון ביטוח לאומי עצמאי ושכיר מספק אומדן בלבד ואינו מהווה ייעוץ מס אישי או תחליף לליווי מקצועי.
                    הנתונים מבוססים על מדרגות הביטוח לאומי הקיימות, אך ייתכנו הבדלים בהתאם לנסיבות האישיות.
                    לקבלת ייעוץ מותאם אישית, מומלץ להתייעץ עם רואה חשבון או יועץ מס מוסמך.
                </p>
            </section>
        </div>
    );
}
