import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Calculator,
    User,
    Users,
    Briefcase,
    ShieldCheck,
    FileSpreadsheet,
    CreditCard,
} from "lucide-react";
import "../../styles/CalculatorsPage/CalculatorsGrid.css";

const CalculatorsGrid = () => {
    const navigate = useNavigate();

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
            desc: "גלה כמה מס תשלם באמת – כולל נקודות הזיכוי שמגיעות לך",
            link: "/simulators/IncomeTaxWithPoints",
            icon: <CreditCard className="calculators-desktop-sim-icon" />,
        }
        ,
        // Second row - Self-employed calculators
        {
            title: "מחשבון עצמאי זעיר",
            desc: "חשב כמה מס על עצמאי זעיר",
            link: "/simulators/micro-self-employed",
            icon: <User className="calculators-desktop-sim-icon" />,
        },
        {
            title: "מחשבון עצמאי זעיר + שכיר",
            desc: "בדיקה משולבת לעצמאי זעיר ושכיר",
            link: "/simulators/micro-self-employed-salaried",
            icon: <Users className="calculators-desktop-sim-icon" />,
        },
        {
            title: "מחשבון עצמאי - ביטוח לאומי",
            desc: "חשב את הביטוח לאומי לעצמאי",
            link: "/simulators/self-employed",
            icon: <Briefcase className="calculators-desktop-sim-icon" />,
        },
    ];

    const handleSimulatorClick = (link) => {
        const token = localStorage.getItem("access_token");
        
        // Allow access to employee-cost-with-pension without login
        if (link === "/simulators/employee-cost-with-pension") {
            navigate(link);
        } else if (!token) {
            alert("עליך להתחבר כדי להשתמש במחשבון");
            navigate("/SigninForm");
        } else {
            navigate(link);
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
                    نوفّر لك الأدوات التي تسهّل عليك فهم التزاماتك الضريبية لتتخذ قرارات مالية واثقة
                </p>
            </div>
        </section>
    );
};

export default CalculatorsGrid;
