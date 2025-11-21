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
} from "lucide-react";
import "../../styles/Calculators/MicroSelfEmployedSalariedCalculator.css";

export default function MicroSelfEmployedSalariedCalculator() {
    const router = useRouter();

    const [yearlyIncome, setYearlyIncome] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [isSalaried, setIsSalaried] = useState(false); // Flag for עצמאי ושכיר

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
                ? "/api/calculators/micro-self-employed-salaried/atsmaee-and-sakher"
                : "/api/calculators/micro-self-employed-salaried";
            
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

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'API calculation failed');
            }

            const data = await res.json();
            console.log("🔍 API Response:", data);
            console.log("📊 Endpoint used:", isSalaried ? "atsmaee-and-sakher" : "atsmaee-only");
            console.log("✅ Flag state (isSalaried):", isSalaried);
            console.log("📋 Full result structure:", JSON.stringify(data, null, 2));
            setResult(data);
        } catch (err) {
            console.error("❌ Error calculating:", err);
            alert("שגיאה בחישוב. אנא נסה שוב.");
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
                חשבו את חובות הביטוח הלאומי והבריאות עבור עצמאים (עצמאי בלבד או עצמאי ושכיר).
                </p>
                <div className="calcpage-hero-box">
                המחשבון מחשב את תשלומי הביטוח הלאומי והבריאות על ההכנסה החייבת (רווח לאחר ניכוי הוצאות). בחרו בין עצמאי בלבד או עצמאי ושכיר.                </div>
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
                        בהנחה שהעצמאי עובד גם כשכיר ומקבל שכר מעל 7,522 בחודש.
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
                        onClick={() => router.back()}
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
                            <div className="summary-card blue">
                                <h4>תשלום חודשי</h4>
                                <p>{fmt(result.monthly.prepayment)} ₪</p>
                            </div>
                            <div className="summary-card red">
                                <h4>סה״כ שנתי</h4>
                                <p>{fmt(result.totals.yearly_total)} ₪</p>
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
                                    <li>ביטוח לאומי: {fmt(result.totals.national_insurance)} ₪</li>
                                    <li>ביטוח בריאות: {fmt(result.totals.health_tax)} ₪</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Description */}
            <section className="calcpage-description">
                <h2>מחשבון חישוב מקדמות ביטוח לאומי לעצמאי:</h2>
                <p>
               המחשבון נועד לספק הערכה של גובה המקדמות לביטוח הלאומי שעל עצמאי לשלם במהלך השנה, בהתאם להכנסה הצפויה שלו כאשר הוא עונה להגדרה.
בשלב הראשון המשתמש בוחר האם הוא עצמאי בלבד או עצמאי שגם עובד כשכיר, והמחשבון מחשב בהתאם את גובה התשלומים החודשיים והשנתיים.

                </p>

                <h2>המחשבון עונה על שאלות כמו:</h2>
                <ul>
                    <li>כמה מקדמות ביטוח לאומי ישלם עצמאי לפי ההכנסה שלו?</li>
                    <li>איך משתנה גובה התשלום כאשר העוסק גם שכיר וגם עצמאי?</li>
                    <li>מהו הסכום שכדאי לשלם מדי חודש כדי למנוע חובות בסוף השנה?</li>
                </ul>

                <h2>למי מתאים המחשבון?</h2>
                <p>
                    המחשבון מתאים לרואי חשבון, יועצי מס, עצמאים. המחשבון מסייע בקבלת החלטות מקצועיות, ומהווה כלי יעיל לניהול נכון של תשלומי הביטוח הלאומי במהלך השנה.
                </p>

                <div className="micro-self-employed-note-alt">
                    <h4 className="micro-self-employed-note-title-alt">הערה:</h4>
                    <p className="micro-self-employed-note-text-alt">
                        המחשבון יוצא מנקודת הנחה כי העצמאי מוגדר כעונה להגדרה לפי חוק ביטוח לאומי, ועל בסיס זה מתבצע חישוב תשלומי הביטוח הלאומי.
                    </p>
                    <p className="micro-self-employed-note-text-alt">
                        אם ברצונכם לחשב מקדמות כאשר העוסק הזעיר אינו עונה להגדרה, עברו למחשבון:
                    </p>
                    <button 
                        className="calculator-link-btn"
                        onClick={() => window.open('https://www.cpa-zedan.com/simulators/micro-self-employed-salaried', '_blank')}
                    >
                        חישוב מקדמות ביטוח לאומי ובחירת הגדרה כדאית לעצמאי
                    </button>
                </div>

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
