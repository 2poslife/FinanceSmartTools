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
import "../../styles/Calculators/MicroSelfEmployedCalculator.css";

export default function MicroSelfEmployedCalculator() {
    const router = useRouter();

    const [yearlyIncome, setYearlyIncome] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [authError, setAuthError] = useState(false);

    // Removed unused handleLogout function

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
            const res = await fetch(
                "/api/calculators/micro-self-employed",
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

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'API calculation failed');
            }

            const data = await res.json();
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
                <h1>מחשבון עצמאי זעיר</h1>
                <p className="calcpage-tagline">
                    כלי מהיר ופשוט לבדיקת תשלומי ביטוח לאומי ובריאות לעצמאי זעיר.
                </p>
                <div className="calcpage-hero-box">
                    המחשבון מחשב באופן מיידי את תשלומי ביטוח לאומי ומס הבריאות על בסיס הכנסה חייבת (לפי 70% מהערך שהוזן), ומציג לכם כמה תשלמו ביטוח לאומי חודשי, שנתי
                </div>
            </section>

            {/* Form */}
            <section className="calcpage-form">
                <h2>🧮 בצעו חישוב</h2>
                <div className="calcpage-form-grid">
                    <div className="calcpage-input-group">
                        <label>הכנסה שנתית (ברוטו)</label>
                        <input
                            type="number"
                            min="0"
                            value={yearlyIncome}
                            onChange={(e) => setYearlyIncome(e.target.value)}
                            placeholder="לדוגמה: 120000"
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
                    <button onClick={() => router.back()} className="calcpage-btn home">
                        🔙 חזור
                    </button>
                    <button
                        onClick={() => {
                            setYearlyIncome("");
                            setResult(null);
                            setExpanded(false);
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
                            <button onClick={() => router.push("/SigninForm")} className="link-btn">
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
                                <h4>סה״כ חודשי</h4>
                                <p>{fmt(result.summary.monthly_prepayment)} ₪</p>
                            </div>
                            <div className="summary-card red">
                                <h4>סה״כ שנתי</h4>
                                <p>{fmt(result.summary.yearly_total)} ₪</p>
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
                                <h4>קלט</h4>
                                <ul>
                                    <li>הכנסה שנתית: {fmt(result.inputs.yearly_income)} ₪</li>
                                    <li>הכנסה חייבת (70%): {fmt(result.inputs.taxable_income)} ₪</li>
                                </ul>

                                <h4>פירוט ניכויים</h4>
                                <ul>
                                    <li>ביטוח לאומי: {fmt(result.breakdown.national_insurance)} ₪</li>
                                    <li>ביטוח בריאות: {fmt(result.breakdown.health_insurance)} ₪</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Description */}
            <section className="calcpage-description">
                <h2>מחשבון עצמאי זעיר</h2>
                
                <p>
                    מחשבון זה נועד עבור רואי חשבון ויועצי מס, כדי לחשב את גובה המקדמה שעל עצמאי זעיר (בעל הכנסה נמוכה מ 120,000) לשלם לביטוח הלאומי, בהתאם להכנסה השנתית נטו הצפויה שלו.
                    המחשבון מסייע בקבלת החלטה מקצועית לגבי גובה המקדמה הרצויה, באופן שמאפשר תכנון נכון ומניעת חובות עתידיים.
                </p>

                <h3>על אילו שאלות המחשבון עונה?</h3>
                <ol>
                    <li>כמה מקדמה חודשית ושנתית עלי לקבוע לביטוח הלאומי בהתאם להכנסה הצפויה?</li>
                    <li>האם המקדמה הנוכחית מספיקה או שיש צורך בעדכון?</li>
                </ol>

                <h3>איך עובד מחשבון עצמאי זעיר?</h3>
                <p>
                    המחשבון מקבל את הרווח לאחר ההוצאות שהזנתם ומחשב את ההכנסה החייבת (70% מהברוטו). על בסיס זה הוא מחשב את תשלומי הביטוח הלאומי והבריאות, ומציג לכם את התשלום החושי והשנתי.
                </p>

                <div className="micro-self-employed-note">
                    <h4 className="micro-self-employed-note-title">שימו ❤️:</h4>
                    <p className="micro-self-employed-note-text">
                        עצמאי זעיר לא זכאי לזיכוי מס בגין תשלומי ביטוח לאומי, ולכן 52% מדמי הביטוח הלאומי שהוא משלם לא ניתנים לקיזוז כהוצאה מוכרת לצורכי מס הכנסה.
                        חשוב לקחת זאת בחשבון בעת תכנון גובה המקדמות והערכת הנטו הצפוי.
                    </p>
                </div>

                <div className="micro-self-employed-note-alt">
                    <h4 className="micro-self-employed-note-title-alt">הערה:</h4>
                    <p className="micro-self-employed-note-text-alt">
                        המחשבון יוצא מנקודת הנחה כי העצמאי זעיר מוגדר כעונה להגדרה, ועל בסיס זה מתבצע חישוב תשלומי הביטוח הלאומי.
                    </p>
                    <p className="micro-self-employed-note-text-alt">
                        אם ברצונכם לחשב מקדמות כאשר העוסק הזעיר אינו עונה להגדרה, עברו למחשבון:
                    </p>
                    <button 
                        className="calculator-link-btn"
                        onClick={() => window.open('https://www.cpa-zedan.com/simulators/micro-self-employed-salaried', '_blank')}
                    >
                        חישוב מקדמות ביטוח לאומי ובחירת ההגדרה הכדאית לעצמאי
                    </button>
                </div>

                <h2>כתב ויתור</h2>
                <p className="disclaimer">
                    מחשבון עצמאי זעיר נותן אומדן בלבד ואינו מהווה ייעוץ מס אישי או תחליף לליווי מקצועי.
                    הנתונים מבוססים על מדרגות הביטוח לאומי הקיימות, אך ייתכנו הבדלים בהתאם לנסיבות האישיות.
                    לקבלת ייעוץ מותאם אישית, מומלץ להתייעץ עם רואה חשבון מוסמך.
                </p>
            </section>
        </div>
    );
}
