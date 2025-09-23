import React from "react";
import { useNavigate } from "react-router-dom";
import {
    LogOut,
    Home,
    Calculator,
    User,
    Users,
    Briefcase,
    ShieldCheck,
    FileSpreadsheet,
} from "lucide-react";
import "../styles/CalculatorsPage.css";

export default function CalculatorsPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/SigninForm");
    };

    const simulators = [
        {
            title: "מחשבון עצמאי זעיר",
            desc: "חשב כמה מס על עצמאי זעיר",
            link: "/simulators/micro-self-employed",
            icon: <User className="sim-icon" />,
        },
        {
            title: "מחשבון עצמאי זעיר + שכיר",
            desc: "בדיקה משולבת לעצמאי זעיר ושכיר",
            link: "/simulators/micro-self-employed-salaried",
            icon: <Users className="sim-icon" />,
        },
        {
            title: "בדיקת עלות עובד (רק מיסים ללא פנסיה)",
            desc: "חשב את עלות העובד רק מיסים ללא פנסיה",
            link: "/simulators/employee-cost-no-pension",
            icon: <FileSpreadsheet className="sim-icon" />,
        },
        {
            title: "בדיקת עלות עובד (כולל פנסיה)",
            desc: "חשב את עלות העובד עם פנסיה מלאה",
            link: "/simulators/employee-cost-with-pension",
            icon: <ShieldCheck className="sim-icon" />,
        },
        {
            title: "מחשבון עצמאי",
            desc: "חשב את המס והביטוח לאומי לעצמאי",
            link: "/simulators/self-employed",
            icon: <Briefcase className="sim-icon" />,
        },


    ];

    return (
        <div className="sim-page" dir="rtl">
            {/* Header */}
            <header className="sim-header">
                <div className="sim-logo" onClick={() => navigate("/")}>
                    <Calculator className="sim-logo-icon" />
                    <span>FinanceSmartTools</span>
                </div>
                <div className="sim-actions">
                    <button onClick={() => navigate("/")} className="sim-btn home">
                        <Home className="w-5 h-5" /> דף הבית
                    </button>
                    <button onClick={handleLogout} className="sim-btn logout">
                        <LogOut className="w-5 h-5" /> התנתק
                    </button>
                </div>
            </header>

            {/* Intro */}
            <section className="sim-intro">
                <h1>מחשבונים וסימולטורים</h1>
                <p className="sim-tagline">
                    כלי חישוב חכמים – הדרך הפשוטה לתכנון פיננסי נכון
                </p>
                <div className="sim-box">
                    בדף זה ריכזנו עבורכם סימולטורים פיננסיים אינטואיטיביים שיעזרו לכם
                    לחשב בקלות עלויות, מסים והפרשות סוציאליות. <br />
                    המטרה שלנו – לתת לכם תמונה ברורה ושקופה של המצב הכלכלי, כדי שתוכלו
                    לקבל החלטות נכונות ולחסוך כסף.
                </div>
            </section>

            {/* Simulators */}
            <section className="sim-list">
                <h2 className="sim-section-title">
                    <Calculator className="inline-icon" /> מיסוי ועבודה
                </h2>

                <div className="sim-grid">
                    {simulators.map((sim, idx) => (
                        <div
                            key={idx}
                            className={`sim-card ${idx === simulators.length - 1 ? "single-row" : ""
                                }`}
                            onClick={() => navigate(sim.link)}
                        >
                            <div className="sim-card-header">
                                {sim.icon}
                                <h3>{sim.title}</h3>
                            </div>
                            <p>{sim.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Extra Info Section */}
            <section className="sim-extra">
                <h2 className="sim-extra-title">כלים חכמים לניהול מיסוי ועבודה</h2>
                <p className="sim-extra-subtitle">
                    המחשבונים שלנו פותחו כדי לעזור לעצמאים, שכירים ומעסיקים לקבל החלטות כלכליות
                    בצורה קלה וברורה.
                </p>

                <div className="sim-extra-box">
                    <h3>מה תקבלו מהמחשבונים שלנו?</h3>
                    <ul>
                        <li>✔️ חישוב מדויק של מיסים והפרשות סוציאליות</li>
                        <li>✔️ תמונה ברורה של עלות העסקה או ההכנסה נטו</li>
                        <li>✔️ אפשרות להשוות בין מצבים שונים (עצמאי, שכיר, משולב)</li>
                        <li>✔️ שימוש פשוט ומהיר – תוצאה מיידית</li>
                    </ul>

                    <h3>למי זה מתאים?</h3>
                    <p>
                        בין אם אתם בתחילת הדרך כעצמאים, שכירים שרוצים לדעת את הזכויות שלכם,
                        או מעסיקים שבודקים עלויות – המחשבונים נותנים לכם כלי ברור לקבלת החלטות.
                    </p>

                    <h3>מהצגה להבנה</h3>
                    <p>
                        המחשבונים לא נועדו רק להציג מספרים – אלא לתת לכם נקודת מבט רחבה על המצב
                        הכלכלי שלכם ולעזור בתכנון עתידי חכם.
                    </p>
                </div>
            </section>


        </div>
    );
}
