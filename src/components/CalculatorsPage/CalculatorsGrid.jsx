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
            desc: "חשב את עלות העובד רק מיסים ללא פנסיה",
            link: "/simulators/employee-cost-no-pension",
            icon: <FileSpreadsheet className="calculators-desktop-sim-icon" />,
        },
        {
            title: "בדיקת עלות עובד",
            titleSecondLine: "(כולל פנסיה)",
            desc: "חשב את עלות העובד עם פנסיה מלאה",
            link: "/simulators/employee-cost-with-pension",
            icon: <ShieldCheck className="calculators-desktop-sim-icon" />,
        },
        {
            title: "מחשבון מס הכנסה",
            desc: "חשב את מס ההכנסה עם נקודות זיכוי",
            link: "/simulators/IncomeTaxWithPoints",
            icon: <CreditCard className="calculators-desktop-sim-icon" />,
        },
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
        if (!token) {
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
                        className="calculators-desktop-card"
                        onClick={() => handleSimulatorClick(sim.link)}
                    >
                        <div className="calculators-desktop-card-header">
                            {sim.icon}
                                   <h3>
                                       {sim.title}
                                       {sim.titleSecondLine && ` ${sim.titleSecondLine}`}
                                   </h3>
                        </div>
                        <p>{sim.desc}</p>
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
