'use client'

import React from "react";
import { useRouter } from "next/navigation";
import {
    Calculator,
    Home as HomeIcon,
    Building2,
    User,
    Users,
    Briefcase,
    ShieldCheck,
    FileSpreadsheet,
    CreditCard,
} from "lucide-react";
import "../../styles/CalculatorsPage/CalculatorsGrid.css";

const CalculatorsGrid = () => {
    const router = useRouter();

    const simulators = [
        // First row - Non-self-employed calculators
        {
            title: "בדיקת עלות עובד",
            titleSecondLine: "(רק מיסים ללא פנסיה)",
            desc: "חשב עלות העובד ״המיסויית״ למעסיק",
            link: "/simulators/employee-cost-no-pension",
            icon: <FileSpreadsheet className="calculators-desktop-sim-icon" />,
        },
        {
            title: "בדיקת עלות עובד",
            titleSecondLine: "(כולל פנסיה)",
            desc: "חשב את עלות העובד למעסיק",
            link: "/simulators/employee-cost-with-pension",
            icon: <ShieldCheck className="calculators-desktop-sim-icon" />,
            isFree: true,
            freeNote: "🔥 ניתן להשתמש בחינם!"
        },
        {
            title: "מחשבון מס הכנסה ע״פ נקודות הזיכוי",
            desc: "גלה כמה מס תשלם לפי ההכנסה שלך ונקודות הזיכוי",
            link: "/simulators/IncomeTaxWithPoints",
            icon: <CreditCard className="calculators-desktop-sim-icon" />,
        }
        ,
        // Second row - Self-employed calculators
        {
            title: "מחשבון ביטוח לאומי עוסק זעיר",
            desc: "חשב כמה ישלם עצמאי בעל עוסק זעיר לביטוח לאומי",
            link: "/simulators/micro-self-employed",
            icon: <User className="calculators-desktop-sim-icon" />,
        },
        {
            title: "מחשבון ביטוח לאומי עצמאי ושכיר",
            desc: "חשב חבות ביטוח לאומי - עצמאי בלבד או עצמאי ושכיר",
            link: "/simulators/micro-self-employed-salaried",
            icon: <Users className="calculators-desktop-sim-icon" />,
        },
        {
            title: "כלי עזר מקדמות ובחירת סוג תיק לעצמאי בביטוח לאומי",
            desc: "חשב כמה דמי ביטוח לאומי ישלם עצמאי ומהי ההגדרה המתאימה לו",
            link: "/simulators/self-employed",
            icon: <Briefcase className="calculators-desktop-sim-icon" />,
        },
    ];

    const handleSimulatorClick = (link) => {
        const token = localStorage.getItem("access_token");
        const publicLinks = ["/simulators/employee-cost-with-pension"];

        if (publicLinks.includes(link)) {
            router.push(link);
        } else if (!token) {
            alert("עליך להתחבר כדי להשתמש במחשבון");
            router.push("/SigninForm");
        } else {
            router.push(link);
        }
    };

    return (
        <section className="calculators-desktop-list">
            <h2 className="calculators-desktop-section-title">
                <span>מיסוי ועבודה</span>
                <Calculator className="calculators-desktop-inline-icon" />
            </h2>

            <div className="calculators-desktop-grid">
                {simulators.map((sim, idx) => (
                    <div
                        key={idx}
                        className={`calculators-desktop-card ${sim.isFree ? 'free-calculator' : ''}`}
                        onClick={() => handleSimulatorClick(sim.link)}
                    >
                        {sim.isFree && (
                            <div className="free-badge">🔥 בחינם</div>
                        )}
                        <div className="calculators-desktop-card-header">
                            {sim.icon}
                                   <h3>
                                       {sim.title}
                                       {sim.titleSecondLine && ` ${sim.titleSecondLine}`}
                                   </h3>
                        </div>
                        <p>{sim.desc}</p>
                        {sim.isFree && (
                            <div className="free-note">{sim.freeNote}</div>
                        )}
                    </div>
                ))}
            </div>
                        
            <div className="calculators-desktop-conclusion">
                <p className="calculators-desktop-conclusion-text">
                פקודות יומן                </p>
            </div>
            <div className="calculators-desktop-standalone-card">
                <div
                    className="calculators-desktop-card info-card"
                    onClick={() => handleSimulatorClick("/simulators/new-journal-entries")}
                >
                    <div className="calculators-desktop-card-header">
                        <FileSpreadsheet className="calculators-desktop-sim-icon" />
                        <h3>פקודות יומן</h3>
                    </div>
                    <p>כלי עזר לרישום פקודות יומן.</p>
                </div>
            </div>

            {/* Equity Comparison header bar */}
            <div className="calculators-desktop-conclusion" style={{ marginBottom: '1.5rem' }}>
                <p className="calculators-desktop-conclusion-text">
                    השוואת הון
                </p>
            </div>

            {/* Equity Comparison cards */}
            <div className="calculators-desktop-grid">
                <div
                    className="calculators-desktop-card info-card"
                    onClick={() => handleSimulatorClick("/simulators/equity-urban")}
                >
                    <div className="calculators-desktop-card-header">
                        <Building2 className="calculators-desktop-sim-icon" />
                        <h3>עירוני</h3>
                    </div>
                    <p>השוואת הון לתושבי ערים</p>
                </div>
                <div
                    className="calculators-desktop-card info-card"
                    onClick={() => handleSimulatorClick("/simulators/equity-rural")}
                >
                    <div className="calculators-desktop-card-header">
                        <HomeIcon className="calculators-desktop-sim-icon" />
                        <h3>כפרי</h3>
                    </div>
                    <p>השוואת הון לתושבי כפרים</p>
                </div>
            </div>

            <div className="calculators-desktop-conclusion">
                <p className="calculators-desktop-conclusion-text">
                    نوفر لك ادوات عملية تساعدك في اتخاذ قرارات محاسبية دقيقة
                </p>
            </div>
        </section>
    );
};

export default CalculatorsGrid;
