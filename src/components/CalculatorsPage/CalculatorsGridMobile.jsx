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
import "../../styles/CalculatorsPage/CalculatorsGridMobile.css";

const CalculatorsGridMobile = () => {
    const navigate = useNavigate();

    const simulators = [
        {
            title: "בדיקת עלות עובד (כולל פנסיה)",
            desc: "חשב את עלות העובד למעסיק",
            link: "/simulators/employee-cost-with-pension",
            icon: <ShieldCheck className="calculators-sim-icon" />,
            isFree: true,
            freeNote: "🔥 ניתן להשתמש בחינם!"
        },
        {
            title: "מחשבון ביטוח לאומי עוסק זעיר",
            desc: "חשב כמה ישלם עצמאי בעל עוסק זעיר לביטוח לאומי",
            link: "/simulators/micro-self-employed",
            icon: <User className="calculators-sim-icon" />,
        },
        {
            title: "מחשבון ביטוח לאומי עצמאי ושכיר",
            desc: "חשב חבות ביטוח לאומי - עצמאי בלבד או עצמאי ושכיר",
            link: "/simulators/micro-self-employed-salaried",
            icon: <Users className="calculators-sim-icon" />,
        },
        {
            title: "בדיקת עלות עובד (רק מיסים ללא פנסיה)",
            desc: "חשב עלות העובד ״המיסויית״ למעסיק",
            link: "/simulators/employee-cost-no-pension",
            icon: <FileSpreadsheet className="calculators-sim-icon" />,
        },
        {
            title: "כלי עזר מקדמות ובחירת סוג תיק לעצמאי בביטוח לאומי",
            desc: "חשב כמה דמי ביטוח לאומי ישלם עצמאי ומהי ההגדרה המתאימה לו",
            link: "/simulators/self-employed",
            icon: <Briefcase className="calculators-sim-icon" />,
        },
        {
            title: "מחשבון מס הכנסה ע״פ נקודות הזיכוי",
            desc: "גלה כמה מס תשלם לפי ההכנסה שלך ונקודות הזיכוי",
            link: "/simulators/IncomeTaxWithPoints",
            icon: <CreditCard className="calculators-sim-icon" />,
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
        <section className="calculators-list">
            <h2 className="calculators-section-title">
                <span>מיסוי ועבודה</span>
                <Calculator className="calculators-inline-icon" />
            </h2>

            <div className="calculators-grid">
                {simulators.map((sim, idx) => (
                    <div
                        key={idx}
                        className={`calculators-card ${sim.isFree ? 'free-calculator' : ''}`}
                        onClick={() => handleSimulatorClick(sim.link)}
                    >
                        {sim.isFree && (
                            <div className="free-badge">🔥 בחינם</div>
                        )}
                        <div className="calculators-card-header">
                            {sim.icon}
                            <h3>{sim.title}</h3>
                        </div>
                        <p>{sim.desc}</p>
                        {sim.isFree && (
                            <div className="free-note">{sim.freeNote}</div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CalculatorsGridMobile;
