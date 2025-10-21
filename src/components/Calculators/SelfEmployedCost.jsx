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
import "../../styles/Calculators/SelfEmployedCost.css";

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
                `${API_BASE}/self-employed/self-employed`,
                {
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
                <h1>מחשבון מקדמות – ביטוח לאומי לעצמאי</h1>
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
                            setYearlyIncome("");
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
                <h2>מחשבון ביטוח לעצמאי</h2>
                
                <h3>מה זה מחשבון מקדמות ביטוח לאומי לעצמאים?</h3>
                <p>
                    מחשבון זה נועד עבור רואי חשבון ויועצי מס, כדי לחשב את גובה המקדמה שעל עצמאי לשלם לביטוח הלאומי, בהתאם להכנסה השנתית הצפויה שלו.
                    המחשבון מסייע בקבלת החלטה מקצועית לגבי גובה המקדמה הרצויה, באופן שמאפשר תכנון נכון ומניעת חובות עתידיים.
                </p>

                <h3>על אילו שאלות המחשבון עונה?</h3>
                <ol>
                    <li>כמה מקדמה חודשית ושנתית עלי לקבוע לביטוח הלאומי בהתאם להכנסה הצפויה?</li>
                    <li>האם המקדמה הנוכחית מספיקה או שיש צורך בעדכון?</li>
                    <li>מהי הגדרת העצמאי לפי חוק הביטוח לאומי (עונה להגדרה / לא עונה להגדרה)?</li>
                </ol>

                <h3>איך זה עובד?</h3>
                <p>
                    המחשבון מבצע חישוב על בסיס ההכנסה השנתית הצפויה, ומציג את גובה המקדמה החודשית והשנתית בהתאם למדרגות הביטוח הלאומי המעודכנות.
                    בנוסף, המחשבון מסייע לכם להחליט מהי ההגדרה הכדאית ביותר לעצמאי, כך שתוכלו לתכנן את תשלומי הביטוח הלאומי בצורה חכמה ומשתלמת.
                </p>

                <div className="self-employed-note">
                    <h4 className="self-employed-note-title">שימו ❤️:</h4>
                    <p className="self-employed-note-text">
                        במקרים של אישה נשואה עם הכנסה נמוכה, ייתכן שהיא לא עונה להגדרת עצמאי, ולכן עשויה להיות פטורה מתשלומי ביטוח לאומי.
                        חשוב לקבוע את ההגדרה האישית שלה בצורה נכונה כך שתקבל את הפטור המגיע לה.
                    </p>
                </div>

                <p className="calcpage-summary">
                    כאן תגלו את החבות החודשית והשנתית לביטוח לאומי, בהתאם להכנסה השנתית שלכם. 
                    פשוט הזינו את ההכנסה השנתית נטו (רווח לאחר ניכוי ההוצאות) ותראו את התוצאה מיד.
                </p>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    מחשבון זה נותן אומדן בלבד ואינו מהווה ייעוץ מס אישי או תחליף לליווי מקצועי.
                    הנתונים מבוססים על מדרגות הביטוח לאומי הקיימות, אך ייתכנו הבדלים בהתאם לנסיבות האישיות.
                    לקבלת ייעוץ מותאם אישית, מומלץ להתייעץ עם רואה חשבון מוסמך.
                </p>
            </section>

        </div>
    );
}
