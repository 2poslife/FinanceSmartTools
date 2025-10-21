import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AlertTriangle,
} from "lucide-react";
import "../../styles/Calculators/IncomeTaxWithPoints.css";

const API_BASE = "https://financesmarttools-backend.onrender.com";

export default function IncomeTaxWithPoints() {
    const navigate = useNavigate();

    const [grossSalary, setGrossSalary] = useState("");
    const [creditPoints, setCreditPoints] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
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
                `${API_BASE}/cost/income-tax-with-points`,
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
                <h1>מחשבון מס הכנסה ע״פ נקודות הזיכוי</h1>
                <p className="calcpage-tagline">
                מחשבון זה מחשב את המס לניכוי מההכנסה ברוטו על פי מספר נקודות זיכוי ומציג את חבות המס החודשית והשנתית. 

                </p>
                <div className="calcpage-hero-box">
                הזן הכנסה ברוטו ומספר נקודות זיכוי, ותקבל את חבות המס
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
                            title="שווי נקודות הזיכוי הבסיסיות לגבר 2.25, ולאישה 2.75"
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
                            <div className="summary-card green">
                                <h4>מס חודשי</h4>
                                <p>{formatNumber(result.income_tax.after_credit)} ₪</p>
                            </div>
                            <div className="summary-card red">
                                <h4>מס שנתי</h4>
                                <p>{formatNumber(result.income_tax.yearly_total)} ₪</p>
                            </div>
                        </div>

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
                <h2>מה זה מחשבון מס הכנסה ע"פ נקודות זיכוי?</h2>
                <p>
                    מחשבון מס הכנסה ע"פ נקודות זיכוי הוא כלי מתקדם המחשב את חבות המס החודשית והשנתית שלכם, הוא נועד לספק הערכה מדויקת של גובה המס הצפוי לשלם במהלך השנה, בהתאם להכנסה הצפויה ולמספר נקודות הזיכוי האישיות של המשתמש.
                </p>

                <h2>למי מתאים המחשבון?</h2>
                <p>
                    המחשבון מתאים לרואי חשבון, יועצי מס, עצמאים ושכירים שמעוניינים להבין מראש את חבות המס שלהם ולתכנן נכון את תשלומי המס במהלך השנה.
                    המחשבון מותאם במיוחד לרואי חשבון ויועצי מס, ומסייע להם בקבלת החלטות מקצועיות ותכנון מס מדויק עבור לקוחותיהם.
                </p>

                <h2>המחשבון עונה על שאלות כמו:</h2>
                <ul>
                    <li>כמה מס הכנסה ישלם עצמאי או שכיר לפי ההכנסה הצפויה?</li>
                    <li>איך משפיעות נקודות הזיכוי על גובה המס?</li>
                    <li>מהו הסכום שכדאי לשלם כמקדמות כדי למנוע חובות בסוף השנה?</li>
                </ul>

                <h2>איך עובד מחשבון מס הכנסה?</h2>
                <p>
                    המחשבון מקבל את השכר הברוטו החודשי ואת מספר נקודות הזיכוי, ומחשב את חבות המס בהתאם למדרגות המס המעודכנות. ומציג גובה המס החודשי והמס השנתי הצפוי.
                </p>

                <p className="disclaimer">
                    מחשבון מס הכנסה ע"פ נקודות הזיכוי נותן אומדן בלבד ואינו מהווה ייעוץ מס או תחליף לליווי מקצועי. הנתונים מבוססים על מדרגות המס הקיימות, אך ייתכנו הבדלים בהתאם לנסיבות האישיות. לקבלת ייעוץ מותאם אישית, מומלץ להתייעץ עם רואה חשבון מוסמך.
                </p>
            </section>
        </div>
    );
}
